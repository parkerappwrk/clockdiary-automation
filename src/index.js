import fs from "fs/promises";
import { parseLogMessage } from "./utils/parser.js";
import { createTimeEntry } from "./services/timeEntryService.js";

async function runAutomation() {
  try {
    const message = await fs.readFile("./logs/daily-log.txt", "utf8");

    const days = parseLogMessage(message);

    for (const day of days) {
      let currentStartTime = day.date;

      console.log("Creating entries for:", currentStartTime);

      for (const entry of day.entries) {
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