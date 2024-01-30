const { Schema, model, Types } = require("mongoose");

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, index: true },
  icon: { type: String, required: true },
  parent: { type: Types.ObjectId, ref: "category" },
  parents: {
    type: [Types.ObjectId],
    ref: "category",
    required: false,
    default: [],
  },
});

const CategoryModel = model("category", CategorySchema);

module.exports = CategoryModel;
