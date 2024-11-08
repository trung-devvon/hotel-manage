const elasticClient = require("./elastic");

const indexHotelInElasticsearch = async (hotel, uid) => {
  try {
    const response = await elasticClient.index({
      index: "hotels",
      id: hotel.id,
      body: hotel
    });
    console.log("Hotel indexed in Elasticsearch:", response);
  } catch (error) {
    console.error("Error indexing hotel in Elasticsearch:", error);
    throw error;
  }
};
const searchHotelsInElasticsearch = async (keyword) => {
  try {
    if (keyword.trim().length === 0) {
      console.log('ki tu khong du')
    }

    const result = await elasticClient.search({
      index: 'hotels',
      body: {
        query: {
          bool: {
            should: [
              {
                match_phrase: {
                  name: {
                    query: keyword,
                    slop: 2
                  }
                }
              },
              {
                match_phrase: {
                  name_normalized: {
                    query: keyword,
                    slop: 2
                  }
                }
              },
              {
                match_phrase: {
                  address: {
                    query: keyword,
                    slop: 2
                  }
                }
              },
              {
                match_phrase: {
                  address_normalized: {
                    query: keyword,
                    slop: 2
                  }
                }
              }
            ]
          }
        },
        _source: {
          excludes: ['facilities', 'description']
        },
        size: 10
      }
    });

    return result.hits.hits;
  } catch (error) {
    console.error(
      "Error searching hotels"
    );
    throw error;
  }
};

module.exports = { indexHotelInElasticsearch, searchHotelsInElasticsearch };
