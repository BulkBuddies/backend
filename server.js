import express from "express";
import "dotenv/config";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json({ Message: "Welcome" });
});

app.listen(PORT, () => {
  console.log(`LISTENING ON ${PORT}`);
});
