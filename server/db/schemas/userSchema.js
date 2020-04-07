import mongoose from 'mongoose';

const { Schema } = mongoose;

// USER SCHEMA
const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default userSchema;
