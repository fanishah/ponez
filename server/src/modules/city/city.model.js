const { Schema, model, Types } = require("mongoose");

const CitySchema = new Schema(
  {
    name: { type: String, required: true },
    provinceId: { type: Types.ObjectId, required: true },
  },
  {
    toJSON: { virtuals: true },
  }
);

CitySchema.virtual("province", {
  ref: "province",
  localField: "provinceId",
  foreignField: "_id",
});

function autoPopulate(next) {
  this.populate([{ path: "province", select: { __v: 0 } }]);
  next();
}

CitySchema.pre("findOne", autoPopulate).pre("find", autoPopulate);

const CityModel = model("city", CitySchema);

module.exports = CityModel;
