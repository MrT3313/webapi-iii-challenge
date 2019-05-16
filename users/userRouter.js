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

    router.get('/:id',  validateUserId, async (req, res) => {
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

    router.get('/:id/posts', validateUserId, async (req, res) => {
        const { id } = req.params
        try {
            const posts = await db.getUserPosts(id)
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(999).json({ error: "Another horrible USER error"})
            }
        } catch {
            res.status(500).json({ error: "oops../:id/posts be broken"})
        }
});
// POST
    router.post('/', async (req, res) => {
        const user = req.body
        console.log(user)
        try {
            const newUser = await db.insert(user)
            if (newUser) {
                res.status(200).json(newUser)
            } else {
                res.status(500).json({ error: "bro we sorry"})
            }
        } catch {
            res
                .status(500)
                .json({ error: 'The Post information could not be retrieved'})
        }


    });

    router.post('/:id/posts', validateUserId, async (req, res) => {
        const { id } = req.params
        try {
            const newPost = await db.getUserPosts(id)

        } catch {
            res
                .status(500)
                .json({ error: 'The Post information could not be retrieved'})
        }

    });
// DELETE
    router.delete('/:id', validateUserId, async (req, res) => {
        const { id } = req.params
        try {
            const deletedUser = await db.remove(id)
            if (deletedUser) {
                res.status(200).json(deletedUser)
            } else {
                res.status(999).json({ error: "user could not be deleted"})
            }
        } catch {
            res.status(500).json({ error: "user could not be deleted"})
        }


    });
// PUT
    router.put('/:id', validateUserId, validateUser, async (req, res) => {
        // const { id } = req.params
        // const { name } = req.body
        // console.log("name", name)
        // console.log('id', id)

        try {
            if (name) {
                const newName = await db.update(id, req.body)

                if (newName) {
                    res.status(200).json(newName)
                } else {
                    res
                        .status(404)
                        .json({message: "prepared object broken"})
                }
            } else {
                res.status(500).json({ error: "The user could not be edited"})
            }
        } catch {
            res.status(500).json({ error: "The user could not be edited"})
        }
    });



/// CUSTOM MIDDLEWARE
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
    console.log('ValidateUser middleware')
    const bodyToPass = req.body
    console.log('req.body / bodyToPass', req.body)

    if (bodyToPass) {
        if (bodyToPass.name) {
            res.status(200).json(bodyToPass)
        } else {
            res.status(400).json({ message: 'missing required name field'})
        }
    } else {
        res.status(500).json({ message: "missing user data"})
    }

    next()
};

function validatePost(req, res, next) {
    console.log('ValidatePost middleware')
    const newPost = req.body
        if (newPost && Object.keys(newPost).length) {
            if (( newPost.text).length) {
                next();
            } else {
                res.status(400).json({ message: 'missing required text field'})
            }
        } else {
            res.status(500).json({ message: 'missing post data'})
        }
};

module.exports = router;
