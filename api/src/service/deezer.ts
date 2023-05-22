import axios from "axios";
import { asyncServiceHandler } from "../middleware";
import { DEEZER_ENDPOINT } from "../utils/constants";
import { trackQueryProvider } from "../utils/deezer";

export const searchDeezerByTrackService = asyncServiceHandler(
  async ({ trackName }: { trackName: string }): Promise<void> => {
    return await axios.get(`${DEEZER_ENDPOINT}/search`, {
      headers: {
        "Content-Type": "application/json;",
      },
      params: {
        q: trackQueryProvider(trackName),
      },
    });
  }
);

export const getArtistDataService = asyncServiceHandler(
  async ({ artistId }: { artistId: string }): Promise<any> => {
    const { data: artist } = await axios.get(
      `${DEEZER_ENDPOINT}/artist/${artistId}`,
      {
        headers: {
          "Content-Type": "application/json;",
        },
      }
    );
    const { data: topTracks } = await axios.get(
      `${DEEZER_ENDPOINT}/artist/${artistId}/top?limit=5`,
      {
        headers: {
          "Content-Type": "application/json;",
        },
      }
    );
    const { data: albums } = await axios.get(
      `${DEEZER_ENDPOINT}/artist/${artistId}/albums`,
      {
        headers: {
          "Content-Type": "application/json;",
        },
      }
    );
    return {
      artist,
      topTracks,
      albums,
    };
  }
);
