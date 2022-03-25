//TermsOfService.js
//Description: to represent a service ad in the database
//Date: ?
//Author: Previous Dev Team


const mongoose = require('mongoose');


let Terms = mongoose.Schema(
    {
        service: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'Provider is required'
        },
        serviceProvider:
        {
            type: String,
            default: '',
            trim: true,
            required: 'Provider is required'
        },
        terms:
        {
            type: String,
            default: '',
            trim: true,
            required: 'Provider is required'
        }
    },
    {
        collection: 'terms'
    }
)

module.exports = mongoose.model('Terms', Terms);