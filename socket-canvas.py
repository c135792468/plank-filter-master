from flask import request
from flask_socketio import SocketIO, emit
from app import app
 
io = SocketIO(app)

users = []

@io.on('new-user')
def welcome(user):
    emit('get-curr-users', users)

    # name = request.cookies.get('name')
    player = {
        "socketid": request.sid,
        "name": "pppp", 
        "x":295 , "y":460 
    }
    users.append(player)

    emit('new-user', player, broadcast=True, include_self=False)

@io.on('moved')
def moved(coords):
    # update person who moved coordinates
    for user in users:
        if user["socketid"] == request.sid:
            user["x"] = coords["x"] 
            user["y"] = coords["y"]
            emit('update-canvas', user, broadcast=True, include_self=False)
    
# fix this later, doesn't trigger disconnect event on disconnect
@io.on('disconnect')
def disconnect():
    print('disocnetted user')
    for user in users:
        if user["socketid"] == request.sid:
            users.remove(user)
            emit('disconnected', user, broadcast=True)
            break


if __name__ == '__main__':
    # run eventlet server
    io.run(app)
    app.run(Debug=True)
    




