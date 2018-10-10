from flask import Flask, render_template, request, url_for, jsonify
import os
from PIL import Image, ImageFilter
import matplotlib.pyplot as plt

app = Flask(__name__)


# photos = UploadSet('photos', IMAGES) #type of file to be uploaded <- IMAGES
# app.config['UPLOAD_PHOTOS_DEST'] = './static/imgs'

@app.route('/filter', methods=['GET', 'POST'])
def index():
	if(request.method == 'GET'):
		return render_template('index.html')

	elif(request.method == 'POST'):
		ffile =	request.files["file"]
		# filepath = os.path.join('./static/imgs/', ffile.filename)

		filter = request.form.get("filter")

		image = Image.open(ffile)

		#apply filter to file
		if(filter == "f1"):
			image = image.convert('L')
			# plt.imshow()
		elif(filter == "f2"):
			image = image.filter(ImageFilter.GaussianBlur(20))
		elif(filter == "f3"):
			image = image.filter(ImageFilter.CONTOUR)


			#print(filter)
		#after filter, save to static/imgs
		#edit filepath to have new image name (after altered)

		filepath = os.path.join('./static/imgs', ffile.filename)
		image.save(filepath)

		return jsonify({"file": filepath})


	return ""

if __name__ == '__main__':
	app.run(debug=True)

