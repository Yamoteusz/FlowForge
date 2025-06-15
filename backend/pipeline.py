import yaml
import subprocess
import os
import requests  # wymagany pip install requests


def load_pipeline(file_path=None):
    if file_path is None:
        current_dir = os.path.dirname(__file__)
        file_path = os.path.join(current_dir, "pipeline.yaml")
    with open(file_path, "r") as file:
        pipeline = yaml.safe_load(file)
    return pipeline["pipeline"]


def send_discord_message(content):
    webhook_url = "https://discord.com/api/webhooks/1383748010042982633/setFvqwGay3Q8yqJeGs_4ly9IT4S3UCGJKI_enyKyw_3CoEJG3EobQez06Jjxgi8eKx9"
    data = {"content": content}
    try:
        response = requests.post(webhook_url, json=data)
        response.raise_for_status()
    except Exception as e:
        print(f"Failed to send Discord message: {e}")


def run_pipeline(pipeline):
    try:
        for step in pipeline:
            name = step["name"]
            script = step["script"]
            print(f"Running step: {name}")
            try:
                result = subprocess.run(
                    script, shell=True, check=True, text=True, capture_output=True
                )
                print(f"Output for {name}: {result.stdout}")
            except subprocess.CalledProcessError as e:
                print(f"Error in step {name}: {e.stderr}")
                send_discord_message(f"❌ Pipeline failed at step: {name}")
                return {"status": "failed", "step": name}
        send_discord_message("✅ FlowForge pipeline completed successfully.")
        return {"status": "success"}
    except Exception as exc:
        print(f"Pipeline internal error: {exc}")
        return {"status": "failed", "step": f"internal error: {str(exc)}"}
