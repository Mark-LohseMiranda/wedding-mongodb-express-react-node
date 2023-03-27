const { Schema } = require("mongoose");
const giftSchema = require("./Gift");

const guestSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	meal: {
		type: String,
	},
	seat: {
		type: String,
	},
	addressSameAsParty: {
		type: Boolean,
	},
	street1: {
		type: String,
	},
	street2: {
		type: String,
	},
	city: {
		type: String,
	},
	state: {
		type: String,
	},
	zipcode: {
		type: String,
	},
	country: {
		type: String,
	},
	gifts: [giftSchema],
});

module.exports = guestSchema;
