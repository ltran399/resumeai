from fastapi import FastAPI, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import get_db

app = FastAPI(title="ResumeAI API")

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/health")
def health(db: Session = Depends(get_db)):
    count = db.execute(text("SELECT COUNT(*) FROM users")).scalar()
    return {"database": "connected", "users": count}