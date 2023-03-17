const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // get one user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that id" })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // create a user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json
                (dbUserData))
            .catch((err) => res.status(500).json(err));
    },
};