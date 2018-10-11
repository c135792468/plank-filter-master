from flask import Flask, render_template, request, url_for, jsonify
import os
from PIL import Image, ImageFilter
import matplotlib.pyplot as plt
import time

app = Flask(__name__)


# photos = UploadSet('photos', IMAGES) #type of file to be uploaded <- IMAGES
# app.config['UPLOAD_PHOTOS_DEST'] = './static/imgs'

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
			# plt.imshow()
		elif(filter == "f2"):
			print("filter 2")
			image = image.filter(ImageFilter.GaussianBlur(20))
		elif(filter == "f3"):
			print("filter3")
			image = image.filter(ImageFilter.CONTOUR)


		#print(filter)
		#after filter, save to static/imgs
		#edit filepath to have new image name (after altered)

		ts = time.time()
		print(ts)

		filepath = os.path.join('./static/imgs', str(ts) + ffile.filename)
		image.save(filepath)



		print("filename: ", filepath)
		print(app.instance_path)
		return jsonify({"file": filepath})


	return ""

if __name__ == '__main__':
	app.run(debug=True)

