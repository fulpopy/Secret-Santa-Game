const fs = require("fs");
const csvParser = require("csv-parser");

function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    let data = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => data.push(row))
      .on("end", () => resolve(data))
      .on("error", (error) => reject(error));
  });
}

module.exports = parseCSV;
