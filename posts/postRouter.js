const express = require('express');

const db = require('./postDb')

const router = express.Router();
//-1-// GET
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
                    .status(999)
                    .json({ error: "The post could not be found, indalid ID"})
            }
        } catch {
            res
                .status(500)
                .json({ error: 'The Post information could not be retrieved'})
        }
    });
//-2-// DELETE
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
//-3-// PUT
    router.put('/:id', validatePostId, async (req, res) => {
        try {
            const {id} = req.params
            const editPost = await db.update(id, req.body)
            res.status(200).json(editPost)
        } catch (err) {
            releaseEvents.status(500).json({ message: "error with updating post"})
        }
    });

// CUSTOM MIDDLEWARE
async function validatePostId(req, res, next) {
    console.log('validatePostId Middleware')

    const { id } = req.params

    const validID = await db.getById(id)
    
    if (validID) {
        req.validID = validID;
        next();
    } else {
        res.status(404).json({ message: 'Post not found; invalid ID'})
    }
};

module.exports = router;