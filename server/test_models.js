import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const logStream = fs.createWriteStream('model_test_output.txt', { flags: 'a' });
  const log = (msg) => {
      console.log(msg);
      logStream.write(msg + '\n');
  };

  log("Starting test...");

  // Try list models if possible?
  // Use fetch directly to list models if SDK doesn't expose it easily
  try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (!response.ok) {
        log(`ListModels failed: ${response.status} ${response.statusText}`);
        const text = await response.text();
        log(`Response: ${text}`);
      } else {
        const data = await response.json();
        log("Available models:");
        if (data.models) {
            data.models.forEach(m => log(`- ${m.name}`));
        } else {
            log("No models found in list response.");
        }
      }
  } catch (err) {
      log(`Error listing models: ${err.message}`);
  }

  // Try generating content
  try {
    log("\nTesting gemini-1.5-flash...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello");
    log("gemini-1.5-flash works: " + result.response.text());
  } catch (error) {
    log("Error with gemini-1.5-flash: " + error.message); // Log message
     // If possible, log full error object serialization
    log(JSON.stringify(error, null, 2));
  }
}

test();
