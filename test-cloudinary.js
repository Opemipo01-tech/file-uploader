import "dotenv/config";
import cloudinary from "./config/cloudinary.js";

try {
  const result = await cloudinary.api.ping();

  console.log(result);
} catch (error) {
  console.error("PING ERROR:", error);
}