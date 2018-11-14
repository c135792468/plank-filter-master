from flask import Flask, render_template, request, url_for, jsonify
import os
from PIL import Image, ImageFilter
import matplotlib.pyplot as plt
import time

app = Flask(__name__)

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
			image = image.convert('L')
		elif(filter == "f2"):
			image = image.filter(ImageFilter.GaussianBlur(20))
		elif(filter == "f3"):
			image = image.filter(ImageFilter.CONTOUR)

		ts = time.time()

		filepath = os.path.join('./static/imgs', str(ts) + ffile.filename)
		image.save(filepath)

		return jsonify({"file": filepath})


	return ""

@app.route('/')
def add():
	return render_template('plank.html')

if __name__ == '__main__':
	app.run(debug=True)

