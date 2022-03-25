//Availability.js 
//Description: represents an availibility instance.  Marks a single day where service are availiable 
//By: Stephen Kamino
///Date: Mar 12 2022
const mongoose = require('mongoose');
let Availability = mongoose.Schema(
    {
        //actually an Id
        serviceOwner:
        {
            type: String,
            trim: true,
            required: true
        },
        date:
        {
            type: String,
            trim: true,
            required: true
        },
        start:
        {
            type: String,
            trim: true,
            required: true
        },
        end:
        {
            type: String,
            trim: true,
            required: true
        },
        ad:
        {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        collection: 'availability'
    }
);

module.exports = mongoose.model('Availability', Availability);