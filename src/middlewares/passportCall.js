import passport from "passport";

export const passportCall = ( strategy, options = {}) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, options, (error, user, info) => {
            console.log("Passport: ", user)
            if(error) return next(error);
            if(!user) return res.status(401).json({error: info.messages ? info.messages : info.toString() });
            req.user = user;
            next();
        })(req, res, next);
    } 
};