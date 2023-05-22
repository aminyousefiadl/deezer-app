import express from "express";

import {} from "../schema";
import { deezerSearchByTrack, deezerGetArtistData } from "../controller";
const router = express.Router();

router.route("/track").get(deezerSearchByTrack);
router.route("/artist").get(deezerGetArtistData);

export default router;
