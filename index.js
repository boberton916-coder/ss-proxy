import express from "express";
import { createBareServer } from "@tomphttp/bare-server-node";

const app = express();
const bare = createBareServer("/bare/");

// Serve frontend from /public
app.use(express.static("public"));

// Route bare proxy requests
app.all("/bare/*", (req, res) => {
  bare.routeRequest(req, res);
});

// Fallback: serve the UI
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`UV-like proxy running on port ${port}`);
});
