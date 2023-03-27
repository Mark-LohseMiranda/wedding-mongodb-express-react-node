const { Schema } = require("mongoose");

const giftSchema = new Schema({
	item: {
		type: String,
		required: true,
	},
	dateThankYouSent: {
		type: Date,
	},
});

module.exports = giftSchema;
