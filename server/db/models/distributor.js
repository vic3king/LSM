import mongoose from 'mongoose';
import distributorSchema from '../schemas/distributorSchema';

// DISTRIBUTOR MODEL
const Distributor = mongoose.model('Distributor', distributorSchema);

export default Distributor;
