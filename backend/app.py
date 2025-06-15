from fastapi import FastAPI
from backend.pipeline import load_pipeline, run_pipeline
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ping")
def read_ping():
    return {"message": "Pong!"}


@app.post("/run_pipeline")
def run_pipeline_endpoint():
    try:
        pipeline = load_pipeline()  # Ładujemy pipeline z pliku YAML
        result = run_pipeline(pipeline)  # Uruchamiamy pipeline
        # Upewniamy się, że zawsze zwracamy słownik!
        if not isinstance(result, dict):
            return {"status": "failed", "step": "unknown"}
        return result
    except Exception as e:
        print(f"Pipeline endpoint error: {e}")
        return {"status": "failed", "step": f"internal error: {str(e)}"}
