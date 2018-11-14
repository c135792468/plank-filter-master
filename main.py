from flask import render_template, request, url_for, jsonify, make_response, redirect
import os
from PIL import Image, ImageFilter
import matplotlib.pyplot as plt
import time
from flask_socketio import SocketIO, emit

from app import app

io = SocketIO(app)


