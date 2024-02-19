import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileRemover = (file) => {
	fs.unlink(path.join(__dirname, '../uploads', file), function (err) {
		if (err && err.code == 'ENOENT') {
			//if the file doesnt exits
			console.log(`File ${file} doesnt exist, cannot delete`);
		} else if (err) {
			console.log(`Error deleting ${file}`);
		} else {
			console.log(`removed ${file}`);
		}
	});
};

export { fileRemover };
