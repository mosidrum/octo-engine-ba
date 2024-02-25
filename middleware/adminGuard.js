// checks if the user is an admin, only admins are allowed to create password
export const adminGuard = (req, res, next) => {
	if (req.user && req.user.admin) {
		next();
	} else {
		let error = new Error('Not authorized as an admin');
		error.statusCode = 401;
		next(error);
	}
};
