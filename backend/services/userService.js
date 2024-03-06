const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

exports.registerUser = async (userData) => {
  const { email, name, password } = userData;
  if (!validator.isEmail(userData.email)) {
    throw new Error('Invalid email');
  }
  let user = await User.findOne({ where: { email, name } });
  if (user) {
    throw new Error('User already exists');
  }

  user = new User({ email, name, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const payload = {
    user: {
      id: user.id
    }
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 3600 }
  );

  return token;
};

exports.loginUser = async (userData) => {
  if (!userData || !userData.email || !userData.password) {
    throw new Error('Invalid user data');
  }
  if (!validator.isEmail(userData.email)) {
    throw new Error('Invalid email');
  }
  const user = await User.findOne({ where: { email: userData.email } }); // use userData.email
  if (!user) {
    throw new Error('Invalid Credentials');
  }

  const isMatch = await bcrypt.compare(userData.password, user.password); // use userData.password
  if (!isMatch) {
    throw new Error('Invalid Credentials');
  }

  const payload = {
    user: {
      id: user.id
    }
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 3600 }
  );

  return token;
};