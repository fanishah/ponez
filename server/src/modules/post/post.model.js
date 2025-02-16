const { Schema, model, Types } = require("mongoose");

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    photos: { type: Array, default: null },
    province: { type: Types.ObjectId, ref: "province", required: true },
    city: { type: Types.ObjectId, ref: "city", required: true },
    location: { type: String, required: true, default: null },
    options: { type: Array, default: null },
    categoryid: { type: Types.ObjectId, ref: "category", required: true },
    userid: { type: Types.ObjectId, ref: "user", required: true },
    status: { type: Boolean, default: false },
    isshowusermobile: { type: Boolean, default: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

const PostModel = model("post", PostSchema);

module.exports = PostModel;
