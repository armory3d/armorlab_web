let fs = require('fs');

let writeHtml = function(fileName, body = '') {
	let header = fs.readFileSync('header.html', 'utf8');
	let footer = fs.readFileSync('footer.html', 'utf8');
	let html = fs.readFileSync(fileName, 'utf8');
	fs.writeFileSync('../' + fileName, header + html + body + footer);
}

writeHtml('index.html');
writeHtml('news.html');
writeHtml('community.html');
writeHtml('download.html');
writeHtml('notes.html');
writeHtml('howto.html');
writeHtml('privacy.html');

// fs.rmSync('../img/cloud', { recursive: true });
// fs.mkdirSync('../img/cloud');

// cloud_grid = `
// <div class="uk-section uk-section-secondary">
// <div style="justify-content: center; display: grid; grid-template-columns: repeat(auto-fill, 170px); max-width: 900px; margin: auto;">
// `;

// let icon_folders = [
// 	'../../armorpaint_cloud/public/cloud/materials/scanned',
// ];

// for (folder of icon_folders) {
// 	fs.readdirSync(folder).forEach(file => {
// 		let isMaterial = folder.indexOf('/materials') > 0;
// 		if (file.endsWith(isMaterial ? '.png' : '.jpg')) {
// 			fs.copyFileSync(folder + '/' + file, '../img/cloud/' + file);
// 			label = file.slice(0, -9);
// 			if (label.length > 13) label = label.substring(0, 11) + '...';
// 			cloud_grid += '<div style="width: 70%; text-align: center; margin: auto;"><img src="' + (isMaterial ? 'img/cloud_raytraced/' : 'img/cloud/') + file + '"/><br>' + label + '<br><br></div>';
// 		}
// 	});
// }

// cloud_grid += '</div></div>';
// cloud_grid += '<div class="uk-section uk-section-secondary"><div class="uk-text-center">Materials are available in the <a href="https://armorpaint.org/cloud.html">ArmorPaint cloud</a>. 🖌🎨<br><br></div></div>';

// writeHtml('gallery.html', cloud_grid);
