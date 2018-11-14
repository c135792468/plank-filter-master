from flask import request
from flask_socketio import send, SocketIO, emit
from app import app
 
io = SocketIO(app)

users = []

@io.on('new-user')
def welcome():
    name = request.cookies.get('name')

    users.append({"name": name, "coords": {"x":295 , "y":460 }})
    emit('new-user', users, broadcast=True)





