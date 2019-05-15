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

    router.get('/:id', async (req, res) => {
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
    router.delete('/:id', (req, res) => {

    });
// PUT
    router.put('/:id', (req, res) => {

    });

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;