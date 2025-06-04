async function runPipeline() {
    const statusElement = document.getElementById("status");
    statusElement.innerHTML = "Running pipeline... Please wait.";
    try {
        const response = await fetch("http://localhost:8000/run_pipeline", {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        });

        const result = await response.json();
        if (result.status === "success") {
            statusElement.innerHTML = `Pipeline completed successfully!`;
        } else {
            statusElement.innerHTML = `Pipeline failed at step: ${result.step}`;
        }
    } catch (error) {
        statusElement.innerHTML = "Error occurred while running pipeline.";
        console.error("Error:", error);
    }
}
