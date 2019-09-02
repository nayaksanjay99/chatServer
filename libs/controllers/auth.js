const User=require('../models/user')
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')


exports.login_handler=async(req,res,next)=>{

    const { username, password } = req.body;
    console.log(req.body)
	if (!username || !password) {
		return res.json({
			success: false,
			message: "One or more required fields are empty."
		});
	}
    try {
		const userDoc = await User.findOne({
			username
		});

		if (!userDoc) {
			return res.json({
				success: false,
				message: "The username or password are incorrect"
			});
		}

		const passwordsMatch = await bcrypt.compare(password, userDoc.password);

		if (!passwordsMatch) {
			return res.json({
				success: false,
				message: "The username or password are incorrect"
			});
		}
		const token = this.createToken(userDoc.username, userDoc._id);
		return res.json({
			success: true,
			token
		});
	} catch (err) {
		return res.json({ success: false, message: `${err}` });
	}
}

exports.signup_handler = async function(user) {
	const { username, name, password, phoneNo } = user;

	try {
		const userDoc = await User.findOne({
			username
		});
		if (userDoc) {
			return {
				success: false,
				message: "Name already exists."
			};
		}
		const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);

		const user = {
            username,
			name,
			password: hashedPassword,
			phoneNo
		};
		const result = await User.create(user);

        res.json({
            success:true
        })
  
	} catch (err) {
		return {
			success: false,
			message: "Server error"
		};
	}
};