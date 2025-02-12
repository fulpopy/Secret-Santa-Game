const express = require("express");
const path = require("path");
const uploadMiddleware = require("./middlewares/uploadMiddleware");
const { processSecretSanta } = require("./controllers/secretSantaController");

const app = express();
const PORT = process.env.PORT || 3001;

app.post("/api/secret-santa", uploadMiddleware, processSecretSanta);

app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => res.sendFile("/public/index.html"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
