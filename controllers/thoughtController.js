const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req,res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.paramas.thoughtId })
            .then((thought) => 
            !thought
            ? res.status(404).json({ message: "No thought found with that ID" })
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
    })
    .then((user) => 
    !user
    ? res.status(404).json({ message: "Thought created, but found no user with that ID" })
    : res.json('Create the thought')
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},
// updateThought,
// deleteThought,
// addReaction,
// deleteReaction,

};