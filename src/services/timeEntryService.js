import axios from "axios";
import { BASE_URL, TOKEN } from "../config/env.js";
import { getProjectId } from "./projectService.js";
import { getTagId } from "./tagService.js";
import { generateTimeRange } from "../utils/timeUtils.js";

export async function createTimeEntry(entry, date) {
  const projectId = await getProjectId(entry.projectName);
  const tagId = await getTagId();

  if (!projectId) {
    console.log("Project not found:", entry.projectName);
    return;
  }

  const time = generateTimeRange(date, entry.hours);

  const payload = {
    creationSource: "Web",
    customFields: [],
    description: entry.description,
    start: time.start,
    end: time.end,
    isBillable: entry.isBillable,
    projectId,
    tagIds: [tagId],
    userIds: [],
  };

  await axios.post(`${BASE_URL}/time-track/full`, payload, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  console.log("Entry created for:", entry.projectName);
}