# Secret Santa Assignment System 🎅🎁

## Overview

Company "Acme" has decided to organize a Secret Santa event among its employees. Each employee is required to choose another employee as their Secret Child, to whom they will anonymously give a gift during the event. The company wants to automate the process of assigning secret children to employees based on the provided employee information.

However, the Secret Santa system has some additional requirements and constraints to ensure fairness and prevent repeated pairings from previous years.

## Features

- ✅ **Automated Assignments:** Randomly assigns a Secret Child to each employee.
- ✅ **Previous Year Validation:** Ensures no employee gets the same Secret Child as last year.
- ✅ **CSV Upload:** Accepts employee data and previous year’s assignments in CSV format.
- ✅ **Download Assignments:** Generates and allows downloading of Secret Santa assignments.
- ✅ **Table Display:** Shows assignments on the webpage for easy viewing.

## How to Use

1. **Upload Employees CSV:** Choose a CSV file containing employee details.
2. **(Optional) Upload Previous Assignments CSV:** Prevents repeated pairings.
3. **Click "Get Secret Santa":** The system will process and generate assignments.
4. **Download or View Assignments:** A table will display results, and a CSV file can be downloaded.

## 🏗️ Solution Breakdown

The application follows a structured approach using **Node.js, Express, and Multer** for handling file uploads. The key components include:

- **Middleware** for handling file uploads.
- **CSV Parsing & Validation** to check for required fields.
- **Secret Santa Assignment Logic** ensuring unique and randomized assignments.
- **CSV Output Generation** for downloading results.

## 🛠️ Installation

### **1. Clone the Repository**

```sh
git clone https://github.com/your-repo/secret-santa-app.git
cd secret-santa-app
```

### **2. Install Dependencies**

```sh
npm install
```

## 🚀 Running the Application

### **Start the Server**

```sh
npm start
```

By default, the server runs on **http://localhost:3001**

### **Using the API**

1. **Endpoint:** `POST /api/secret-santa`
2. **Request:** Upload two CSV files:
   - `employees` (Required): List of employees with `Employee_Name` and `Employee_EmailID`.
   - `prev-year-secret-santa` (Optional): Last year’s assignments with `Employee_EmailID` and `Secret_Child_EmailID`.
3. **Response:** The server generates and returns a downloadable CSV file with the assignments.

## 📂 Folder Structure

```
/secret-santa-app
│── /controllers
│   ├── secretSantaController.js   # Main processing logic
│── /middlewares
│   ├── uploadMiddleware.js        # Handles file uploads
│── /models
│   ├── csvValidator.js            # Validates CSV files
│── /utils
│   ├── parseCSV.js                # Parses CSV files
│   ├── assignSecretSanta.js        # Secret Santa logic
│── server.js                      # Entry point
│── README.md                      # Documentation
```

## 📋 CSV Format Guidelines

### **Employee List (`employees.csv`)**

| Employee_Name | Employee_EmailID |
| ------------- | ---------------- |
| John Doe      | john@example.com |
| Jane Smith    | jane@example.com |

### **Previous Assignments (`prev-year-secret-santa.csv`)**

| Employee_EmailID | Secret_Child_EmailID |
| ---------------- | -------------------- |
| john@example.com | jane@example.com     |

## ⚠️ Error Handling

The app provides error messages for:

- Missing required CSV fields.
- Invalid file format.
- Issues generating valid assignments.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Storage:** CSV File Handling

## Future Improvements

- 🔹 Add user authentication for secured access.
- 🔹 Send email notifications with assignments.
- 🔹 Improve UI/UX for a better experience.
