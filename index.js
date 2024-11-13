const express = require("express");
const app = express();
const Connection = require("./database/Connection");
const PORT = 8000;
const authRoute = require("./routes/route");
Connection();
// updatd code
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
const cookieParser = require ("cookie-Parser")
app.use(cookieParser());

app.use((req, res, next) => {
  // Set CORS headers
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Replace with your frontend domain
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, etc.)

  // Pass to next layer of middleware
  next();
});
app.use("/api", authRoute);
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});