import crypto from "crypto";

//Generate a random access token secret key and refresh token secret key
const access_token_secret = crypto.randomBytes(32).toString("hex");
const refresh_token_secret = crypto.randomBytes(32).toString("hex");

export { access_token_secret, refresh_token_secret };
