import mongoose from 'mongoose';

const { Schema } = mongoose;

// ADMIN SCHEMA
const adminSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    accessLevel: {
      type: String,
      default: 'admin',
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    canCreate: {
      type: Boolean,
      default: false,
    },
    canView: {
      type: Boolean,
      default: true,
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    canDelete: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default adminSchema;
