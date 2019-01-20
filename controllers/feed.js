<<<<<<< HEAD
const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Post = require('../models/post');
const User = require('../models/user');
=======
const { validationResult } = require('express-validator/check');

const fs = require('fs');
const path = require('path');

const Post = require('../models/post');
>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062

exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Post.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Post.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(posts => {
      res.status(200).json({
        message: 'Fetched posts successfully.',
        posts: posts,
        totalItems: totalItems
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
<<<<<<< HEAD
=======


>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
<<<<<<< HEAD
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
=======
    const error = new Error('Validation failed!')
    error.statusCode = 422;
    throw error;
  }

>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }
<<<<<<< HEAD
  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
  let creator;
=======

  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
<<<<<<< HEAD
    creator: req.userId
  });
  post
    .save()
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
        post: post,
        creator: { _id: creator._id, name: creator.name }
=======
    creator: { name: 'Furkan' },
  });
  post.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
<<<<<<< HEAD
    });
};

=======
    })

};


>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
<<<<<<< HEAD
        throw error;
      }
      res.status(200).json({ message: 'Post fetched.', post: post });
=======
        throw error; //go in catch block
      }
      res.status(200).json({
        message: 'Post fetched',
        post: post
      });
>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
<<<<<<< HEAD
};
=======
}
>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
<<<<<<< HEAD
    const error = new Error('Validation failed, entered data is incorrect.');
=======
    const error = new Error('Validation failed!')
>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
<<<<<<< HEAD
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
=======

  }

  if (!imageUrl) {
    const error = new Error('No file picked');
>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
    error.statusCode = 422;
    throw error;
  }
  Post.findById(postId)
    .then(post => {
      if (!post) {
<<<<<<< HEAD
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
=======
        const error = new Error('Validation failed!')
        error.statusCode = 422;
>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    })
    .then(result => {
<<<<<<< HEAD
      res.status(200).json({ message: 'Post updated!', post: result });
=======
      res.status(200).json({ message: 'Post updated', post: result });
>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

<<<<<<< HEAD
=======

>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
<<<<<<< HEAD
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      // Check logged in user
=======
        const error = new Error('Validation failed!')
        error.statusCode = 422;
        throw error;
      }
      //Check logged in use
>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then(result => {
<<<<<<< HEAD
      return User.findById(req.userId);
    })
    .then(user => {
      user.posts.pull(postId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Deleted post.' });
=======
      console.log(result);
      res.status(200).json({ message: 'Deleted post.' });

>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
<<<<<<< HEAD
};

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
=======

}

const clearImage = filepath => {
  filepath = path.join(__dirname, '..', filepath);
  fs.unlink(filepath, err => console.log(err));
}
>>>>>>> 5e7c05f76164c804c6c0df0325ad9a6490543062
