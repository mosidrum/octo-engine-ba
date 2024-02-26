import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import dotevn from 'dotenv';

dotevn.config();

const UserSchema = new Schema(
	{
		avatar: { type: String, default: '' },
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		verified: { type: Boolean, default: false },
		verificationCode: { type: String, required: false },
		admin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
		return next();
	}
	return next();
});

UserSchema.methods.generateJWT = async function () {
	return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: '2hr',
	});
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = model('User', UserSchema);;
export default User;
