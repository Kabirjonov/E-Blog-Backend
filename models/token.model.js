const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User", required:true},
  refreshToken: { type: String, required: true },
});
const ForgotPasswordSchema = new Schema({
  user: {type: Schema.ObjectId, ref: "User", required: true},
  passwordResetToken: { type: String, required: true },
  passwordResetExpires: { type: Date, required: true },
});
ForgotPasswordSchema.index(
  { passwordResetExpires: 1 },
  { expireAfterSeconds: 0 }
);

const Token = model("Token", TokenSchema);
const ForgotPassword = model("ForgotPassword", ForgotPasswordSchema);
module.exports = { Token, ForgotPassword };
