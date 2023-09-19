import { getAssetFromS3 } from "../services/s3Service.js";
import dotenv from "dotenv";
import { validateUserToken } from "../middlewares/authMiddleware.js";
dotenv.config();

// export async function uploadFile(req, res) {
//   try {
//     const filePath = req.body.filePath;
//     const bucketName = req.body.bucketName;
//     const folderName = req.body.folderName;

//     const response = await uploadFileToS3(filePath, bucketName, folderName);

//     res
//       .status(200)
//       .json({ message: "File uploaded successfully", data: response });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ message: "Failed to upload file" });
//   }
// }

// Controller function for getting an image from S3
export async function getAsset(req, res) {
  try {
    const bucketName = "assets-angova";
    const key = req.body.key;
    const data = await getAssetFromS3(key, bucketName);

    // Convert the image data to a Base64 string
    const base64String = data.toString("base64");


    // Send the Base64 string in the response

    res.send(base64String);
  } catch (error) {
    console.error("Error getting asset from S3:", error);
    res.status(500).json({ message: "Failed to retrieve asset" });
  }
}
