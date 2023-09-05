// s3Controller.js
import { getImageFromS3 } from "../services/s3Service.js";
import dotenv from "dotenv";
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
export async function getImage(req, res) {
  try {
    const key = process.env.AWS_SECRET_KEY;
    const bucketName = "assets-angova";

    const imageData = await getImageFromS3(key, bucketName);

    // Send the image data in the response
    // Set appropriate headers based on the image type

    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(imageData);
  } catch (error) {
    console.error("Error getting image from S3:", error);
    res.status(500).json({ message: "Failed to retrieve image" });
  }
}
