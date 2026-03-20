const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Patient name is required'],
            trim: true,
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [1, 'Age must be a positive number'],
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: {
                values: ['Male', 'Female', 'Other'],
                message: '{VALUE} is not a valid gender',
            },
        },
        disease: {
            type: String,
            trim: true,
        },
        admissionDate: {
            type: Date,
            default: Date.now,
        },
        contactNumber: {
            type: String,
            required: [true, 'Contact number is required'],
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: false,
    }
);

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
