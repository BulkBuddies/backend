import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { use, serializeUser, deserializeUser } from "passport";

use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.CLIENT_URL,
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

serializeUser((user, done) => {
	done(null, user);
});

deserializeUser((user, done) => {
	done(null, user);
});
