const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // get the token from the request header
    const token = req.header('token');

    // check if there's no token
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // verify the token
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded.user;

    // get the user from the database by id
    const user = await User.findById(req.user.id);

    // check if the user's role is 1
    if (user.role !== 1) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    // allow the user to pass through
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
