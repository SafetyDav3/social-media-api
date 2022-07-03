// Establish router
const router = require("express").Router();

// Establish link between functions and source file
const {
  createUsers,
  getAllUsers,
  getUsersById,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// ↓↓↓ Establish routes for GET/POST/DELETE/PUT - "CRUD" ~START~ ↓↓↓
router.route("/").get(getAllUsers).post(createUsers);
router.route("/:id").get(getUsersById).put(updateUsers).delete(deleteUsers);
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);
// ↑↑↑ Establish routes for GET/POST/DELETE/PUT - "CRUD"  ~END~ ↑↑↑

// You got exactly one femtosecond to get the **** out module or this transistor is going to transist!
module.exports = router;
