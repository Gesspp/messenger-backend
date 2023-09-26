const bcrypt = require("bcrypt")
const User = require("../models/user");

const signup = async (req, res) => {
    if (!req.body) return res.status(401).json({error: "no body"})

    const { nickname, email, password } = req.body;
    const existingNickname = await User.findOne({nickname});
    const existingEmail = await User.findOne({email});

    if (existingEmail || existingNickname) {
        return res.status(400).json({error: "same nickname or email is existing"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({nickname, email, password: hashedPassword});
    await user.save();

    return res.status(201).json({message: "user successfully created"})

}

module.exports = {
    signup
}