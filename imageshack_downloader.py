from subprocess import call
import os;

if not os.path.exists('images'):
    os.mkdir('images')

call(["node", "get_image_urls.js"]) 
call(["python", "download_images.py"])