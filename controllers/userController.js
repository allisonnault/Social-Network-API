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

    // add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId}, 
            { $addToSet: { friends: req.params.friendId} }, 
            { runValidators: true, new: true })
        .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that id" })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thoughts) => {
            return Thought.updateMany(
                { userId: req.params.userId },
                { $set: { username: req.body.username } }
            );
        })
        .then((user) => 
        !user  
            ? res.status(404).json({ message: "no user with this id! "})
            : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // deleteUser(req, res) {

    // }
};