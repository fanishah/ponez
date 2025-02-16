const { Schema, model } = require("mongoose");

const ProvinceSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { toJSON: { virtuals: true } }
);

const ProvinceModel = model("province", ProvinceSchema);

module.exports = ProvinceModel;
