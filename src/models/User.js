const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isAlpha()) {
                throw new Error('First Name is invalid');
            }
        },
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isAlpha()) {
                throw new Error('Last Name is invalid');
            }
        },
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail()) {
                throw new Error('Invalid Email Address');
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    dateOfBirth: {
        type: Date,
        trim: true,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    age: {
        type: Number,
    },
    phoneNumber: {
        type: Number,
        validate(value) {
            if (!validator.isMobilePhone()) {
                throw new Error('Phone Number is not valid');
            }
        },
    },

    avatar: {
        type: Buffer,
    },
}, {
    timestamps: true,
});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
};

userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const payload = {
        id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 36000000,
    });

    user.token = user.token.concat({ token })
    await user.save()
    return token;
};

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email }); //check if user with given email exists

    if (!user) {
        throw new Error('Unable to login');
    }

    //check if password given is same with hashed password
    const userIsMatch = await bcrypt.compare(password, user.password);

    if (!userIsMatch) {
        throw new Error('Unable to login');
    }
    return user;
};

//Hash user's password before saving

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;