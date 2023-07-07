import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";
import stripe from 'stripe';
dotenv.config();

const adminSecretKey = process.env.SALT_KEY;


const stripeInstance = new stripe('sk_test_51NRF6LBHkhDIYYSv8MovkjYod1A4Q8rTUF9r51cVuivtz2UzCXBWCBOtYutiNK2chlavX04uxCsyXpo2OsmWHLP600cy1ZXdM3');
///fonction to create user

export const createUser = async (req, res) => {
  try {
    const { user, paymentMethod, selectedPackage } = req.body;
    console.log()
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: selectedPackage.totalPrice * 100, // Stripe utilise les montants en centimes
      currency: 'eur', // Remplacez par votre devise souhaitée
      payment_method: paymentMethod.id,
      confirm: true,
    });
    // Vérifiez si le paiement a été réussi
    if (paymentIntent.status !== 'succeeded') {
      return res.status(500).json({ error: 'Échec du paiement.' });
    }
    console.log(paymentIntent.status);
    const userRole = await Role.findOne({ name: 'user' });
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, adminSecretKey);
   
    let managerId = decoded.id;

    const manager = await User.findById(managerId);
 console.log(manager);
    if (!userRole) {
      return res.status(500).send({ message: "Role not found" });
    }

    const assignedRoles = [];

    if (!managerId) {
      return res.status(500).send({ message: "Manager not found" });
    }
    assignedRoles.push(userRole);

    if (assignedRoles.length === 0) {
      return res
        .status(500)
        .send({ message: "At least one valid role is required" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: hashedPassword,
      roles: assignedRoles.map((role) => role._id),
    });
    console.log(newUser);
    await newUser.save();

    const userWithRoles = await User.findById(user._id).populate(
      "roles",
      "name"
    );

    res.status(201).send(userWithRoles);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to create user" });
  }
};

// function to get manager by id
export const getManagerById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("roles", "name");
    user.password = undefined;
    if (!user) {
      return res.status(404).send({ message: "Manager not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to retrieve manager" });
  }
};
