const { Schema, model } = require('mongoose');

const dogSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
      require: true
    },
    image: {
      type: String,
      unique: false,
      require: true,
    },
    name: {
      type: String,
      unique: false,
      require: true
    },
    height: {
      type: String,
      unique: false,
      require: true
    },
    weight: {
      type: String,
      unique: false,
      require: true
    },
    life_span: {
      type: String,
      unique: false,
      require: true
    },
    temperament: {
      type: Array,
      unique: false,
      require: true
    },
    origin: {
      type: String,
      unique: false,
      require: false
    },
    createdBy: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: false,
      unique: false
    }],
    favoriteBy: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: false,
      unique: false
    }]
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = model("Dogs", dogSchema);
