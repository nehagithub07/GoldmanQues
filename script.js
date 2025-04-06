window.onload = async () => {
  const tbody = document.querySelector("#questionsTable tbody");

  try {
    const response = await fetch("questions.json");
    let questions = await response.json();

    // Custom sort: Easy -> Medium -> Hard
    const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
    questions.sort((a, b) => difficultyOrder[a.Difficulty] - difficultyOrder[b.Difficulty]);

    questions.forEach((q, index) => {
      const row = document.createElement("tr");
      const questionKey = `question-${q.ID}`;
      const isCompleted = localStorage.getItem(questionKey) === "true";

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${q.ID}</td>
        <td>${q.Title}</td>
        <td>${q.Acceptance}</td>
        <td>${q.Difficulty}</td>
        <td>${parseFloat(q.Frequency).toFixed(2)}</td>
        <td><a href="${q["Leetcode Question Link"]}" target="_blank">View</a></td>
        <td class="status-cell" data-id="${q.ID}">
          <span class="status-toggle" style="cursor:pointer;">${isCompleted ? "✅" : "❌"}</span>
        </td>
      `;

      tbody.appendChild(row);
    });

    // Add toggle click handler
    document.querySelectorAll(".status-toggle").forEach(el => {
      el.addEventListener("click", () => {
        const cell = el.closest(".status-cell");
        const id = cell.getAttribute("data-id");
        const key = `question-${id}`;
        const current = localStorage.getItem(key) === "true";

        localStorage.setItem(key, !current);
        el.textContent = !current ? "✅" : "❌";
      });
    });
  } catch (error) {
    console.error("Error loading questions:", error);
  }
};
