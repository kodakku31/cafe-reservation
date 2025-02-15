from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from firebase_admin import initialize_app, firestore
import firebase_admin
import os
from dotenv import load_dotenv

# 環境変数の読み込み
load_dotenv()

# Firebase初期化
if not firebase_admin._apps:
    cred = firebase_admin.credentials.Certificate({
        "type": os.getenv("FIREBASE_TYPE"),
        "project_id": os.getenv("FIREBASE_PROJECT_ID"),
        "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
        "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace('\\\\n', '\n') if os.getenv("FIREBASE_PRIVATE_KEY") else None,
        "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
        "client_id": os.getenv("FIREBASE_CLIENT_ID"),
        "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
        "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
        "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_URL")
    })
    initialize_app(cred)

db = firestore.client()

app = FastAPI()

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", 
                  "http://localhost:3003", "http://localhost:3004", "http://localhost:3005"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Reservation(BaseModel):
    name: str
    date: str
    time: str
    people: int
    phone: str
    note: str = None

@app.post('/reservations/')
async def create_reservation(reservation: Reservation):
    doc_ref = db.collection('reservations').document()
    doc_ref.set({
        'name': reservation.name,
        'date': reservation.date,
        'time': reservation.time,
        'people': reservation.people,
        'phone': reservation.phone,
        'note': reservation.note,
        'created_at': datetime.now().isoformat()
    })
    return {'id': doc_ref.id}

@app.get('/reservations/')
async def get_reservations():
    docs = db.collection('reservations').stream()
    return [doc.to_dict() for doc in docs]

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
