from app import app
from flask import render_template, jsonify, request, redirect, url_for, Flask
import json
import os
import time
from PIL import Image, ImageFilter
import matplotlib.pyplot as plt


APP_ROOT = os.path.dirname(os.path.abspath(__file__))#the path name of our project
#photos = UploadSet('photos', IMAGES)
#app.config['UPLOADED_PHOTOS_DEST'] = 'static/img'
#configure_uploads(app, photos)

@app.route('/', methods=['GET', 'POST'])
def index():
	if(request.method == 'GET'):
		return render_template('index.html')
	elif(request.method == 'POST'):
		target = os.path.join(APP_ROOT,'static/IMAGES/')#path name for the image folder
		print(target)#print out that name on the terminal

		if not os.path.isdir(target): #if that folder don't exist then we make one
			os.mkdir(target)

		ffile = request.files["file"]
		print("file:", ffile.filename)#check if the filename is correctly

		filter = request.form.get("filter");
		image = Image.open(ffile)
		
		#apply filter to file
		if(filter == "f1"):
			image = image.convert('L')
		elif(filter == "f2"):
			image = image.filter(ImageFilter.GaussianBlur(20))
		elif(filter == "f3"):
			image = image.filter(ImageFilter.CONTOUR)
		elif(filter == "f4"):
			image = image.filter(ImageFilter.EDGE_ENHANCE_MORE)
		elif(filter == "f5"):
			image = image.filter(ImageFilter.EMBOSS)
		elif(filter == "f6"):
			image = image.filter(ImageFilter.FIND_EDGES)

		#SMOOTH_MORE


		ts = time.time()
		filepath = os.path.join('./static/IMAGES', str(ts) + ffile.filename)

		#filepath = os.path.join(target, ffile.filename)
		#filepath = os.path.join('./static/IMAGES', ffile.filename)
		image.save(filepath)
		print(filepath)

		return jsonify({"file": filepath})

	



if __name__ == '__main__':
	app.run(debug=True)