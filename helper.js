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
  save: (search_query, data) => {
    return new Promise((resolve, reject) => {
      connection.query(search_query, [data], async (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  update: (search_query, to, where) => {
    return new Promise((resolve, reject) => {
      connection.query(search_query, [to, where], async (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = helper;
