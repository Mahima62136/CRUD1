const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require('../controllers/patientController');

router.route('/')
    .get(protect, getAllPatients)
    .post(protect, createPatient);

router.route('/:id')
    .get(protect, getPatientById)
    .put(protect, updatePatient)
    .delete(protect, deletePatient);

module.exports = router;
