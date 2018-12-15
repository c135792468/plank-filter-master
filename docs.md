# Documentation

## Animate Class 
A class to create the engine for the game- handles animations. 

`createEventHandlers()` 
> Delegates event listeners to the up, down, left, and right keys \
> *Must be called for players to move*

`drawFP0(int x, int y, int w, int h)`
> Draws a platform on the canvas at (`x`, `y`) with width `w` and height `h`

`drawName(string name, int x, int y)`
> Draws a name label for the player on the canvas. \
> Draws at the player's coordinates- (`x`, `y`) with name `name`

`drawSprite(int x, int y)`
> Draws the player's sprite on the canvas at the coordinates (`x`, `y`)

`moveX()`
> Moves a sprite on the x-axis depending on how long the left or right keys are held

`moveY()`
> Moves a sprite on the y-axis up and then back down after one up key 


---------------------------------------------------------------------

## Socket Event Handlers
Event handlers through SocketIO

### Server Side
`newUser(user)`
> A new player has connected. Tell all other players that someone has connected and to update their canvas. Initialize a player object for the 
> new player and adds to the current pool of users.

`moved`
> If any client has moved, update their position server side

`disconnect`
> Updates the canvas in the case of a client leaving the room. Removes the user from pool of users in the backend

`message`
> Store the received message into a list and the the message to all the player thats connected to chat

`connect`
> When a new player has connected to chat send the stored messages to the new player

### Client Side

`new-user(name)`
> Handles a new user that just connected to the room. New user's sprite is drawn on client's screen along with the name provided, `name`.

`get-curr-users(users)`
> Retrieves all other clients' positions and updates canvas. `users` contains all players' positions as well as names

`update-canvas`
> If any other client has moved, update their position client side \
> *All of the client's own movements are not relient on the server. If the client moves, their movements are updated locally and sent to the server so as to not create lag*

`disconnected(user)`
> Notify the client that `user` has disconnected. Removes user from current pool of users and updates the canvas accordingly.

`message()`
>When receive message from the server append message

------------------------------------------------------------------------

`draw()`
> Should be called on a set interval. Re-renders the client's canvas with sprites, their names, as well as anytihng else drawn.

`onClick()`
>Send input message to server 

------------------------------------------------------------------------

## Database and Users
Data is stored in MongoDB hosted by mLab

### Server Side
`PyMongo`
> A Python distribution containing tools for working with MongoDB

`bcrypt`
> A password hashing functionality, the password stored on the database will be hashed. Passwords are secure even if the database is compromised

`login()`
> Submits a POST request with entered user information that is compared with what is stored in the database. Username functions as a unique key. If the username and password entered match. A user is provided with a session granting access to the website.

`register()`
> Submits a POST request with entered user information that is compared with what is stored in the database. Username functions as a unique key. If the username does not trigger a conflict. A user account is created and the user is provided with a session granting access to the website.
