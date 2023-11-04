const Post = require("../models/Post");
//GET (all)
exports.getAllPosts = async (req, res, next) => {
  try {
    const [posts, _] = await Post.findAll();

    res.status(200).json({ count: posts.length, posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//POST
exports.createNewPost = async (req, res, next) => {
  try {
    let { title, body } = req.body;
    let post = new Post(title, body);

    post = await post.save();

    res.status(201).json({ message: "Post created" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//GET (id)
exports.getPostById = async (req, res, next) => {
  try {
    let postId = req.params.id;
    let [post, _] = await Post.findById(postId);

    res.status(200).json({ post: post[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//PUT
exports.putPost = async (req, res, next) => {
  try {
    let postId = req.params.id;
    let { title, body } = req.body;
    let post = new Post(title, body);
    post = await post.updatePost(postId);
    res.status(200).json({ message: "Post updated" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//DELETE
exports.deletePost = async (req, res, next) => {
  try {
    let postId = req.params.id;
    let post = await Post.deleteById(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
