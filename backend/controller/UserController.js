const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

//@descriptio SignIn User
//@route    POST /api/users/login
//@access   Public
const siginInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist && (await User.matchPassword(password))) {
    res.status(200).json({
      _id: userExist._id,
      name: userExist.name,
      isAdmin: userExist.isAdmin,
      email: userExist.email,
      pic: userExist.pic,
      token: generateToken(userExist._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(404);
    throw new Error("User already exists");
  }

  const createUser = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (createUser) {
    res.status(201).json({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      isAdmin: createUser.isAdmin,
      pic: createUser.pic,
      token: generateToken(createUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const editUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await User.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});
module.exports = { siginInUser, registerUser, editUser };
