from flask import request
from flask_socketio import SocketIO, emit
from app import app
 
io = SocketIO(app)

users = []

@io.on('new-user')
def newUser(user):
    emit('get-curr-users', users)

    player = {
        "socketid": request.sid,
        "name": user, 
        "x":295 , "y":460 
    }
    users.append(player)

    emit('new-user', player, broadcast=True, include_self=False)

@io.on('moved')
def moved(coords):
    # update coordinates of user who moved
    for user in users:
        if user["socketid"] == request.sid:
            user["x"] = coords["x"] 
            user["y"] = coords["y"]
            emit('update-canvas', user, broadcast=True, include_self=False)
    
@io.on('disconnect')
def disconnect():
    print('disocnetted user')
    for user in users:
        if user["socketid"] == request.sid:
            users.remove(user)
            emit('disconnected', user, broadcast=True)
            break

# -----------------chat application
message = []
@io.on('message')
def Message(msg):
        print('Message: ' + msg)
        message.append(msg)
        emit(msg, broadcast=True)

@io.on('connect')
def connect():
        for i in message:
            emit(i)

if __name__ == '__main__':
    # app.run(debug=True)
    # run eventlet server
    io.run(app)
    




