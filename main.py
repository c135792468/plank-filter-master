from flask import Flask, render_template, request, url_for, jsonify
import os
app = Flask(__name__)


# photos = UploadSet('photos', IMAGES) #type of file to be uploaded <- IMAGES
# app.config['UPLOAD_PHOTOS_DEST'] = './static/imgs'

@app.route('/filter', methods=['GET', 'POST'])
def index():
	if(request.method == 'GET'):
		return render_template('index.html')

	elif(request.method == 'POST'):
		ffile =	request.files["file"]
		filepath = os.path.join('./static/imgs', ffile.filename)

		filter = request.form.get("filter")

		#apply filter to file
		if(filter == "f1"):
			print(filter) #replace this stuff later 
		elif(filter == "f2"):
			print(filter)
		elif(filter == "f3"):
			print(filter)
		#after filter, save to static/imgs
		#edit filepath to have new image name (after altered)

		# filepath = os.path.join('./static/imgs', new-filename here)

		ffile.save(filepath)

		return jsonify({"file": filepath})
	return ""

if __name__ == '__main__':
	app.run(debug=True)

