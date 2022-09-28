import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import webhook from "./webhook";

import "./discord.ts";

const app = express();
const PORT = process.env.PORT || 6000;

app.use(bodyParser.json({ limit: "8mb" }));
app.use(bodyParser.urlencoded({ limit: "8mb", extended: false }));
app.use(cors({ maxAge: 86400 }));

app.use("/sns", webhook);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
