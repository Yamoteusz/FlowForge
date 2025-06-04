import yaml
import subprocess
import os


def load_pipeline(file_path=None):
    if file_path is None:
        current_dir = os.path.dirname(__file__)
        file_path = os.path.join(current_dir, "pipeline.yaml")
    with open(file_path, "r") as file:
        pipeline = yaml.safe_load(file)
    return pipeline["pipeline"]


# Funkcja do uruchamiania kroków pipeline
def run_pipeline(pipeline):
    for step in pipeline:
        name = step["name"]
        script = step["script"]
        print(f"Running step: {name}")
        try:
            # Uruchamiamy polecenie systemowe dla danego kroku
            result = subprocess.run(
                script, shell=True, check=True, text=True, capture_output=True
            )
            print(f"Output for {name}: {result.stdout}")
        except subprocess.CalledProcessError as e:
            print(f"Error in step {name}: {e.stderr}")
            return {"status": "failed", "step": name}
    return {"status": "success"}
