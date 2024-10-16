const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Collection = require('./collection')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.post('save', async function (doc, next) {
  try {
    await Collection.create({
      userId: doc._id,
      collectionName: `${doc.username}'s Main Collection`,
      isMain: true,
    });

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.post('findOneAndDelete', async function (doc, next) {
  try {
    if (doc) {
      await Collection.deleteMany({ userId: doc._id });
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
