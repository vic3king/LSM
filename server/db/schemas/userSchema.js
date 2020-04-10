import mongoose from 'mongoose';

const { Schema } = mongoose;

// USER SCHEMA
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    meters: [{ type: Schema.Types.ObjectId, ref: 'Meter' }],
  },
  {
    timestamps: true,
  }
);

export default userSchema;
