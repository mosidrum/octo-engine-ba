import User from '../models/User.js';

const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
    console.log(req.body);

		let user = await User.findOne({
			email: email,
		});
		if (user) {
			return res.status(400).json({ message: 'User is already registered.' });
		}
    
    user = await User.create({ name, email, password })

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT()
    })
	} catch (error) {
    console.error(error);
    return res.status(500).json({message: "Something went wrong!"})
  }
};

export { registerUser };
