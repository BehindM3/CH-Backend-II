import { Router } from "express";

const router = Router();

router.get('/login', (req, res) => {
    res.render('login', {
        styleSheet: "login" 
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        styleSheet: "register" 
    });
});

router.get('/error', (req, res) => {
    res.render('error', {
        styleSheet: "error"
    })
})

router.get('/', (req, res) => {
    res.render('home');
})

export default router;