const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    //get thought by _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with that ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username, userId: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Thought created, but found no user with that ID" })
                    : res.json('thought created')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
        )
        .then((thought) => 
        !thought 
            ? res.status(404).json({ message: "no thought found with that ID "})
            : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'Thought deleted but no user with this id!' })
            : res.json({ message: 'Thought successfully deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    },

    // addReaction(req, res) {

    // },

    // deleteReaction (req, res) {

    // },

};