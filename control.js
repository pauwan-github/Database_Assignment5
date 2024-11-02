exports.addExpense = (req, res) => {
  const { userId, amount, date, category } = req.body;

  const query = "INSERT INTO Expenses (user_id, amount, date, category) VALUES (?, ?, ?, ?)";
  db.query(query, [userId, amount, date, category], (err) => {
    if (err) throw err;
    res.send("Expense added successfully!");
  });
};

exports.viewExpenses = (req, res) => {
  const userId = req.user.id;

  const query = "SELECT * FROM Expenses WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};
