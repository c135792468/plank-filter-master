from flask import render_template, request, url_for, jsonify, make_response, redirect
import os
from PIL import Image, ImageFilter
import matplotlib.pyplot as plt
import time
from app import app

@app.route('/filter', methods=['GET', 'POST'])
def index():
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

@app.route('/lobby')
def lobby():
        name = request.cookies.get('name')
        print(name)
        return render_template('plank.html', name_=name)

@app.route('/', methods=["GET", "POST"])
def getName():
    if(request.method == "POST"):
        name = request.form["name"]
        response = make_response(redirect('/lobby'))
        response.set_cookie('name', name)

        return response

    elif(request.method == 'GET'):
        return render_template('enter-name.html')
