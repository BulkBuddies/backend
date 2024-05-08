import { createNewError } from "../src/api/v1/helpers/requestError.js";
import "dotenv/config";

const whitelist = [
  process.env.ORIGIN,
  process.env.FRONTEND_ORIGIN,
  process.env.SECOND_ORIGIN,
  process.env.THIRD_ORIGIN,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      return callback(null, origin);
    }
    console.log("No auth");
    throw createNewError("", 401, "No está autorizado por CORS");
  },
  credentials: true,
};

export default corsOptions;
