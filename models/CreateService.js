/*
*CreateService.js
*Muksud Hussain Mahi
*ID: 301155894
*November 17, 2021
*/
const mongoose = require('mongoose');


let CreateService = mongoose.Schema(
    {
        ServiceProvider:
        {
            type: String,
            default: '',
            trim: true,
            required: 'Required'
        },
        ServiceProviderEmail:
        {
            type: String,
            default:"",
            trim: true,
            required: 'is Required'
        },
        ServiceName:
        {
            type: String,
            default: '',
            trim: true,
            required: 'Required'
        },
        Description:
        {
            type: String,
            default: '',
            trim: true,
            required: 'Required'
        },
        Category:
        {
            type: String,
            default: '',
            trim: true,
            required: 'Required'
        },
        StartDate:
        {
            type: Date,
            default: Date.now,
           
        },
        EndDate:
        {
            type: Date,
            default: Date.now,
            
        },
        //remove availability at second release
        Availability:
        {
            type: String,
            default: '',
            
        },
        //added by Stephen Kamino
        //March 01 2022
        Appts:
        {
            type: Array
        }
    },
    {
        collection: "ServiceAds"
    }
);

module.exports = mongoose.model('CreateService',CreateService);