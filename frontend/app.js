const stepsNames = ["Build", "Test", "Lint"]; // Dopasuj do pipeline.yaml!
let stepsStatus = ["pending", "pending", "pending"]; // Default

function updateStepsDisplay() {
    const container = document.getElementById("steps-list");
    container.innerHTML = "";
    stepsNames.forEach((name, i) => {
        let status = stepsStatus[i] || "pending";
        container.innerHTML += `
        <div class="step-row">
            <span class="step-name">
                <span class="status-dot ${status}"></span>
                ${name}
            </span>
            <span class="step-status ${status}">
                ${status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        </div>`;
    });
}

async function runPipeline() {
    const statusElement = document.getElementById("status");
    statusElement.innerHTML = "Running pipeline... Please wait.";
    stepsStatus = stepsNames.map(() => "pending");
    updateStepsDisplay();

    try {
        const response = await fetch("http://localhost:8000/run_pipeline", {
            method: "POST",
            headers: { "Accept": "application/json" }
        });

        let result = null;
        try {
            result = await response.json();
        } catch (jsonError) {
            statusElement.innerHTML = "❌ Błąd: Backend zwrócił niepoprawną odpowiedź!";
            console.error("JSON parse error:", jsonError);
            return;
        }

        // Obsługa poprawnej odpowiedzi
        if (result && result.status === "success") {
            stepsStatus = stepsNames.map(() => "success");
            updateStepsDisplay();
            statusElement.innerHTML = `✅ Pipeline completed successfully!`;
        } else if (result && result.status === "failed") {
            let failIdx = stepsNames.findIndex(s => s === result.step);
            if (failIdx === -1) failIdx = stepsNames.length - 1; // fallback: fail na końcu
            stepsStatus = stepsNames.map((s, i) => i < failIdx ? "success" : (i === failIdx ? "failed" : "pending"));
            updateStepsDisplay();
            statusElement.innerHTML = `❌ Pipeline failed at step: <b>${result.step || "unknown"}</b>`;
        } else {
            statusElement.innerHTML = "❌ Unknown pipeline response!";
            console.error("Unknown response:", result);
        }
    } catch (error) {
        statusElement.innerHTML = "❌ Error occurred while running pipeline.";
        console.error("Network or fetch error:", error);
    }
}

// Pokaż stan kroki na start
updateStepsDisplay();
