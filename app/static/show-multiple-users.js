//change to heroku pge later on
let socket = io.connect('http://127.0.0.1:5000')

//get user's name from cookie
let cookie = document.cookie
let cookies = cookie.split(';')
console.log(cookies)