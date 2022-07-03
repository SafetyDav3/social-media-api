// Establishing mongoose schema and using our date formatter
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// Creating a schema for reactions
const ReactionSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Thought schema incorporating reactions
const ThoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Tethering reaction count as a virtual
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Using schema to create a thought model
const Thoughts = model("Thoughts", ThoughtSchema);

// Get you stuff and GET OUT!!!
module.exports = Thoughts;
