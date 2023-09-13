const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Post = require('./Post');
const Job = require('./Job');
const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'First Name is required.'],
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: [true, 'Email Address must be unique'],
			validate(value) {
				if (!validator.isEmail(value)) {
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
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		age: {
			type: Number,
		},
		phoneNumber: {
			type: String,
			validate(value) {
				if (!validator.isMobilePhone(value)) {
					throw new Error('Phone Number is not valid');
				}
			},
			required: true,
		},
		avatar: {
			type: Buffer,
		},
		jobApplications: [
			{
				job: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Job',
				},
			},
		],
		workExperience: [
			{
				name: { type: String, required: true },
				employer: { type: String, required: true },
				description: { type: String, required: true },
				visible: { type: Boolean, default: true },
			},
		],
		education: [
			{
				name: { type: String, required: true },
				university: { type: String, required: true },
				description: { type: String, required: true },
				visible: { type: Boolean, default: true },
			},
		],
		skills: [
			{
				name: { type: String },
				visible: { type: Boolean, default: true },
			},
		],
		friends: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		timestamps: true,
		virtuals: true,
	}
);

userSchema.virtual('posts', {
	ref: 'Post',
	localField: '_id',
	foreignField: 'creator',
});

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.avatar;

	return userObject;
};

userSchema.methods.generateAuthToken = async function () {
	const user = this;

	const payload = {
		id: user.id,
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: 36000000,
	});

	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
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

userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
	}

	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
