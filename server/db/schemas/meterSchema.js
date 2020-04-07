import mongoose from 'mongoose';

const { Schema } = mongoose;

// METER SCHEMA
const meterSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    distributor: { type: Schema.Types.ObjectId, ref: 'Distributor' },
  },
  {
    timestamps: true,
  }
);

export default meterSchema;
