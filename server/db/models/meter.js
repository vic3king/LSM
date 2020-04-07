import mongoose from 'mongoose';
import meterSchema from '../schemas/meterSchema';

// METER MODEL
const Meter = mongoose.model('Meter', meterSchema);

export default Meter;
