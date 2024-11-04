let fs = require('fs');
let header = fs.readFileSync('header.html', 'utf8');
let cover = fs.readFileSync('cover.html', 'utf8');
let footer = fs.readFileSync('footer.html', 'utf8');

let writeHtml = function(fileName, extra = '') {
	let html = fs.readFileSync(fileName, 'utf8');
	fs.writeFileSync('../' + fileName, header + cover + html + extra + footer);
}

let writeManual = function(fileNameOut, fileNameHeader, fileNameFooter, fileNameMd) {
	let showdown = require('./showdown.min.js');
    let converter = new showdown.Converter();
    let file_md = fs.readFileSync(fileNameMd, 'utf8');
    let converted_md = converter.makeHtml(file_md);
	let htmlHeader = fs.readFileSync(fileNameHeader, 'utf8');
	let htmlFooter = fs.readFileSync(fileNameFooter, 'utf8');
	fs.writeFileSync('../' + fileNameOut, header + htmlHeader + converted_md + htmlFooter + footer);
}

let writeNews = function(fileName, extra = '') {
	let html = fs.readFileSync('../../armorpaint_web/src/' + fileName, 'utf8');
	html = html.replaceAll('img/news/', 'https://armorpaint.org/img/news/');
	fs.writeFileSync('../' + fileName, header + cover + html + extra + footer);
}

writeHtml('index.html');
writeNews('news.html');
writeHtml('community.html');
writeHtml('download.html');
writeHtml('notes.html');
writeHtml('howto.html');
writeHtml('privacy.html');
writeManual('manual.html', 'manual_header.html', 'manual_footer.html', '../manual.md');

// gallery.html
{
	fs.rmSync('../img/cloud', { recursive: true });
	fs.mkdirSync('../img/cloud');
	let cloud_grid = `
		<div style="justify-content: center; display: grid; grid-template-columns: repeat(auto-fill, 170px); max-width: 900px; margin: auto;">
	`;
	let icon_folders = [
		'../../armorpaint_cloud/public/cloud/materials/armorlab'
	];
	for (let folder of icon_folders) {
		fs.readdirSync(folder).forEach(file => {
			let isMaterial = folder.indexOf('/materials') > 0;
			if (file.endsWith(isMaterial ? '.png' : '.jpg')) {
				fs.copyFileSync(folder + '/' + file, '../img/cloud/' + file);
				label = file.slice(0, -9);
				if (label.length > 13) label = label.substring(0, 11) + '...';
				let filePath = 'img/cloud/' + file;
				if (isMaterial && fs.existsSync('../img/cloud_raytraced/' + file)) {
					filePath = 'img/cloud_raytraced/' + file;
				}
				cloud_grid += '<div style="width: 70%; text-align: center; margin: auto;"><img style="width: 128px;" src="' + filePath + '"/><br>' + label + '<br><br></div>';
			}
		});
	}
	cloud_grid += '</div>';
	writeHtml('gallery.html', cloud_grid);
}

// rss.xml
{
	let rss = `<?xml version="1.0" encoding="UTF-8" ?>
	<rss version="2.0">
	<channel>
		<title>ArmorLab</title>
		<link>https://armorlab.org/news</link>
		<description>Texture Creation Software</description>
	`;

	let news = fs.readFileSync("../../armorpaint_web/src/news.html", "utf8");
	let h3s = news.split(`<h3 class="fw-normal text-muted mb-3">`);
	let items = [];
	h3s.shift();
	h3s.shift();
	for (let h3 of h3s) {
		items.push(h3.split("</h3>")[0]);
	}

	for (let item of items) {
		rss += `
			<item>
	    		<title>ArmorLab News</title>
	    		<link>https://armorlab.org/news</link>
	    		<description>${item}</description>
			</item>

		`;
	}

	rss += `
	</channel>
	</rss>
	`;

	fs.writeFileSync('../rss.xml', rss);
}
