export function parseLogMessage(message) {
  const year = new Date().getFullYear();

  const lines = message.split("\n");

  const days = [];
  let currentDay = null;

  lines.forEach((line) => {
    const lowered = line.trim();
    const trimmed = lowered.toLowerCase();

    // ---------- Detect date line (example: 19 March) ----------
    if (/^\d{1,2}\s[A-Za-z]+$/.test(trimmed)) {
      if (currentDay) days.push(currentDay);

      const date = new Date(`${trimmed} ${year} 09:30:00`);

      currentDay = {
        date,
        entries: [],
      };
    }

    // ---------- Detect billable block ----------
    if (
      trimmed.includes("clock diary billable") ||
      trimmed.includes("upwork manual tracking") ||
      trimmed.includes("upwork tracking") ||
      trimmed.includes("hubstaff tracking")
    ) {
      currentDay.currentBillable = true;
      currentDay.currentBlock = trimmed;
    } else if (trimmed.includes("Non-Billable")) {
      currentDay.currentBlock = trimmed;
      currentDay.currentBillable = false;
    }
    

    // ---------- Hours ----------
    const hoursMatch = trimmed.match(/(\d+):(\d+)/);
    if (hoursMatch && currentDay) {
      const hours = parseInt(hoursMatch[1]);
      const minutes = parseInt(hoursMatch[2]);

      currentDay.currentHours = hours + minutes / 60;
    }

    // ---------- Project ----------
    if (trimmed.startsWith("project:") || trimmed.startsWith("project Name:")) {
      currentDay.currentProject = trimmed.replace(/project name:|project:/, "").trim();
    }

    // ---------- Task ----------
    if (trimmed.startsWith("task:")) {
      const description = trimmed.replace("task:", "").trim();

      currentDay.entries.push({
        hours: currentDay.currentHours,
        projectName: currentDay.currentProject,
        description,
        isBillable: currentDay.currentBillable || false,
      });  
    }
  });

  if (currentDay) days.push(currentDay);

  return days;
}
