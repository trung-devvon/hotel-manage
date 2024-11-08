require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const initWebRoutes = require("./routes");
const elasticClient = require("./service/elastic");
const debug = require("./utils/logging.util");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "PUT", "DELETE", "GET"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initWebRoutes(app);
dbConnect();

const PORT = process.env.PORT || 8888;

async function checkElasticsearchConnection() {
  try {
    await elasticClient.ping()
    console.log("Connected to Elasticsearch successfully.");
  } catch (error) {
    console.error("Error connecting to Elasticsearch:", error);
  }
}

// async function searchHotels(keyword) {
//     try {
//         const result = await elasticClient.search({
//             index: 'hotels', 
//             body: {
//                 query: {
//                   multi_match: {
//                         query: keyword,
//                         fields: ['name', 'address']
//                     }
//                 }
//             }
//         });

//         debug(result.hits.hits);
//         return result.hits.hits;
//     } catch (error) {
//         console.error('Error searching hotels:', error);
//         throw error;
//     }
// }

// async function exampleSearch() {
//     try {
//         const results = await searchHotels(`Hồ chí minh`)
//     } catch (error) {
//         console.error('Error in example search:', error);
//     }
// }

// exampleSearch();

app.listen(PORT, async () => {
  console.log(`SERVER ON THE PORT: ${PORT}`);
  await checkElasticsearchConnection();
});
