import axios from "axios";
import { BASE_URL, TOKEN, DEFAULT_TAG } from "../config/env.js";

export async function getTagId() {
  const response = await axios.get(`${BASE_URL}/tag?name=&status=ACTIVE`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  const tags = response.data;

  const tag = tags.find(
    (t) => t.name.toLowerCase() === DEFAULT_TAG.toLowerCase()
  );

  return tag ? tag.id : null;
}