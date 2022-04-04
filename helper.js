const connection = require("./db/db");
const helper = {
  get: (search_query) => {
    return new Promise((resolve, reject) => {
      connection.query(search_query, async (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = helper;
