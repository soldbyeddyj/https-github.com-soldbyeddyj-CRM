from fastapi import FastAPI
from pydantic import BaseModel
from datetime import date
from typing import Optional
import openai
import os

app = FastAPI()

openai.api_key = os.getenv("OPENAI_API_KEY")

class User(BaseModel):
    name: str
    email: Optional[str]
    phone: Optional[str]
    birthdate: date
    culture: str
    language: str = "en"
    time_zone: str = "UTC"

class GreetingRequest(BaseModel):
    name: str
    holiday: str
    culture: str
    tone: str = "joyful"
    language: str = "en"

@app.post("/generate-greeting/")
def generate_greeting(data: GreetingRequest):
    prompt = (
        f"Generate a warm and culturally appropriate greeting message for {data.holiday} "
        f"for {data.name}, who is from {data.culture} and prefers a {data.tone} tone. "
        f"Use the language: {data.language}."
    )
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    message = response.choices[0].message.content.strip()
    return {"message": message}