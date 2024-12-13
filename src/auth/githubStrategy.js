import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import 'dotenv/config';
import * as services from '../services/user.services.js';

const { CLIENT_ID_GH, CLIENT_SECRET_GH} = process.env;

const strategyOptions = {
    clientID: CLIENT_ID_GH,
    clientSecret: CLIENT_SECRET_GH,
    callbackURL: "http://localhost:8080/api/profile/github"
};

export const registerOrLogin = async (accesToken, refreshToken, profile, done ) => {
    try {
        console.log("Strategy: ", profile._json.email);
        console.log()
        const email = profile._json.email || profile._json.notification.email;
        if( !email ) done(error);
        const user = await services.getUserByEmail(email);
        if( user ) done(null, user);
        const [firstName, ...lastName] = profile._json.name.split(' ');
        const userData = {
            first_name: firstName.join(' '),
            last_name: lastName.join(' '),
            email,
            cart: null,
        }
        const newUser = await services.registerGithub(userData);
        return done(null, newUser);
    } catch (error) {
        done(error);
    }
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));

passport.serializeUser((user, done) => {
    try {
        done(null, user._id);
    } catch (error) {
        done(error);
    }
});

passport.deserializeUser( async (id, done) => {
    try {
        console.log("deserialized")
        const user = await services.getUserbyId(id);
        return done(null, user);
    } catch (error) {
        done(error);
    }
});