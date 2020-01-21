require("dotenv").config();

module.exports = {
  client_email: process.env.GOOGLE_EMAIL,
  private_key: process.env.GOOGLE_TOKEN
};