//Appts.js
//Description: Model file for the appointments 
//By: Stephen Kamino
///Date: Mar 04 2022

const mongoose = require('mongoose');


let Appointment = mongoose.Schema(
    {
        ApptProvider: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'Provider is required'
        },
        ApptRequirer: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'Requirer is required'
        },
        ApptDate: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'date is required'
        },
        ApptLoc: 
        {
            type: String,
            default: '',
            trim: true,
        },
        ApptTime:
        {
            type: String,
            default: '',
            trim: true
        }
    },
    {
        collection: 'appts'
    }
)

module.exports = mongoose.model('Appointment', Appointment);