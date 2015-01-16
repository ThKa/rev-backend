/**
 * Module dependencies.
 */
var mongoose = require('ypbackendlib').mongoose,
    common = require('ypbackendlib').commmonModels,
    enums = require('./enums'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * Weigh In Schema
 * @type {Schema}
 */

var ApplicationSchema = common.newSchema({
    applicant: { type: ObjectId, ref: 'User', required: true },
    request: { type: ObjectID, ref: 'Request', required: true },
    status: { type: String, enum: enums.applicationStatus, default: "applied" },
    applicationTimestamp: { type: Date, default: Date.now } // now
    
});

module.exports = mongoose.model('Application', ApplicationSchema);
