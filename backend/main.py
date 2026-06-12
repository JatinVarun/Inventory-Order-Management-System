from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
import models
from database import engine

from routers import products
from routers import customers 
from routers import orders

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="OrderSync API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(customers.router)
app.include_router(orders.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Inventory API"}
