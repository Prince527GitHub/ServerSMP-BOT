from flask import Flask, render_template
from threading import Thread
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask('')

@app.route('/')

def home():

    return render_template('index.html')

def run():

  app.run(host='0.0.0.0',port=os.getenv("PORT"))

def keep_alive():  

    t = Thread(target=run)

    t.start()