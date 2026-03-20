const Patient = require('../models/patientModel');

const createPatient = async (req, res) => {
    try {
        const { name, age, gender, disease, admissionDate, contactNumber } = req.body;
        if (!name || !age || !gender) return res.status(400).json({ message: 'Name, age, and gender are required fields' });

        const patient = new Patient({
            name, age, gender, disease, contactNumber,
            ...(admissionDate && { admissionDate })
        });

        const createdPatient = await patient.save();
        return res.status(201).json(createdPatient);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const filter = {};
        if (req.query.gender) filter.gender = req.query.gender;
        if (req.query.disease) filter.disease = new RegExp(req.query.disease, 'i');

        const patients = await Patient.find(filter);
        return res.status(200).json(patients);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        await patient.save();
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        return res.status(200).json(patient);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updatePatient = async (req, res) => {
    try {
        const { name, age, gender, disease, admissionDate, contactNumber } = req.body;
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });

        if (name) patient.name = name;
        if (age) patient.age = age;
        if (gender) patient.gender = gender;
        if (disease !== undefined) patient.disease = disease;
        if (admissionDate) patient.admissionDate = admissionDate;
        if (contactNumber !== undefined) patient.contactNumber = contactNumber;

        const updatedPatient = await patient.save();
        return res.status(200).json(updatedPatient);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });

        await patient.deleteOne();
        return res.status(200).json({ message: 'Patient successfully removed' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient };
