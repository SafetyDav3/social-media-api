const {
  Schema,
  model
} = require("mongoose");
const formatDate = require("../utils/dateFormat.js");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timeStamp) => formatDate(timeStamp),
  },
}, {
  toJSON: {
    getters: true,
  },
});

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
    minlenght: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timeStamp) => formatDate(timeStamp),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
}, {
  toJSON: {
    getters: true,
    virtuals: true,
    id: false,
  },
});

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const Thought = model("Thought", ThoughtSchema);

model.exports = Thought;