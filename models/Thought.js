const { Schema, model } = require('mongoose');
const reactions = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
            ref: 'user'
        },
        userId: {
            type: Schema.Types.ObjectId, 
            ref: 'user'
        },
        reactions: [reactions]
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;