import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const s3 = new AWS.S3();

// Initialize AWS SDK first with your credentials and region
s3.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-north-1",
});

// // Function to upload a file to S3
// export async function uploadFileToS3(filePath, bucketName, folderName) {
//   try {
//     const params = {
//       Bucket: bucketName,
//       Body: fs.createReadStream(filePath),
//       Key: `${folderName}/${Date.now()}_${path.basename(filePath)}`,
//     };
//     const response = await s3.upload(params).promise();
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

// Function to get an image from S3
export async function getImageFromS3(key, bucketName) {
  try {
    const params = {
      Bucket: bucketName,
        Key: key,
        
    };
    const data = await s3.getObject(params).promise();
    return data.Body;
  } catch (error) {
    throw error;
  }
}
