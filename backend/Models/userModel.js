import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
// console.log(mongoose);
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
  },
  avatar: {
    type: String,
    enum: [
      "default",
      "goku",
      "naruto",
      "winry",
      "shinchan",
      "sakura",
      "pikachu",
      "po",
      "saturu",
      "kirmada",
    ],
    default: "default",
  },
  avatarUrl: {
    type: String,
    default:
      "https://st2.depositphotos.com/1069290/44761/v/450/depositphotos_447612982-stock-illustration-cute-young-man-avatar-character.jpg",
  },
  sex: {
    type: String,
    enum: ["male", "female", "others"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cnfPassword: {
    type: String,
    required: true,
    validate: [
      function (cnfPassword) {
        return cnfPassword === this.password;
      },
      "the confirm password did not match the original password",
    ],
  },
  passwordCreatedAt: {
    type: Number,
  },
  Otp: {
    type: Number, // we shall keep the opt as a number mate
  },
  otpVaildTime: {
    //this will store the time till we have this user is valid
    type: Date,
    default: Date.now() + 15 * 60 * 1000, // 15 min from now mate in ms
  },
  isVerified: {
    // we shall verfy this lad once the otp matches mate
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  //   console.log(" we are here in this pre save middleware for the doc ", this);
  if (this.isModified("password")) {
    //only to run this when the field specified in the function changes//called on the doc apperently
    this.password = await bcrypt.hash(this.password, 10);
    this.cnfPassword = "";
    this.passwordCreatedAt = Date.now() - 2000;
    console.log(
      "we are here in pre save middlware ",
      this.password,
      this.cnfPassword,
      this.passwordCreatedAt
    );
  }
  next();
});
userSchema.methods.isPassWordTrue = async function (
  candidatePass,
  realPassord
) {
  return await bcrypt.compare(candidatePass, realPassord);
  //   console.log("the password we got are ", candidatePass, realPassord);
  //   console.log("this is the result of compare  ---->>", res);
  //   return true;
};
userSchema.methods.isTokenValid = function (tokenIssuedTime, tokenExpiresTime) {
  console.log(
    "checking the time 😎😎😎😎😎😎",
    this.passwordCreatedAt / 1000,
    tokenIssuedTime
    // tokenExpiresTime * 1000,
    // Date.now()
  );
  return (
    this.passwordCreatedAt / 1000 < tokenIssuedTime ||
    Date.now() / 1000 > tokenExpiresTime
  );
};
const User = mongoose.model("User", userSchema);
export default User;
