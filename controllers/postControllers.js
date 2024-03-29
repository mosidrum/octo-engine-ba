import { uploadPicture } from '../middleware/uploadPictureMiddleware.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import { fileRemover } from '../utils/fileRemover.js';
import { v4 as uuidv4 } from 'uuid';

const createPost = async (req, res, next) => {
	try {
		const post = new Post({
			title: 'Sample title',
			caption: 'sample caption',
			slug: uuidv4(),
			body: {
				type: 'doc',
				content: [],
			},
			photo: '',
			user: req.user._id,
		});
		const newPost = await post.save();
		return res.json(newPost);
	} catch (error) {
		next(error);
	}
};

const updatePost = async (req, res, next) => {
	try {
		const post = await Post.findOne({ slug: req.params.slug });
		if (!post) {
			const error = new Error('Post was not found!');
			next(error);
			return;
		}

		const upload = uploadPicture.single('postPicture');

		const handleUpdatePostData = async (data) => {
			const { title, caption, slug, body, tags, categories } = JSON.parse(data);
			post.title = title || post.title;
			post.caption = caption || post.caption;
			post.slug = slug || post.slug;
			post.body = body || post.body;
			post.tags = tags || post.tags;
			post.categories = categories || post.categories;
			const updatePost = await post.save();
			return res.json(updatePost);
		};

		upload(req, res, async function (err) {
			if (err) {
				const error = new Error(
					'An unknow error occured while uploading ' + err.message
				);
				next(error);
			} else {
				if (req.file) {
					let filename;
					filename = post.photo;
					if (filename) {
						fileRemover(filename);
					}
					post.photo = req.file.filename;
					handleUpdatePostData(req.body.document);
				} else {
					let filename;
					filename = post.photo;
					post.photo = '';
					fileRemover(filename);
					handleUpdatePostData(req.body.document);
				}
			}
		});
	} catch (error) {
		next(error);
	}
};

const deletePost = async (req, res, next) => {
	try {
		const post = await Post.findOneAndDelete({ slug: req.params.slug });
		if (!post) {
			const error = new Error('Post was not found');
			return next(error);
		}

		const comments = await Comment.deleteMany({ post: post._id });
		return res.json({
			message: 'Post deleted successfully',
		});
	} catch (error) {
		next(error);
	}
};

const getPost = async (req, res, next) => {
	try {
		const post = await Post.findOne({ slug: req.params.slug }).populate([
			{
				path: 'user',
				select: ['avatar', 'name'],
			},
			{
				path: 'comments',
				match: {
					check: true,
					parent: null,
				},
				populate: [
					{
						path: 'user',
						select: ['avatar', 'name'],
					},
					{
						path: 'replies',
						match: {
							check: true,
						},
						populate: [
							{
								path: 'user',
								select: ['avatar', 'name'],
							},
						],
					},
				],
			},
		]);
		if (!post) {
			const error = new Error('Post was not found');
			next(error);
		}
		return res.json(post);
	} catch (error) {
		next(error);
	}
};

const getAllPost = async (req, res, next) => {
	const posts = await Post.find({}).populate([
		{
			path: 'user',
			select: ['avatar', 'name', 'verified'],
		}
	]);
	const totalCount = await Post.countDocuments({});
	return res.json({ posts, totalCount });
};

export { createPost, updatePost, deletePost, getPost, getAllPost }
