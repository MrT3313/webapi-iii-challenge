const express = require('express');

const db = require('./userDb')

const router = express.Router();
// GET
    router.get("/", async (req, res) => {
        console.log('USERrouter -> /')
        try {
            const users = await db.get()
            console.log(users)
            res.status(200).json(users)
        } catch (err) {
            res
                .status(500)
                .json({ error: 'The user information could not be found'})
        }
    });

    router.get('/:id', validateUserId, async (req, res) => {
        const { id } = req.params
        try {
            const user = await db.getById(id)
            if (user) {
                res.status(200).json(user)
            } else {
                res
                    .status(999)
                    .json({ error: "The user could not be found, indalid ID"})
            }
        } catch {
            res
                .status(500).json({ error: 'The user information could not be retrieved'})
        }
    });

    router.get('/:id/posts', validateUserId, (req, res) => {

});
// POST
    router.post('/', async (req, res) => {

    });

    router.post('/:id/posts', validateUserId, (req, res) => {

    });
// DELETE
    router.delete('/:id', validateUserId, (req, res) => {

    });
// PUT
    router.put('/:id', validateUserId, (req, res) => {

    });

//custom middleware

async function validateUserId(req, res, next) {
    console.log('validateUserId Middleware')
    const { id } = req.params;

    const user = await db.getById(id)
    
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(404).json({ message: 'User not found; invalid ID'})
    }
};

function validateUser(req, res, next) {


    next()
};

function validatePost(req, res, next) {


    next()
};

module.exports = router;
