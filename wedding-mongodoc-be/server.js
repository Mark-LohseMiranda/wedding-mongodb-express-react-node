const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//LOCAL
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//DEPLOYED
// app.use(cors({
//     origin:["https://table-top-fe.herokuapp.com"]
// }))

app.use("/", routes);

db.once("open", () => {
	app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
