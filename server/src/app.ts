import { ClientErrorCode } from "../../protocol/src/ws";
import express from "express";

const app = express();

const port = process.env.PORT === null ? 8080 : process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));

console.log(ClientErrorCode);