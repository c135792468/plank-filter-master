from flask import render_template, request, url_for, jsonify, make_response, redirect, session
import os
from PIL import Image, ImageFilter
import matplotlib.pyplot as plt
import time
from app import app
from flask_pymongo import PyMongo
import bcrypt
from app import selected_album

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
		album = mongo.db.user_albums
		existing_user = user.find_one({'username' : request.form['username']})

		if existing_user is None:
			hashpass = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt())
			user.insert({'username' : request.form['username'], 'password' : hashpass})
			session['username'] = request.form['username']
			# create a default album for user
			album.insert({'user_id' : session['username'], 'album_name' : 'default'})
			# open session and redirect
			name = request.form['username']
			response = make_response(redirect('/lobby'))
			response.set_cookie('name', name)
			return response

		return 'That username already exists'

	return render_template('register.html')

@app.route('/endsession')
def endsession():
	session.clear()
	response = make_response(redirect('/'))
	response.set_cookie('name','', expires=0)
	return response

@app.route('/filter', methods=['GET', 'POST'])
def index():
	if 'username' in session:
		if(request.method == 'GET'):
			return render_template('index.html')

		elif(request.method == 'POST'):
			ffile =	request.files["file"]
			print("file: ", ffile.filename)
			filepath = os.path.join('./static/imgs/', ffile.filename)

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

			filepath = os.path.join('./static/imgs', str(ts) + ffile.filename)
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
		album = mongo.db.user_albums
		user_image = mongo.db.user_images
		album_names = []
		db_image_names = []
		for db_album_names in album.find({"user_id": session['username']}):
			album_name = db_album_names['album_name']
			album_names.append(album_name)
		print(album_names)
		for db_user_images in user_image.find({"user_id": session['username'], "album_name": selected_album}):
			db_image_name = db_user_images['image_name']
			db_image_names.append(db_image_name)
		print(db_image_names)
		images = os.listdir('./static/imgs')
		set_images = set(images)
		set_db_image_names = set(db_image_names)
		image_names = set_images.intersection(db_image_names)
		print(image_names)
		return render_template('album.html', image_names=image_names, album_names=album_names, selected_album=selected_album)
	return redirect(url_for('login'))

@app.route('/create_album', methods=['POST'])
def create_album():
	album = mongo.db.user_albums
	existing_album = album.find_one({'album_name' : request.form['album_name']})
	if existing_album is None:
		album.insert({'user_id' : session['username'], 'album_name' : request.form['album_name']})
		return redirect(url_for('album'))
	return 'That album already exists'

@app.route('/select_album', methods=['POST'])
def select_album():
	global selected_album
	selected_album = request.form['album_name']
	return redirect(url_for('album'))

@app.route('/uploadalbum', methods=['POST'])
def uploadalbum():
	if 'username' in session:
		user_image = mongo.db.user_images
		target = os.path.join('./static/imgs')
		for ffile in request.files.getlist("img"):
			ffilename = ffile.filename
			name = request.cookies.get('name')
			image_name = "/".join([str(name) + '_' + str(selected_album) + '_' + ffilename])
			destination = "/".join([target, image_name])
			ffile.save(destination)
			user_image.insert({'user_id' : session['username'], 'image_name' : image_name, 'album_name' : selected_album})
		return redirect(url_for('album'))
	return redirect(url_for('login'))

@app.route('/uploadchat', methods=['POST'])
def uploadchat():
	if 'username' in session:
		user_image = mongo.db.user_images
		target = os.path.join('./static/imgs')
		for ffile in request.files.getlist("img"):
			ffilename = ffile.filename
			name = request.cookies.get('name')
			image_name = "/".join([str(name) + '_' + str(selected_album) + '_' + ffilename])
			destination = "/".join([target, image_name])
			ffile.save(destination)
			user_image.insert({'user_id' : session['username'], 'image_name' : image_name, 'album_name' : selected_album})
		return redirect(url_for('lobby'))
	return redirect(url_for('login'))

