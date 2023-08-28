import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Role from "../models/Role.js";
import RefreshToken from "../models/RefreshToken.js";
import crypto from "crypto";
dotenv.config();

const adminSecretKey = process.env.SALT_KEY;

/// fonction pour log les users
/// return auth & role
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      console.log(isPasswordValid);
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // Récupérer le rôle de l'utilisateur à partir du tableau de rôles
    const roleId = user.roles[0]; // Supposant qu'il y ait un seul rôle par utilisateur

    const roleObject = await Role.findById(roleId);

    if (!roleObject) {
      return res.status(404).send({ message: "Role not found" });
    }

    const token = jwt.sign(
      { id: user._id, role: roleObject.name },
      adminSecretKey,
      {
        expiresIn: "3h",
      }
    );

    // Supprimer l'ancien refresh token s'il existe
    await deleteRefreshTokens(user._id);

    // Générer un nouveau refresh token
    const refreshToken = crypto.randomBytes(64).toString("hex");
    const newRefreshToken = new RefreshToken({
      token: refreshToken,
      userId: user._id,
    });

    await newRefreshToken.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ auth: true, token, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to login" });
  }
};

//fonction pour refresh le token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Recherche du refresh token dans la base de données
    const existingRefreshToken = await RefreshToken.findOne({
      token: refreshToken,
    });
    if (!existingRefreshToken) {
      return res.status(401).send({ message: "Invalid refresh token" });
    }

    // Vérification de l'expiration du refresh token
    if (existingRefreshToken.expiration < new Date()) {
      // Suppression du refresh token expiré de la base de données
      await RefreshToken.deleteOne({ _id: existingRefreshToken._id });
      return res.status(401).send({ message: "Refresh token has expired" });
    }

    // Génération d'un nouveau refresh token
    const newRefreshToken = generateRefreshToken();

    // Mise à jour du refresh token existant avec le nouveau refresh token
    existingRefreshToken.token = newRefreshToken;
    await existingRefreshToken.save();

    // Recherche de l'utilisateur par ID
    const user = await User.findById(existingRefreshToken.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Génération d'un nouveau token d'accès
    const token = jwt.sign({ id: user._id, role: user.role }, userSecretKey, {
      expiresIn: "3h",
    });

    res.status(200).send({ auth: true, token, refreshToken: newRefreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to refresh token" });
  }
};

/// creer un nouveau refresh token
const generateRefreshToken = () => {
  const refreshToken = crypto.randomBytes(64).toString("hex");
  return refreshToken;
};

/// fonction pour supprimer l'ancien refresh token
const deleteRefreshTokens = async (userId) => {
  await RefreshToken.deleteMany({ userId });
};
