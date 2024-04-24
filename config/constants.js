import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_KEY;
const LOGIN_REDIRECT_CLIENT_URL = process.env.LOGIN_REDIRECT_CLIENT_URL;
const REGISTER_REDIRECT_CLIENT_URL = process.env.REGISTER_REDIRECT_CLIENT_URL;

const PRODUCTION_ENV = process.env.NODE_ENV === "production";
const TEST_ENV = process.env.NODE_ENV === "test";
const DEV_ENV = process.env.NODE_ENV === "development";

export {
  JWT_SECRET,
  REFRESH_SECRET,
  LOGIN_REDIRECT_CLIENT_URL,
  REGISTER_REDIRECT_CLIENT_URL,
  PRODUCTION_ENV,
  TEST_ENV,
  DEV_ENV,
};
