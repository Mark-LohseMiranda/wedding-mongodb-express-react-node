const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");

const {
	createWedding,
	updateWedding,
	deleteWedding,
	createParty,
	updateParty,
	deleteParty,
	createGuest,
	updateGuest,
	deleteGuest,
	createGift,
	updateGift,
	deleteGift,
} = require("../../controllers/weddingController");

router.route("/createwedding").post(authMiddleware, createWedding);

router.route("/updatewedding/:weddingId").put(authMiddleware, updateWedding);

router.route("/deletewedding/:weddingId").delete(authMiddleware, deleteWedding);

router.route("/createparty/:weddingId").post(authMiddleware, createParty);

router
	.route("/updateparty/:weddingId/:partyId")
	.put(authMiddleware, updateParty);

router
	.route("/deleteparty/:weddingId/:partyId")
	.delete(authMiddleware, deleteParty);

router
	.route("/createguest/:weddingId/:partyId")
	.post(authMiddleware, createGuest);

router
	.route("/updateguest/:weddingId/:partyId/:guestId")
	.put(authMiddleware, updateGuest);

router
	.route("/deleteguest/:weddingId/:partyId/:guestId")
	.delete(authMiddleware, deleteGuest);

router
	.route("/creategift/:weddingId/:partyId/:guestId")
	.post(authMiddleware, createGift);

router
	.route("/updategift/:weddingId/:partyId/:guestId/:giftId")
	.put(authMiddleware, updateGift);

router
	.route("/deletegift/:weddingId/:partyId/:guestId/:giftId")
	.delete(authMiddleware, deleteGift);

module.exports = router;
