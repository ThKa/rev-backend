/**
 * Module dependencies.
 */
var mongoose = require('ypbackendlib').mongoose,
    common = require('ypbackendlib').commmonModels,
    moments = require('moments-timezone'),
    enums = require('./enums'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * Weigh In Schema
 * @type {Schema}
 */

var RequestSchema = common.newSchema({
    owner: { type: ObjectId, ref: 'User', required: true },
    status: { type: String, enum: enums.requestStatus, default: "open" },
    location: {type: [Number], index: '2d'},
    further-description: {type: String, trim: true, i18n: true, required: false},
    category: { type: String, enum: enums.requestCategories, default: "Gard"},
    creationDate: { type: Date, default: Date.now }, // today
    expieryDate: { type: Date, default: Date.now + 2d }, // today plus 2 days
    earliestWorkStartDate: { type: Date, default: Date.now }, 
    latestWorkStartDate: { type: Date, default: moment().add(2,'days').toDate() }, // today plus 2 days
    workDuration:  { type: Number, min: 1, default: 60 } // Estimated working time in minutes
});

module.exports = mongoose.model('Request', RequestSchema);
