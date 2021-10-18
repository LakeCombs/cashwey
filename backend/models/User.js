const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    email: {
      type: String,
      requied: true,
    },
    password: {
      type: String,
      required: true,
      match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      minlength: 8,
    },
  },
  { timestamps: true }
);

UserSchema.methods.matchPassoword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(15);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
