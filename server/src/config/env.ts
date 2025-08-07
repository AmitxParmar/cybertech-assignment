import "dotenv/config";

export const env = {
  port: parseInt(process.env.PORT || "4000", 10),
  mongoUri: process.env.MONGO_URI ?? "",
  jwtSecret:
    process.env.JWT_SECRET ?? "uzrdcWMaGTQPvnknL8fyyGyvI1bw9yTHE1nRinqkY90",
  jwtExpiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as string | number,
  nodeEnv: process.env.NODE_ENV ?? "development",
  cookieSecure: process.env.COOKIE_SECURE === "true",
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:3000",
};
