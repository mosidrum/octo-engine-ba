import { uploadPicture } from '../middleware/uploadPictureMiddleware.js';
import User from '../models/User.js';
import { fileRemover } from '../utils/fileRemover.js';
import Post from "../models/Post.js";

const registerUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		console.log(req.body);

		let user = await User.findOne({
			email: email,
		});
		if (user) {
			throw new Error('User is already registered');
		}

		user = await User.create({ name, email, password });

		return res.status(201).json({
			_id: user._id,
			avatar: user.avatar,
			name: user.name,
			email: user.email,
			verified: user.verified,
			admin: user.admin,
			token: await user.generateJWT(),
		});
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		let user = await User.findOne({ email });
		if (!user) {
			throw new Error('Email not found');
		}

		if (await user.comparePassword(password)) {
			return res.status(201).json({
				_id: user._id,
				avatar: user.avatar,
				name: user.name,
				email: user.email,
				verified: user.verified,
				admin: user.admin,
				token: await user.generateJWT(),
			});
		} else {
			throw new Error('Incorrect passowrd');
		}
	} catch (error) {
		next(error);
	}
};

const userProfile = async (req, res, next) => {
	try {
		let user = await User.findById(req.user._id);
		if (user) {
			return res.status(201).json({
				_id: user._id,
				avatar: user.avatar,
				name: user.name,
				email: user.email,
				verified: user.verified,
				admin: user.admin,
			});
		} else {
			let error = new Error('User not found');
			error.statusCode = 404;
			next(error);
		}
	} catch (error) {
		next(error);
	}
};

const updateProfile = async (req, res, next) => {
	try {
		let user = await User.findById(req.user._id);
		if (!user) {
			throw new Error('user not found');
		}
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password && req.body.password.length < 6) {
			throw new Error('Password must be greater than 6 characters');
		} else if (req.body.password) {
			user.password = req.body.password;
		}
		const newUserInfo = await user.save();
		res.json({
			_id: newUserInfo._id,
			avatar: newUserInfo.avatar,
			name: newUserInfo.name,
			email: newUserInfo.email,
			verified: newUserInfo.verified,
			admin: newUserInfo.admin,
			token: await newUserInfo.generateJWT(),
		});
	} catch (error) {
		next(error);
	}
};

const updateProfilePicture = async (req, res, next) => {
	try {
		const upload = uploadPicture.single('profilePicture');

		upload(req, res, async function (err) {
			if (err) {
				const error = new Error(
					'An unknow error occured while uploading ' + err.message
				);
				next(error);
			} else {
				if (req.file) {
					let filename;
					let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          if (filename) {
            fileRemover(filename)
          }
          updatedUser.avatar = req.file.filename;
          await updatedUser.save();
					res.json({
						_id: updatedUser._id,
						avatar: updatedUser.avatar,
						name: updatedUser.name,
						email: updatedUser.email,
						verified: updatedUser.verified,
						admin: updatedUser.admin,
						token: await updatedUser.generateJWT(),
					});
				} else {
					let filename;
					let updatedUser = await User.findById(req.user._id);
					filename = updatedUser.avatar;
					updatedUser.avatar = '';
					await updatedUser.save();
					fileRemover(filename);
					res.json({
						_id: updatedUser._id,
						avatar: updatedUser.avatar,
						name: updatedUser.name,
						email: updatedUser.email,
						verified: updatedUser.verified,
						admin: updatedUser.admin,
						token: await updatedUser.generateJWT(),
					});
				}
			}
		});
	} catch (error) {
		next(error);
	}
};

const adminUser = async (req, res, next) => {
	try {
		const user = await User.findById({ _id: req.params.id });
		console.log(user);

		if (!user) {
			let error = new Error('User not found');
			error.statusCode = 404;
			return next(error);
		}

		// Destructure only if user exists
		const { avatar, admin, email, verified, name, _id } = user;

		return res.status(200).json({
			_id,
			avatar,
			name,
			email,
			verified,
			admin,
		});
	} catch (error) {
		next(error);
	}
};


export {
	adminUser,
	registerUser,
	loginUser,
	userProfile,
	updateProfile,
	updateProfilePicture,
};
