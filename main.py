from flask import Flask, render_template, request
from flask_uploads import UploadSet, IMAGES, configure_uploads
app = Flask(__name__)


photos = UploadSet('photos', IMAGES) #type of file to be uploaded <- IMAGES
app.config['UPLOAD_PHOTOS_DEST'] = 'static/imgs'

@app.route('/', methods=['POST', 'GET'])
def index():
	# if request.method == 'POST' and 'img' in request.files:
	# 	filename = photos.save(request.files[img])
	# 	return filename
	return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=True)

