const { Schema } = require("mongoose");
const partySchema = require("./Party");

const weddingSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
	},
	spouseName1: {
		type: String,
	},
	spouseName2: {
		type: String,
	},
	location: {
		type: String,
	},
	parties: [partySchema],
});

module.exports = weddingSchema;
