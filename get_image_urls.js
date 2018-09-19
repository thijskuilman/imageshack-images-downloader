const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config()

async function main() {
	console.log("Opening headless browser..");
	const browser = await puppeteer.launch({headless: true}, '--window-size=2560,2560');
	const page = await browser.newPage();
	await page.setViewport({width: 2560, height: 2560})

	// Login
	console.log("Logging into ImageShack..");
	await page.goto('https://imageshack.com/my/images', { waitUntil: 'networkidle0' });
	await page.click('.login');
	await page.type('.login', process.env.IMAGESHACK_USERNAME);
	await page.type('.password', process.env.IMAGESHACK_PASSWORD);
	await page.click('.login-button');
	await page.waitForNavigation({ waitUntil: 'networkidle0' });
	await page.goto('https://imageshack.com/my/images', { waitUntil: 'networkidle0' });
	console.log("Succesfully logged in..")

	var directLinks = [];
	const totalPages = await page.evaluate(() => document.querySelector(".nums").lastChild.innerText);

	console.log("Retrieving your ImageShack images.. 0%");
	for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
		await page.goto('https://imageshack.com/my/images/' + currentPage, { waitUntil: 'networkidle0' });

		// Remove broken images
  		await page.evaluate(() => {
  			var elems = document.querySelectorAll(".hero-failed");
			[].forEach.call(elems, function(el) {
			  el.remove();
			});
		});

  		// Get direct links of images
  		var extraLinks = await page.evaluate(() => [...document.querySelectorAll("[data-label='Direct']")].map(a => a['defaultValue']));
		directLinks = directLinks.concat(extraLinks);

		// Write links to file
		fs.writeFileSync('./image_links.txt', directLinks);

		console.log("Retrieving your image URLS.. " +  Math.round(currentPage / totalPages * 100)  + "%");
	}

	console.log("Successfully retrieved all image URLs!")

  	await browser.close();
}

main();