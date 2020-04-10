import mongoose from 'mongoose';

const { Schema } = mongoose;

// METER SCHEMA
const meterSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    distributor: { type: Schema.Types.ObjectId, ref: 'Distributor' },
    meterNumber: {
      type: Number,
      required: true,
      lowercase: true,
      unique: true,
    },
    clientId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default meterSchema;
