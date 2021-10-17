const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb+srv://marketplace:wy6524615@cluster0.89v1c.mongodb.net/mern-marketplace?retryWrites=true&w=majority",
  stripe_connect_test_client_id: "YOUR_stripe_connect_test_client",
  stripe_test_secret_key: "YOUR_stripe_test_secret_key",
  stripe_test_api_key: "YOUR_stripe_test_api_key",
};

export default config;