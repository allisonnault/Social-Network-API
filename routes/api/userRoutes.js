const router = require('express').Router();
// * /api/users
const {
    getUsers,
    getSingleUser,
    createUser,
    addFriend,
    updateUser,
    deletedUser,
    removeFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser)//.delete(deletedUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;