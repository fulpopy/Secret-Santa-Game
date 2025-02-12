# Secret Santa Assignment App

## 📌 Overview

The **Secret Santa Assignment App** automates the assignment of Secret Santa gift-givers and receivers while ensuring that:

- Employees do not get themselves as their Secret Santa.
- Employees do not receive the same Secret Santa as the previous year (if previous assignments are provided).
- The assignments are randomized and stored in a CSV file for easy access.

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
