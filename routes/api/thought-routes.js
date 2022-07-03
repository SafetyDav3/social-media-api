// Establish router
const router = require("express").Router();

// Establish links between functions and source file
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// ↓↓↓ Establish routes for GET/POST/DELETE/PUT - "CRUD" ~START~ ↓↓↓
router.route("/").get(getAllThought).post(createThought);
router
.route("/:id")
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);
router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
// ↑↑↑ Establish routes for GET/POST/DELETE/PUT - "CRUD"  ~END~ ↑↑↑

// Excuse me module but I'd kindly like to ask you to leave
module.exports = router;
