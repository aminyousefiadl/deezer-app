import express, { Request, Response } from "express";
import path from "path";
import _ from "lodash";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware";
import fileUpload from "express-fileupload";
import compression from "compression";
import * as dotenv from "dotenv";

// security packages
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import { rateLimit } from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";

//Starting express
const app = express();

// load env file
dotenv.config();

// Import Routes

import deezerRouts from "./routes/deezer.routes";

app.use(cors());

//Adding fileUpload functionality

app.use(fileUpload({ createParentPath: true }));

//Adding the uppload folder
app.use(express.static(path.join(__dirname, "..", "public")));

//Adding the bodyParser to be able to read the body of the request

app.use(express.json());

//Adding the cookieParser middleware so in our req we can access to req.cookie
app.use(cookieParser());

//Removing the caharcters that can hack into database
app.use(mongoSanitize());

//Adding security to res header
app.use(helmet());

//Preventing XSS attackes to database
app.use(xss());

//Setting up the rateLimitter

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10000, // limit each IP to 10000 requests per windowMs
});

app.use(limiter);

//setting up the hpp security
app.use(hpp());

app.use(compression());

//Mounting Routes
app.use("/", deezerRouts);

app.use(errorHandler);
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.warn("server running on port " + PORT);
});

process.on("unhandledRejection", async (err: Error, promise) => {
  console.error(err);
  console.error(`Error is ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
