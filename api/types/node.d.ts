interface Pagination {
  next?: { page: number; limit: number };
  prev?: { page: number; limit: number };
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: number;
      DEEZER_ENDPOINT: string;
    }
  }
  namespace Express {
    interface Response {
      advancedResults: {
        count: number;
        pagination: Pagination;
        data: Object[];
        total: number;
      };
    }
  }
}

export {};
