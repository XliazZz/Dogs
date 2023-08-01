const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      require: true
    },
    email: {
      type: String,
      unique: true,
      require: true
    },
    password: {
      type: String,
      unique: false,
      require: true
    },
    favoriteDogs: [{
      type: Schema.Types.ObjectId,
      ref: 'Dogs'
    }],
    createdDogs: [{
      type: Schema.Types.ObjectId,
      ref: 'Dogs'
    }]
  },
  {
    timestamps: false,
    versionKey: false
  }
)

userSchema.methods.encryptPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(this.password, salt);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password)
};


module.exports = model("User", userSchema);