// Establish router
const router = require('express').Router();

// Establish link between functions and source file
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/user-controller');

// ↓↓↓ Establish routes for GET/POST/DELETE/PUT - "CRUD" ~START~ ↓↓↓
router
  .route('/')
  .get(getAllUser)
  .post(createUser);
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);
// ↑↑↑ Establish routes for GET/POST/DELETE/PUT - "CRUD"  ~END~ ↑↑↑

// You got exactly one femtosecond to get the **** out module or this transistor is going to transist!
module.exports = router;