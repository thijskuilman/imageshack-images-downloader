![imageshack-logo-download](https://user-images.githubusercontent.com/3017676/45779894-98b7de00-bc5c-11e8-998f-35161a2206bf.png)

# ImageShack downloader
Perhaps you have used ImageShack in the past, just like me. ImageShack made some strange moves in the past few years, including removing your uploaded images. I created this tool so you can download your images and move it to a better hosting service.

## Requirements
You'll need Python and Node (at least v6.4.0) to run this tool.

## Usage
```sh
$ npm install
$ cp .env.example .env
$ (fill in the .env fields)
$ python imageshack_downloader.py
```
## How it works
Unfortunately, the ImageShack API is not available anymore, so I used Puppeteer (a headless Chrome Node API) to scrape the image URL's from your ImageShack account. After that, a Python script will download all the images to the /images folder.

![screenshot from 2018-09-19 16-45-44](https://user-images.githubusercontent.com/3017676/45761742-1e239a00-bc2d-11e8-838d-95dcf67a2a75.png)
