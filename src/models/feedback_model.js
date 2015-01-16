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

var FeedbackSchema = common.newSchema({
    feedbackAuthor: { type: ObjectId, ref: 'User', required: true },
    feedbackTarget: { type: ObjectId, ref: 'User', required: true }, // must be different from author!
    request: { type: ObjectID, ref: 'Request', required: true },
    feedbackProfessional: { type: String, enum: enums.feedbackRating, default: "med" },
    feedbackFriendly: { type: String, enum: enums.feedbackRating, default: "med" },
    feedbackReliable: { type: String, enum: enums.feedbackRating, default: "med" },
    feedbackPunctual: { type: String, enum: enums.feedbackRating, default: "med" },
    feedbackCapable: { type: String, enum: enums.feedbackRating, default: "med" },
    feedbackTimestamp: { type: Date, default: Date.now } // now
    
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
