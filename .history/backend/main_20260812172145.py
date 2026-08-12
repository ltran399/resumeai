from fastapi import FastAPI

app = FastAPI(title= "ResumeAI API")

@app.get("/")
def root():
    return {"status": "ok"}