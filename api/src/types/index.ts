import { Request } from "express";

export type SearchTrackPayload = {
  trackName: string;
};

export type SearchArtistPayload = {
  artistId: string;
};

export type requestApiType<T = {}, U = {}> = Request<any, any, U, T>;
