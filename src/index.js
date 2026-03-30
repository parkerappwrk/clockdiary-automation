import fs from "fs/promises";
import { parseLogMessage } from "./utils/parser.js";
import { createTimeEntry } from "./services/timeEntryService.js";

async function runAutomation() {
  try {
    // 1. Read text file
    const message = await fs.readFile("./logs/daily-log.txt", "utf8");

    // 2. Parse the message
    const days = parseLogMessage(message);

    // 3. Send entries to ClockDiary
    for (const day of days) {
      let currentStartTime = day.date;

      for (const entry of day.entries) {
        currentStartTime = await createTimeEntry(entry, currentStartTime);
      }
    }

    console.log("All entries created successfully ✅");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

runAutomation();