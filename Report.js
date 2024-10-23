//Report.js
import React, { useState } from 'react';
import axios from 'axios';

const CommunityReport = () => {
  const [report, setReport] = useState('');

  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/api/report', { report });
    setReport(''); // Reset input field
    alert("Report submitted successfully!");
  };

  return (
    <div>
      <h3>Submit Local Weather Report</h3>
      <textarea value={report} onChange={(e) => setReport(e.target.value)} />
      <button onClick={handleSubmit}>Submit Report</button>
    </div>
  );
};

export default CommunityReport;
