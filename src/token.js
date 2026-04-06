import axios from "axios";
import { BASE_URL, EMAIL, PASSWORD } from "./config/env.js";

export async function generateToken() {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: EMAIL,
      password: PASSWORD,
    });

    const token = response.data.token;

    console.log("\n================ TOKEN =================");
    console.log(token);
    console.log("========================================\n");

    return token;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
  }
}

generateToken();