const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: false,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    otp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OTP',
        required: false,
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    customerID: {
        type: String,
        required: false,
        unique: true
    },
    subscribed: {
        type: Boolean,
        required: true,
        default: false
    },
    last_subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription'
    },
    subscriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription'
    }],
    // ===========================================================
    stripe_sessionId: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false,
    },
    plan: {
        type: String,
        enum: ['none', 'basic'],
        default: 'none',
        required: false
    },
    hasTrial: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

UserSchema.plugin(findOrCreate);
const User = mongoose.model('User', UserSchema);
module.exports = User;