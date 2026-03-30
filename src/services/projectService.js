import axios from "axios";
import { BASE_URL, TOKEN } from "../config/env.js";

export async function getProjectId(projectName) {
  const response = await axios.get(
    `${BASE_URL}/project-picker/projects?name=${encodeURIComponent(projectName)}&includeMatchedClients=true&excludeProjectsOfManagedUsers=true`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  const projects = response.data;

  const match = projects.find((p) =>
    p.name.toLowerCase().includes(projectName.toLowerCase())
  );

  return match ? match.id : null;
}