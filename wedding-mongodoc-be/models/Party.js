const { Schema } = require("mongoose");
const guestSchema = require("./Guest");

const partySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	dateInviteSent: {
		type: Date,
	},
	dateRSVPReceived: {
		type: Date,
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
	guests: [guestSchema],
});

module.exports = partySchema;
