import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middleware";
import { searchDeezerByTrackService, getArtistDataService } from "../service";
import {
  SearchArtistPayload,
  SearchTrackPayload,
  requestApiType,
} from "../types";

export const deezerSearchByTrack = asyncHandler(
  async (
    req: requestApiType<SearchTrackPayload>,
    res: Response,
    next: NextFunction
  ) => {
    const { trackName } = req.query;
    const result = await searchDeezerByTrackService({ trackName }, next);
    if (result) {
      return res.status(200).json({
        data: result.data,
      });
    }
  }
);

export const deezerGetArtistData = asyncHandler(
  async (
    req: requestApiType<SearchArtistPayload>,
    res: Response,
    next: NextFunction
  ) => {
    const { artistId } = req.query;
    const result = await getArtistDataService({ artistId }, next);
    console.log(result);
    if (result) {
      return res.status(200).json({
        data: result,
      });
    }
  }
);
