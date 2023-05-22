const { createClient } = require("redis");

declare module globalThis {
  var log: Logger<{
    prettyPrint: true;
    base: {
      pid: boolean;
    };
    timestamp: () => string;
  }>;
  var redis: ReturnType<typeof createClient>;
}

declare module "xss-clean" {
  const value: Function;

  export default value;
}

declare module "rotating-file-stream" {
  function createStream(
    filename: string | Generator,
    options?: Options
  ): RotatingFileStream;
}
