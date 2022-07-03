const { Users } = require("../models");

const userController = {
  createUsers({ body }, res) {
    Users.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  getAllUser(req, res) {
    Users.find({})
      .populate({
        path: "Thought",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({
        _id: -1,
      })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getUserById({ params }, res) {
    Users.findOne({
      _id: params.id,
    })
      .populate({
        path: "Thought",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "User not found",
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateUser({ params, body }, res) {
    Users.findOneAndUpdate(
      {
        _id: params.id,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "User not found",
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  deleteUser({ params }, res) {
    Thought.deleteMany({
      userId: params.id,
    })
      .then(() => {
        User.findOneAndDelete({
          userId: params.id,
        }).then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({
              message: "User not found",
            });
            return;
          }
          res.json(dbUserData);
        });
      })
      .catch((err) => res.json(err));
  },

  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      {
        _id: params.id,
      },
      {
        $push: {
          friends: params.friendId,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "User not found",
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  deleteFriend({ params }, res) {
    Users.findOneAndUpdate(
      {
        _id: params.id,
      },
      {
        $pull: {
          friends: params.friendId,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "User not found",
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
