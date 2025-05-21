import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({}, { strict: false });

const ExcelData = mongoose.model('ExcelData', DataSchema);

export default ExcelData;