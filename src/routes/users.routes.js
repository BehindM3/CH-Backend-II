import { Router } from "express";
import { loginResponse, registerResponse } from "../controllers/user.controller.js";
import { passportCall } from "../middlewares/passportCall.js";

const router = Router();

router.post('/login', loginResponse);

router.post('/register', registerResponse);

router.get('/register-github', passportCall("github", { scope: ['user:email'] }), (req, res) => {});

router.get('/profile/github', passportCall("github", { scope: ['user:email'] }), (req, res, next) => {
    console.log(req)
    return res.json({ msg : "ok" })
});

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.json({msg: "Log out OK"});
});

export default router;