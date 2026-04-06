import axios from "axios";
import { BASE_URL, TOKEN } from "../config/env.js";


export async function getProjectId(projectName) {
  const response = await axios.get(
    `${BASE_URL}/project-picker/projects?name=&includeMatchedClients=true&excludeProjectsOfManagedUsers=true`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  const projects = response.data;
  
  let projectFound = true;

  let match = projects.find((p) =>
    p.name.toLowerCase().includes(projectName.toLowerCase())
  );

  if (!match) {
    match = projects.find(
      (p) => p.name.toLowerCase() === "no work assigned"
    );
    projectFound = false;
  }

  return {id: match.id, status: projectFound};
}