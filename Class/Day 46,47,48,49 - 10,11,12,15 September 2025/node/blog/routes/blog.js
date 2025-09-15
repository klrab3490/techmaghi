const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const auth = require('../middleware/auth'); // JWT middleware

// Public: View all blogs
router.get('/get', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email');
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Public: View single blog by ID
router.get('/get/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email');
        if (!blog) return res.status(404).send({ error: 'Blog not found' });
        res.status(200).send(blog);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Protected: Create a blog
router.post('/create', auth, async (req, res) => {
    try {
        const newBlog = new Blog({
            ...req.body,
            author: req.user.id
        });
        await newBlog.save();
        res.status(201).send(newBlog);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Protected: Update a blog (only author)
router.put('/update/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send({ error: 'Blog post not found' });

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).send({ error: 'Unauthorized' });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).send(updatedBlog);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Protected: Delete a blog (only author)
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send({ error: 'Blog post not found' });

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).send({ error: 'Unauthorized' });
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
