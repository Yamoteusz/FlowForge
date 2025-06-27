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

async function previewYaml() {
    document.getElementById("yaml-modal").style.display = "block";
    const res = await fetch("http://localhost:8000/pipeline_yaml");
    const data = await res.json();
    document.getElementById("yaml-content").textContent = data.content || "Brak pliku";
}
function closeYaml() {
    document.getElementById("yaml-modal").style.display = "none";
}


async function updateHistory() {
    const res = await fetch("http://localhost:8000/history");
    const builds = await res.json();
    const container = document.getElementById("recent-builds");
    container.innerHTML = "";
    (builds || []).forEach(b => {
        container.innerHTML += `<li>
            <b>${b.status === "success" ? "✅" : "❌"} ${b.date}</b>
            ${b.status === "success" ? "" : ("<span>step: " + (b.step || "") + "</span>")}
            <br><pre class="mini-log">${b.log ? b.log.substring(0,80) + "..." : ""}</pre>
        </li>`;
    });
}
updateHistory();


async function updateHealth() {
    const res = await fetch("http://localhost:8000/health");
    const data = await res.json();
    document.getElementById("health").innerHTML = `
        <div>CPU Usage: <b>${data.cpu}%</b></div>
        <div>Memory: <b>${data.memory}%</b></div>
        <div>Storage: <b>${data.storage}%</b></div>
    `;
}
updateHealth();
setInterval(updateHealth, 5000); // Odświeżaj co 5 sekund


// Pokaż stan kroki na start
updateStepsDisplay();
