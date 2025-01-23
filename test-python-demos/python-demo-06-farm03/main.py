# -*- coding: UTF-8 -*-

from fastapi import FastAPI, Body


app = FastAPI()

@app.get("/")
def read_root():
  return {
    "hello": "world"
  }

@app.post('/callback')
def callback(item = Body(...)):
  print(item)
  return item 