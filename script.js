window.onload = async () => {
    const tbody = document.querySelector("#questionsTable tbody");
  
    try {
      const response = await fetch("questions.json");
      const questions = await response.json();
  
      questions.forEach((q, index) => {
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${q.ID}</td>
          <td>${q.Title}</td>
          <td>${q.Acceptance}</td>
          <td>${q.Difficulty}</td>
          <td>${parseFloat(q.Frequency).toFixed(2)}</td>
          <td><a href="${q["Leetcode Question Link"]}" target="_blank">View</a></td>
        `;
  
        tbody.appendChild(row);
      });
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  };
  