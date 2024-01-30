const { Schema, model, Types } = require("mongoose");

const OptionSchema = new Schema({
  title: { type: String, required: true },
  key: { type: String, required: true, index: true },
  list: { type: Array, default: [] },
  guid: { type: String, default: null },
  required: { type: Boolean, default: false },
  category: {
    type: Types.ObjectId,
    ref: "category",
    required: true,
  },
});

const OptionModel = model("option", OptionSchema);

module.exports = OptionModel;
