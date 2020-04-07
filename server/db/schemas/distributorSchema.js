import mongoose from 'mongoose';

const { Schema } = mongoose;

// DISTRIBUTOR SCHEMA
const distributorSchema = new Schema(
  {
    name: { type: String, required: true },
    walletBalance: { type: String },
    meters: [{ type: Schema.Types.ObjectId, ref: 'Meter' }],
  },
  {
    timestamps: true,
  }
);

export default distributorSchema;
