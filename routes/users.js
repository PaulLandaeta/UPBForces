const router = require("express").Router();
const passport = require("passport");
let User = require("../models/user.model");

router.route("/register").post((req, res) => {
    Users = new User({
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
    });
    User.register(Users, req.body.password, function (err, user) {
        if (err) {
            res.json({
                success: false,
                message: "Your account could not be saved. Error: ",
                err,
            });
        } else {
            res.json({ success: true, message: "Your account has been saved" });
        }
    });
});

router.route("/login").get((req, res) => {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!user) {
                res.json({
                    success: false,
                    message: "Username or Password Incorrect!",
                });
            } else {
                req.login(user, function (err) {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        res.json({
                            success: true,
                            message: "Authentication successful!",
                        });
                    }
                });
            }
        }
    })(req, res);
});

module.exports = router;
