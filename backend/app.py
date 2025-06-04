from fastapi import FastAPI
from backend.pipeline import load_pipeline, run_pipeline

# Tworzymy instancję aplikacji FastAPI
app = FastAPI()


# Endpoint ping
@app.get("/ping")
def read_ping():
    return {"message": "Pong!"}


app = FastAPI()


# Endpoint do uruchomienia pipeline'u
@app.post("/run_pipeline")
def run_pipeline_endpoint():
    pipeline = load_pipeline()  # Ładujemy pipeline z pliku YAML
    result = run_pipeline(pipeline)  # Uruchamiamy pipeline
    return result
