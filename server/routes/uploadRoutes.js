import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import mongoose from 'mongoose';
import fs from 'fs';
import ExcelData from '../models/ExcelData.js';
import { console } from 'inspector';

const router = express.Router();

// Multer config
const upload = multer({ dest: 'uploads/' });

// Route to handle Excel file upload
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    await ExcelData.insertMany(jsonData);
    fs.unlinkSync(req.file.path); // delete temp file

    res.status(200).json({ message: 'Data uploaded to MongoDB successfully!' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Something went wrong during upload' });
  }
});

// ✅ Route to fetch all Excel data
router.get('/data', async (req, res) => {
  try {
    const allData = await ExcelData.find({});
    res.status(200).json(allData);
  } catch (error) {
    console.error('Fetch error:',error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;