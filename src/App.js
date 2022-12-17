import { useState } from 'react';
import './App.css'

 const App = () => {
  // Initialize state with three rows
  const [rows, setRows] = useState([
    { account: '', debitAmount: '', creditAmount: '' },
  ]);

  // Initialize total debits and credits to 0
  const [totalDebits, setTotalDebits] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);

  // Add a new row to the form
  const addRow = () => {
    setRows([...rows, { account: '', debitAmount: '', creditAmount: '' }]);
  };

  // Delete a row from the form
  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  // Handle changes to the form values
  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  // Update the total debits and credits when a form value changes
  const updateTotals = () => {
    let debits = 0;
    let credits = 0;
    rows.forEach((row) => {
      if (row.debitAmount) debits += parseFloat(row.debitAmount);
      if (row.creditAmount) credits += parseFloat(row.creditAmount);
    });
    setTotalDebits(debits);
    setTotalCredits(credits);
  };

  // Format a number as Indian rupees
  const formatIndianRupees = (number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(number);
  };

  // Render the form
  return (
    <form className='form'>
      {rows.map((row, index) => (
        <div key={index}>
          <select name="account" value={row.account} onChange={(event) => handleChange(event, index)}>
            <option value="">Select an account</option>
            <option value="Account 1">Account 1</option>
            <option value="Account 2">Account 2</option>
            <option value="Account 3">Account 3</option>
          </select>
          <input
            type="text"
            name="debitAmount"
            value={row.debitAmount}
            onChange={(event) => handleChange(event, index)}
            onBlur={updateTotals}
          />
          <input
            type="text"
            name="creditAmount"
            value={row.creditAmount}
            onChange={(event) => handleChange(event, index)}
            onBlur={updateTotals}
          />
          <button type="button" onClick={() => deleteRow(index)}>
            Delete
          </button>
        </div>
      ))}
      <button type="button" onClick={addRow}>
        Add Row
      </button>
      <div>
        Total Debits: {formatIndianRupees(totalDebits)}
        Total Credits: {formatIndianRupees(totalCredits)}
      </div>
    </form>
  )
}  

export default App;