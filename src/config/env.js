import dotenv from "dotenv";
dotenv.config();

export const BASE_URL = process.env.BASE_URL;
export const TOKEN = process.env.CLOCKDIARY_TOKEN;
export const DEFAULT_TAG = process.env.DEFAULT_TAG_NAME;
export const EMAIL = process.env.EMAIL;
export const PASSWORD = process.env.PASSWORD;