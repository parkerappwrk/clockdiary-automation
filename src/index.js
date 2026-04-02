import fs from "fs/promises";
import { parseLogMessage } from "./utils/parser.js";
import { createTimeEntry } from "./services/timeEntryService.js";

async function runAutomation() {
  try {
    // 1. Read text file
    const message = await fs.readFile("./logs/daily-log.txt", "utf8");

    // 2. Parse the message
    const days = parseLogMessage(message);

    console.log("Days parsed successfully ✅ ",days);

    // 3. Send entries to ClockDiary
    for (const day of days) {
      console.log("Entries for date:", day.date);
      let currentStartTime = day.date;

      for (const entry of day.entries) {
        console.log("Entry for date:", entry);
        console.log("currentStartTime for date:", currentStartTime);
        if (!currentStartTime) {
          console.error("Start time became invalid ❌");
          break;
        }
        currentStartTime = await createTimeEntry(entry, currentStartTime);
      }
    }

    console.log("All entries created successfully ✅");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

runAutomation();