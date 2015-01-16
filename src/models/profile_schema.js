/**
 * Module dependencies.
 */
var enums = require('./enums');

/**
 * Profile Schema Extension
 * @type {Schema}
 */


module.exports = {
    prefs: {
        units: { type: String, enum: enums.units, default: "metric" },
        selectedCategories: [{type: String, enum: enum.requestCategories}]
    }
};
