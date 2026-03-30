export function parseLogMessage(message) {
  const year = new Date().getFullYear();

  const lines = message.split("\n");

  const days = [];
  let currentDay = null;

  lines.forEach((line) => {
    const trimmed = line.trim();

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
      trimmed.includes("Clock Diary Billable") ||
      trimmed.includes("Upwork Manual Tracking") ||
      trimmed.includes("Upwork Tracking")
    ) {
      currentDay.currentBlock = trimmed;
    }

    // ---------- Hours ----------
    const hoursMatch = trimmed.match(/(\d+):(\d+)/);
    if (hoursMatch && currentDay) {
      currentDay.currentHours = parseInt(hoursMatch[1]);
    }

    // ---------- Project ----------
    if (trimmed.startsWith("Project:") || trimmed.startsWith("Project Name:")) {
      currentDay.currentProject = trimmed.replace(/Project Name:|Project:/, "").trim();
    }

    // ---------- Task ----------
    if (trimmed.startsWith("Task:")) {
      const description = trimmed.replace("Task:", "").trim();

      currentDay.entries.push({
        hours: currentDay.currentHours,
        projectName: currentDay.currentProject,
        description,
        isBillable: true,
      });
    }
  });

  if (currentDay) days.push(currentDay);

  return days;
}