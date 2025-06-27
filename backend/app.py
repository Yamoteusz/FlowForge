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


@app.get("/pipeline_yaml")
def get_pipeline_yaml():
    try:
        with open("backend/pipeline.yaml", "r", encoding="utf-8") as f:
            content = f.read()
        return {"content": content}
    except Exception as e:
        return {"content": f"Nie można odczytać pipeline.yaml: {e}"}


import json
import os

HISTORY_FILE = "pipeline_history.json"


def get_history():
    if not os.path.exists(HISTORY_FILE):
        return []
    with open(HISTORY_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/history")
def history():
    return get_history()


import shutil
import random


@app.get("/health")
def health():
    try:
        total, used, free = shutil.disk_usage("/")
        storage = int(used / total * 100)
    except:
        storage = random.randint(50, 90)
    # Prosty mock, bo Windows nie zawsze lubi psutil
    cpu = random.randint(20, 80)
    memory = random.randint(30, 90)
    return {"cpu": cpu, "memory": memory, "storage": storage}
