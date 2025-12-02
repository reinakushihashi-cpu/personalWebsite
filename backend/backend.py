# Personal Website (React + FastAPI)
from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import json
from pathlib import Path

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (update with your frontend URL for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = Path("data.json")

class Project(BaseModel):
	id: int
	title: str
	description: str
	link: Optional[str] = None

class Message(BaseModel):
	name: str
	email: EmailStr
	message: str

def read_data():
	return json.loads(DATA_FILE.read_text())

def write_data(data):
	DATA_FILE.write_text(json.dumps(data, indent=2))

@app.get("/api/projects", response_model=List[Project])
def get_projects():
	data = read_data()
	return data.get("projects", [])

@app.post("/api/projects", response_model=Project)
def add_project(p: Project):
	data = read_data()
	projects = data.get("projects", [])
	projects.append(p.dict())
	data["projects"] = projects
	write_data(data)
	return p

@app.post("/api/contact")
async def contact(name: str = Form(...), email: str = Form(...), message: str = Form(...)):
	# validate via pydantic
	try:
		msg = Message(name=name, email=email, message=message)
	except Exception as e:
		raise HTTPException(status_code=400, detail=str(e))
	data = read_data()
	data.setdefault("messages", []).append(msg.dict())
	write_data(data)
	# placeholder: here you could integrate an email service (SendGrid, SES) or Slack webhook
	return {"status": "ok", "received": msg.dict()}

@app.get("/api/health")
def health():
	return {"status":"ok"}