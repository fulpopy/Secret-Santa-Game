const path = require("path");
const fs = require("fs");
const parseCSV = require("../utils/parseCSV");
const validateCSVData = require("../models/csvValidator");
const assignSecretSanta = require("../utils/assignSecretSanta");

const processSecretSanta = async (req, res) => {
  try {
    const employeesFile = req.files["employees"]?.[0]?.path;
    const prevYearFile = req.files["prev-year-secret-santa"]?.[0]?.path || null;

    if (!employeesFile) {
      return res.status(400).json({ error: "Employees CSV file is required." });
    }

    // Parse CSV Files
    const employeesData = await parseCSV(employeesFile);
    const previousData = prevYearFile ? await parseCSV(prevYearFile) : [];

    // Validate Employee Data
    const employeesValidation = validateCSVData(employeesData, [
      "Employee_Name",
      "Employee_EmailID",
    ]);
    if (!employeesValidation.valid) {
      return res.status(400).json({ error: employeesValidation.error });
    }

    let employees = employeesData.map((row) => ({
      name: row["Employee_Name"],
      email: row["Employee_EmailID"],
    }));

    // Validate Previous Assignments Data
    let previousAssignments = {};
    if (previousData.length > 0) {
      const previousValidation = validateCSVData(previousData, [
        "Employee_EmailID",
        "Secret_Child_EmailID",
      ]);
      if (!previousValidation.valid) {
        return res.status(400).json({ error: previousValidation.error });
      }

      previousData.forEach((row) => {
        previousAssignments[row["Employee_EmailID"]] =
          row["Secret_Child_EmailID"];
      });
    }

    // Generate Assignments
    let assignments = assignSecretSanta(employees, previousAssignments);
    if (!assignments) {
      return res
        .status(400)
        .json({
          error:
            "Failed to generate valid Secret Santa assignments. Try again.",
        });
    }

    // Create CSV Output
    const outputPath = path.join(__dirname, "../output.csv");
    const outputCSV = [
      "Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID",
    ];

    employees.forEach((emp) => {
      let secretChildEmail = assignments[emp.email];
      let secretChild = employees.find((e) => e.email === secretChildEmail);
      if (secretChild) {
        outputCSV.push(
          `${emp.name},${emp.email},${secretChild.name},${secretChild.email}`
        );
      }
    });

    fs.writeFileSync(outputPath, outputCSV.join("\n"));

    // Send File to Client
    res.download(outputPath, "secret_santa_assignments.csv", () => {
      fs.unlinkSync(outputPath);
      fs.unlinkSync(employeesFile);
      if (prevYearFile) fs.unlinkSync(prevYearFile);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { processSecretSanta };
