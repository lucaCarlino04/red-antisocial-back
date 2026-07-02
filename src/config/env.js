const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const config = {
  port: parseInt(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/redantisocial",
  commentVisibilityMonths: parseInt(process.env.COMMENT_VISIBILITY_MONTHS) || 6
};

module.exports = config;
