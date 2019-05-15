const express = require('express');

const db = require('./postDb')

const router = express.Router();
// GET
    router.get('/', async (req, res) => {
        try {
            const posts = await db.get()
            res.status(200).json(posts)
        } catch (err) {
            res
                .status(500)
                .json({ error: 'The post information could not be found'})
        }
    });

    router.get('/:id', validatePostId, async (req, res) => {
        const { id } = req.params
        try {
            const post = await db.getById(id)
            if (post) {
                res.status(200).json(post)
            } else {
                res
                    .status()
                    .json({ error: "The post could not be found"})
            }
        } catch {
            res
                .status(500)
                .json({ error: 'The Post information could not be retrieved'})
        }
    });
// DELETE
    router.delete('/:id', validatePostId, async (req, res) => {
        const { id } = req.params
        try {
            const deletedPost = await db.remove(id)
            if (deletedPost) {
                res.status(204).json(deletedPost)
            } else {
                res
                    .status()
                    .json({ error: "The post could not be found"})
            }
        } catch {
            res
                .status()
                .json({ error: "The post could not be deleted"})
        }

    });
// PUT
    router.put('/:id',validatePostId, async (req, res) => {
        const { id } = req.params
        const { title, contents } = req.body;
        console.log('req.body', req.body)

        console.log('id', id)
        
        try {
            if (title && contents ) {
                const updatedPost = await db.update(id, req.body)
                console.log(updatedPost)
                if (updatedPost) {
                    res.status(200).json(updatedPost)
                } else {
                    res
                        .status(404)
                        .json({message: "prepared object broken"})
                }
            } else {
                res
                    .status(404)
                    .json({message: "please provide both the title and contents"})
            }
        } catch {
            res
                .status(500)
                .json({ error: "The post could not be edited"})
        }
    });

// custom middleware

async function validatePostId(req, res, next) {
    console.log('validatePostId Middleware')
    const { id } = req.params

    const post = await db.getById(id)
    
    if (post) {
        req.post = post;
        next();
    } else {
        res.status(404).json({ message: 'Post not found; invalid ID'})
    }
};

module.exports = router;