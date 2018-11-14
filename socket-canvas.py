from flask import request
from flask_socketio import SocketIO, emit
from app import app
 
io = SocketIO(app)

users = []

@io.on('new-user')
def welcome(user):
    # name = request.cookies.get('name')
    player = {
        "name": "pppp", 
        "x":295 , "y":460 
    }
    users.append(player)
    emit('new-user', player, broadcast=True, include_self=False)
    emit('get-curr-users', users)

@io.on('moved')
def moved(coords):
    # update person who moved coordinates
    for user in users:
        if user["name"] == coords["name"]:
            user["coords"] = {"x": coords["x"], "y": coords["y"]}
    

if __name__ == '__main__':
	app.run(debug=True)




