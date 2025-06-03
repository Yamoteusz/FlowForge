from fastapi import FastAPI

# Tworzymy instancję aplikacji FastAPI
app = FastAPI()

# Endpoint ping
@app.get("/ping")
def read_ping():
    return {"message": "Pong!"}
