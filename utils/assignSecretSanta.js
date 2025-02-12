function assignSecretSanta(employees, previousAssignments = {}) {
  let shuffled = [...employees].sort(() => Math.random() - 0.5);

  let assignments = {};
  let available = new Set(employees.map((e) => e.email));

  for (let employee of shuffled) {
    let choices = [...available].filter(
      (email) =>
        email !== employee.email &&
        email !== previousAssignments[employee.email]
    );

    if (choices.length === 0) {
      return null; // Restart if no valid choices
    }

    let assigned = choices[0];
    assignments[employee.email] = assigned;
    available.delete(assigned);
  }

  return assignments;
}

module.exports = assignSecretSanta;
