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
if result["status"] == "success":
    send_discord_message("✅ FlowForge pipeline completed successfully.")
else:
    send_discord_message(f"❌ Pipeline failed at step: {result['step']}")



from discordwebhook import Discord

def send_discord_message(content):
    webhook_url = "https://discord.com/api/webhooks/1380255493997723779/fdoClrKr1A0V7edKf08bhyfAo0xLt0Bqs9Z_kCh8F2jKGB1Zyk7b9FzDx4I1Vs4N5RDe"  # Twój URL
    discord = Discord(url=webhook_url)
    discord.post(content=content)