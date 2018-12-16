from flask import Flask
app = Flask(__name__)
app.secret_key = 'mysecret'
selected_album = 'default'

from app import routes