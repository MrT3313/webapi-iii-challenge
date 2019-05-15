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

    router.get('/:id', (req, res) => {

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