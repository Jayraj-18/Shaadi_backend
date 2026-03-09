const express = require('express');
const { saveBiodata, updateBiodata, getBiodataById, getUserBiodatas, duplicateBiodata, deleteBiodata } = require('../controllers/biodata.controller');
const { protect } = require('../middlewares/auth.middleware');
const { generatePdf } = require('../services/pdf.service');
const router = express.Router();

router.post('/', protect, saveBiodata);
router.get('/', protect, getUserBiodatas);
router.get('/:id', getBiodataById);
router.put('/:id', protect, updateBiodata);
router.post('/:id/duplicate', protect, duplicateBiodata);
router.delete('/:id', protect, deleteBiodata);

router.post('/:id/download', async (req, res) => {
    try {
        const { htmlContent, isWatermarked } = req.body;
        const pdfBuffer = await generatePdf(htmlContent, { isWatermarked });
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=biodata.pdf',
            'Content-Length': pdfBuffer.length
        });
        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/download-direct', async (req, res) => {
    try {
        const { htmlContent, isWatermarked } = req.body;
        const pdfBuffer = await generatePdf(htmlContent, { isWatermarked });
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=biodata.pdf',
            'Content-Length': pdfBuffer.length
        });
        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
