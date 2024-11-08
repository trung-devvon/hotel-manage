// const dotenv = require('dotenv')
const { Client } = require('@elastic/elasticsearch');

const elasticClient = new Client({
    node: "https://localhost:9200",
    auth: {
      username: process.env.ELASTIC_NETWORK_NAME,
      password: process.env.ELASTIC_NETWORK_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

module.exports = elasticClient;