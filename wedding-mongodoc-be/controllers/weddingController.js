const { User } = require("../models");

module.exports = {
	async createWedding({ user, body }, res) {
		try {
			const foundUser = await User.findById(user.data._id).select('email firstName weddings');
			foundUser.weddings.push(body);
			await foundUser.save().then((ret) => res.status(200).json(ret));
		} catch (error) {
			res.status(500).json(error.message);
		}
	},

	async updateWedding({ user, body, params }, res) {
		try {
			const foundUser = await User.findById(user.data._id).select('email firstName weddings');
			const foundWedding = foundUser.weddings.id(params.weddingId);
			if (body.name) foundWedding.name = body.name;
			if (body.date) foundWedding.date = body.date;
			if (body.spouseName1) foundWedding.spouseName1 = body.spouseName1;
			if (body.spouseName2) foundWedding.spouseName2 = body.spouseName2;
			if (body.location) foundWedding.location = body.location;
			await foundUser.save().then((ret) => res.status(200).json(ret));
		} catch (error) {
			res.status(500).json(error.message);
		}
	},

	async deleteWedding({ user, body, params }, res) {
		try {
			//one way
			// const foundUser = await User.findByIdAndUpdate(
			// 	user.data._id,
			// 	{ $pull: { weddings: { _id: params.weddingId } } },
			// 	{ new: true }
			// );

			//another
			const foundUser = await User.findById(user.data._id).select('email firstName weddings');
			foundUser.get("weddings").remove({ _id: params.weddingId });
			await foundUser.save().then((ret) => res.status(200).json(ret));
		} catch (error) {
			res.status(500).json(error.message);
		}
	},

	async createParty({ user, body, params }, res) {
		try {
			const foundUser = await User.findById(user.data._id).select('email firstName weddings');
			const foundWedding = foundUser.weddings.id(params.weddingId);
			foundWedding.parties.push(body);
			await foundUser.save().then((ret) => res.status(200).json(ret));
		} catch (error) {
			res.status(500).json(error.message);
		}
	},

	async updateParty({ user, body, params }, res) {
		try {
			const foundUser = await User.findById(user.data._id).select('email firstName weddings');
			const foundParty = foundUser
				.get("weddings")
				.id(params.weddingId)
				.get("parties")
				.id(params.partyId);
			if (body.name) foundParty.name = body.name;
			if (body.dateInviteSent) foundParty.dateInviteSent = body.dateInviteSent;
			if (body.dateRSVPReceived)
				foundParty.dateRSVPReceived = body.dateRSVPReceived;
			if (body.street1) foundParty.street1 = body.street1;
			if (body.street2) foundParty.street2 = body.street2;
			if (body.city) foundParty.city = body.city;
			if (body.state) foundParty.state = body.state;
			if (body.zipcode) foundParty.zipcode = body.zipcode;
			if (body.country) foundParty.country = body.country;

			await foundUser.save().then((ret) => res.status(200).json(ret));
		} catch (error) {
			res.status(500).json(error.message);
		}
	},

	async deleteParty({ user, body, params }, res) {
		try {
			const foundUser = await User.findById(user.data._id).select('email firstName weddings');
			foundUser
				.get("weddings")
				.id(params.weddingId)
				.get("parties")
				.remove({ _id: params.partyId });
			await foundUser.save().then((ret) => res.status(200).json(ret));
		} catch (error) {
			res.status(500).json(error.message);
		}
	},

	async createGuest({ user, body, params }, res) {
		try {
			const foundUser = await User.findById(user.data._id).select('email firstName weddings');
			const foundParty = foundUser
				.get("weddings")
				.id(params.weddingId)
				.get("parties")
				.id(params.partyId);
			foundParty.guests.push(body);
			await foundUser.save().then((ret) => res.status(200).json(ret));
		} catch (error) {
			res.status(500).json(error.message);
		}
	},

	async updateGuest({ user, body, params }, res) {
		try {
			const foundUser = await User.findById(user.data._id).select('email firstName weddings');
			const foundGuest = foundUser
				.get("weddings")
				.id(params.weddingId)
				.get("parties")
				.id(params.partyId)
				.get("guests")
				.id(params.guestId);
			if (body.guestName) foundGuest.guestName = body.guestName;
			if (body.meal) foundGuest.meal = body.meal;
			if (body.seat) foundGuest.seat = body.seat;
			if (body.addressSameAsParty)
				foundGuest.addressSameAsParty = body.addressSameAsParty;
			if (body.street1) foundGuest.street1 = body.street1;
			if (body.street2) foundGuest.street2 = body.street2;
			if (body.city) foundGuest.city = body.city;
			if (body.state) foundGuest.state = body.state;
			if (body.zipcode) foundGuest.zipcode = body.zipcode;
			if (body.country) foundGuest.country = body.country;
			await foundUser.save().then((ret) => res.status(200).json(ret));
		} catch (error) {
			res.status(500).json(error.message);
		}
	},

	async deleteGuest({ user, body, params }, res) {
		try {
			const foundUser = await User.findById(user.data._id).select('email firstName weddings');
			foundUser
				.get("weddings")
				.id(params.weddingId)
				.get("parties")
				.id(params.partyId)
				.get("guests")
				.remove({ _id: params.guestId });
			await foundUser.save().then((ret) => res.status(200).json(ret));
		} catch (error) {
			res.status(500).json(error.message);
		}
	},

	async createGift({ user, body, params }, res) {
		try {
			const foundUser = await User.findById(user.data._id).select('email firstName weddings');

			//proper way
			foundUser
				.get("weddings")
				.id(params.weddingId)
				.get("parties")
				.id(params.partyId)
				.get("guests")
				.id(params.guestId)
				.get("gifts")
				.push(body);

			// topFor: for (i in foundUser.weddings) {
			// 	for (j in foundUser.weddings[i].parties) {
			// 		for (k in foundUser.weddings[i].parties[j].guests) {
			// 			if (
			// 				foundUser.weddings[i].parties[j].guests[k]._id.equals(
			// 					params.guestId
			// 				)
			// 			) {
			// 				foundUser.weddings[i].parties[j].guests[k].gifts.push(body);
			// 				break topFor;
			// 			}
			// 		}
			// 	}
			// }

			//multiple db calls

			// const foundWedding = foundUser.weddings.id(params.weddingId);
			// const foundParty = foundWedding.parties.id(params.partyId);
			// const foundGuest = foundParty.guests.id(params.guestId);
			// foundGuest.gifts.push(body);

			// several nested for loops should be faster then the below multiple db calls (for loops: 9.87ms -  multiple db calls: 32.5ms - the proper way 7.47 ms )

			await foundUser.save().then((ret) => res.status(200).json(ret));
		} catch (error) {
			res.status(500).json(error.message);
		}
	},

	async updateGift({ user, body, params }, res) {
		try {
			const foundUser = await User.findById(user.data._id).select('email firstName weddings');
			const foundGift = foundUser
				.get("weddings")
				.id(params.weddingId)
				.get("parties")
				.id(params.partyId)
				.get("guests")
				.id(params.guestId)
				.get("gifts")
				.id(params.giftId);
			if (body.item) foundGift.item = body.item;
			if (body.dateThankYouSent)
				foundGift.dateThankYouSent = body.dateThankYouSent;
			await foundUser.save().then((ret) => res.status(200).json(ret));
		} catch (error) {
			res.status(500).json(error.message);
		}
	},

	async deleteGift({ user, body, params }, res) {
		try {
			const foundUser = await User.findById(user.data._id).select('email firstName weddings');
			foundUser
				.get("weddings")
				.id(params.weddingId)
				.get("parties")
				.id(params.partyId)
				.get("guests")
				.id(params.guestId)
				.get("gifts")
				.remove({ _id: params.giftId });
			await foundUser.save().then((ret) => res.status(200).json(ret));
		} catch (error) {
			res.status(500).json(error.message);
		}
	},
};
