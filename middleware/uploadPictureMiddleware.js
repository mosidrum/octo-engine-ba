import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const uploadPicture = multer({
	storage: storage,
	limit: {
		fileSize: 5 * 1024 * 1024, //5mb
	},
	fileFilter: function (req, file, cb) {
		let extention = path.extname(file.originalname);
		if (extention !== '.png' && extention !== '.jpg' && extention !== '.jpeg') {
			return cb(new Error('Only images are allowed'));
		}
		cb(null, true);
	},
});

export { uploadPicture };
