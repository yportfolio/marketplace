const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3003,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb+srv://marketplace:wy6524615@cluster0.89v1c.mongodb.net/mern-marketplace?retryWrites=true&w=majority",
};

export default config;
