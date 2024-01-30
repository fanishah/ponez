const { Schema, model } = require("mongoose");

const OTPSchema = new Schema({
  code: { type: String, required: false, default: "00000" },
  expiresIn: { type: Number, required: true, default: 0 },
});

const UserSchema = new Schema(
  {
    mobile: { type: String, match: /[0-9]/, required: true },
    otp: { type: OTPSchema },
    role: {
      type: String,
      enum: ["MEMBER", "ADMIN", "MANAGER"],
      required: true,
      default: "MEMBER",
    },
    verifiedMobile: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

const UserModel = model("user", UserSchema);

module.exports = UserModel;
