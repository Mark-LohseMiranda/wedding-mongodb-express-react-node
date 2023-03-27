const router = require("express").Router();
const userRoutes = require("./userRoutes");
const weddingRoutes = require("./weddingRoutes");

router.use("/users", userRoutes);
router.use("/weddings", weddingRoutes);

module.exports = router;
