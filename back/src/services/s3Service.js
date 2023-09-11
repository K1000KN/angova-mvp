import AWS from "aws-sdk";
import env from "dotenv";
env.config();

const s3 = new AWS.S3();
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

s3.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
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

// Function to get an asset from S3
export async function getAssetFromS3(key, bucketName) {
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
