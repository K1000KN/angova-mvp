// import { existsSync, readdirSync } from "fs";
// import { join } from "path";
// import renameFiles from "./renameFiles";

// describe("File Renaming", () => {
//   const testDir = join(__dirname, "public", "session"); // Adjust the path accordingly
//   const languageSubfolders = ["fr", "es", "en", "ma"]; // List of language subfolders

//   beforeAll(() => {
//     // Create a temporary folder structure with sample files for testing
//     // You can use a library like `fs-extra` for this purpose
//   });

//   afterAll(() => {
//     // Clean up the temporary folder structure after tests
//   });

//   for (let i = 0; i <= 1077; i++) {
//     describe(`Question ${i}`, () => {
//       languageSubfolders.forEach((subfolder) => {
//         test(`Audio files for ${subfolder} are named and exist`, () => {
//           // Call the renameFiles function on the test directory for each question
//           renameFiles(join(testDir, subfolder), i);

//           // Construct file names and paths for audio files
//           const questionAudioDir = join(testDir, subfolder, `q${i}`);
//           const questionFile = `q${i}.mp3`;
//           const explanationFile = `exp${i}.mp3`;

//           // Perform assertions for audio files
//           expect(existsSync(join(questionAudioDir, questionFile))).toBe(true);
//           expect(existsSync(join(questionAudioDir, explanationFile))).toBe(
//             true
//           );

//           // Check if the audio files are named correctly
//           const audioFilesInQuestionDir = readdirSync(questionAudioDir);
//           expect(audioFilesInQuestionDir).toContain(questionFile);
//           expect(audioFilesInQuestionDir).toContain(explanationFile);
//         });
//       });

//       test("Image file is named and exists", () => {
//         // Construct file names and paths for image file
//         const questionImageDir = join(testDir, `q${i}`);
//         const imageFile = `q${i}.jpeg`;

//         // Perform assertions for image file
//         expect(existsSync(join(questionImageDir, imageFile))).toBe(true);

//         // Check if the image file is named correctly
//         const imageFilesInQuestionDir = readdirSync(questionImageDir);
//         expect(imageFilesInQuestionDir).toContain(imageFile);
//       });
//     });
//   }
// });
