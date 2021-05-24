const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');

exports.addUser = async (req, res) => {
    const {error} = validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email});
    if(user) {
        return res.status(400).send('User already exist with thi email.');
    }
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ['name', 'email', 'isAdmin']));
};
exports.getUser = async (req, res) => {
    const user = await User.find().sort('name').select('-password');
    res.send(user);
};
exports.getMe = async (req, res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
};
exports.putMe = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, {email: req.body.email}).select('-password');
    res.send(user);
}