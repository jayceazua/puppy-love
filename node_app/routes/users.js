const jwt = require('jsonwebtoken');

const User = require('../models/user');
require('dotenv').config();

module.exports = (app) => {
    // SIGN UP FORM
    app.get('/register', async (req, res) => {
        res.render('users/register');
    });

    // SIGN UP POST
    app.post('/sign-up/', async (req, res) => {
        // Create User and JWT
        // const user = new User(req.body);

        if (req.body.password !== req.body.password) {
            res.render('users/reqister', {error: "Passwords don't match"});
            return;
        }
        if (false && check_password) {
            //TODO: This
            res.render('users/reqister', {error: "Password insecure"});
            return;
        }

            let user = await User.findOne({username: req.body.username}, 'username password')
            if (user) {
                return res.render('users/reqister', {error: "Username taken"});
            }

            let userData = {username: req.body.username, password: req.body.password};
            let newUser = new User(userData);
            newUser = await newUser.save();

            let token = jwt.sign({
                _id: newUser._id,
                username: newUser.username
            }, process.env.SECRET, {
                expiresIn: "60 days"
            });
            res.cookie('nToken', token, {
                maxAge: 9000000,
                httpOnly: true
            });
            res.redirect('/login');
        });

    // LOGOUT
    app.get('/logout', async (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });

    // LOGIN FORM
    app.get('/login', async (req, res) => {
        let currentUser = req.user;

        res.render('users/login', {currentUser});
    });

    // LOGIN
    app.post('/login', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        // Find this user name
        let user = await User.findOne({username}, 'username password');
        if (!user) {
            // User not found
            return res.render('users/reqister', {error: "Invalid username or password"});
        }

        // Check the password
        let isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('users/login', {error: "Invalid username or password"});
        }

        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                admin: user.admin,
                banned: user.banned,
            }, process.env.SECRET);
        //  { expiresIn: "60 days" }

        if (user.banned) {
            return res.redirect('/logout');
        }
        // Set a cookie and redirect to root
        res.cookie('nToken', token, {maxAge: 90000000000, httpOnly: true});
        res.redirect('/');
    });
};
