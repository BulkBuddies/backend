import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_KEY;

export { JWT_SECRET, REFRESH_SECRET };
