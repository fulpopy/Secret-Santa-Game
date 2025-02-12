function validateCSVData(data, requiredFields) {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      valid: false,
      error: "CSV file is empty or not formatted correctly.",
    };
  }

  for (let row of data) {
    for (let field of requiredFields) {
      if (!row[field]) {
        return { valid: false, error: `Missing required field: ${field}` };
      }
    }
  }

  return { valid: true };
}

module.exports = validateCSVData;
