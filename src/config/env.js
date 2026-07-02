const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const config = {
  port: 7860 || parseInt(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/redantisocial",
  commentVisibilityMonths: parseInt(process.env.COMMENT_VISIBILITY_MONTHS) || 6
};

REDIS_URL="rediss://default:gQAAAAAAARhEAAIgcDJiNTk3Zjg5YWNjY2M0N2ZlYWM0MDMxZGU3NDRjZWQ0ZA@rich-deer-71748.upstash.io:6379"

module.exports = config;
