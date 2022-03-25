/*
 *BookService.js
 *Muksud Hussain Mahi
 *ID: 301155894
 *November 17, 2021
 *
 * Modified by:
 * Oleg Gorbunov
 * ID: 301093263
 * Dec 10, 2021
 */

let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let BookService = new Schema({
  ServiceProvider: {
    type: String,
    default: "",
    trim: true,
    required: "Required",
  },
  ServiceName: {
    type: String,
    default: "",
    trim: true,
    required: "Required",
  },
  DateTime: {
    type: Date,
    default: Date.now,
    required: "Date and time are required",
  },
  ServiceSeeker: {
    type: String,
    default: "",
    trim: true,
    required: "Required",
  },
});

module.exports = mongoose.model("BookService", BookService);
