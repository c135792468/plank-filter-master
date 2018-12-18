from flask import Flask
app = Flask(__name__)
app.secret_key = 'mysecret'

from app import routes