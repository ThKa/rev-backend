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

var RequestSchema = common.newSchema({
    owner: { type: ObjectId, ref: 'User', required: true },
    status: { type: String, enum: enums.requestStatus, default: "open" },
    location: {type: [Number], index: '2d'},
    further-description: {type: String, trim: true, i18n: true, required: false},
    category: { type: String, enum: ['SmRe', 'Comp', 'Gard', 'Baby', 'AniC', 'OfWo', 'TecS']}
});

module.exports = mongoose.model('Request', RequestSchema);
