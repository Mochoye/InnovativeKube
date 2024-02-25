import mongoose from 'mongoose';

const vitalSchema = new mongoose.Schema(
  {
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type:Number,
      required: true,
    },
    height: {
      type:Number,
      required: true,
    },
    activity_level: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required:true
    },
    userRef: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const Vitals = mongoose.model('Vitals', vitalSchema);

export default Vitals;

