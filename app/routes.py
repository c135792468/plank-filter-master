from flask import render_template, request, url_for, jsonify, make_response, redirect, session
import os
from PIL import Image, ImageFilter
import matplotlib.pyplot as plt
import time
from app import app
from flask_pymongo import PyMongo
import bcrypt

app.config['MONGO_DBNAME'] = 'plank_mongo'
app.config['MONGO_URI'] = 'mongodb://admin:Teampassword8@ds129484.mlab.com:29484/plank_mongo'

mongo = PyMongo(app)

@app.route('/login', methods=['GET', 'POST'])
def login():
	if request.method =='POST':
		user = mongo.db.user_accounts
		login_user = user.find_one({'username' : request.form['username']})

		if login_user:
			if bcrypt.hashpw(request.form['password'].encode('utf-8'), login_user['password']) == login_user['password']:
				session['username'] = request.form['username']
				name = request.form['username']
				response = make_response(redirect('/lobby'))
				response.set_cookie('name', name)
				return response
			return 'Invalid username/password combination'	
		return 'Invalid username/password combination'
	
	elif(request.method == 'GET'):
		return render_template('login.html')

@app.route('/register', methods=['POST', 'GET'])
def register():
	if request.method =='POST':
		user = mongo.db.user_accounts
		existing_user = user.find_one({'username' : request.form['username']})

		if existing_user is None:
			hashpass = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt())
			user.insert({'username' : request.form['username'], 'password' : hashpass})
			session['username'] = request.form['username']
			name = request.form['username']
			response = make_response(redirect('/lobby'))
			response.set_cookie('name', name)
			return response

		return 'That username already exists'

	return render_template('register.html')

@app.route('/endsession')
def testimageinsert():
	session.clear()
	return render_template('home.html')

@app.route('/filter', methods=['GET', 'POST'])
def index():
	if 'username' in session:
		if(request.method == 'GET'):
			return render_template('index.html')

		elif(request.method == 'POST'):
			ffile =	request.files["file"]
			print("file: ", ffile.filename)
			# filepath = os.path.join('./static/imgs/', ffile.filename)

			filter = request.form.get("filter")
			image = Image.open(ffile)
			print(filter)
			#apply filter to file
			if(filter == "f1"):
				print("HERE!!!")
				image = image.convert('L')
			elif(filter == "f2"):
				print("filter 2")
				image = image.filter(ImageFilter.GaussianBlur(20))
			elif(filter == "f3"):
				print("filter3")
				image = image.filter(ImageFilter.CONTOUR)

			ts = time.time()

			filepath = os.path.join('./app/static/imgs', str(ts) + ffile.filename)
			print(filepath)
			image.save(filepath)
			openfilepath = os.path.join('./static/imgs', str(ts) + ffile.filename)
			return jsonify({"file": openfilepath})
		return ""
	return redirect(url_for('login'))

@app.route('/lobby')
def lobby():
        if 'username' in session:
        	name = request.cookies.get('name')
        	print(name)
        	return render_template('plank.html', name_=name)

        return redirect(url_for('login'))

@app.route('/')
def home():
	return render_template('home.html')


@app.route('/album', methods=['GET', 'POST'])
def album():
	if 'username' in session:
		if request.method ==' GET':
			#getting all the images name thats inside imgs folder and store in a list
			image_names = os.listdir('./app/static/imgs')
			return render_template('album.html', image_names = image_names)
		if request.method == 'POST':
			image_names = os.listdir('./app/static/imgs')
			return render_template('album.html', image_names = image_names)
		return ''
	return redirect(url_for('login'))	