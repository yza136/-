const
	fs = require("fs"),
	xlsx = require("xlsx")
    cheerio = require('cheerio'),
	request = require('superagent');

class Handle {
	excle() {
		let
			i,
			x,
			url,
			urlArr = [],
			realm,
			url1 = [],
			know = 'know.baidu.com',
			RemoveReg = '/展开全部/g',
			leaf = /健视佳/g,
			wenda = 'wenda.so.com',
			ask = 'ask.360kad.com',
			wukong = 'www.wukong.com',
			sogou = 'wenwen.sogou.com',
			iask = 'iask.sina.com.cn',
			kuaiwen = 'kuaiwen.pcbaby.com.cn',
			tieba = 'tieba.baidu.com',
			realmReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
			rangeReg = /[0-9]+$/g,
			workbook = xlsx.readFile('file.xlsx'),
			sheetName = workbook.SheetNames,
			sheet1 = workbook.Sheets[sheetName[0]],
			arr = xlsx.utils.sheet_to_json(sheet1, {
				header: 1
			}),
			ws = xlsx.utils.aoa_to_sheet(arr),
			ref = sheet1['!ref'],
			range = ref.match(rangeReg)[0];
			
			
        delete ws['!ref']
        console.log(ref)
		for (i = 2; i < range; i++) {
			url = ws['E' + i].v,
			realm = url.match(realmReg)[0];
			if (realm == know) {
				let c=url,
				    index=i;
				
				request.get(url)
					.end((err, res) => {
						if (!err) {
							let
								a = 1,
								html = res.text,
								$ = cheerio.load(html, {
									decodeEntities: true
								}),
							$itemMod = $('.answer-content').find('.con'),
							context = $itemMod.text();
							
							if (leaf.test(context)) {
								// console.log(context + ['K'+index])
								// console.log('————————————————————————')
								// console.log(c)
								ws['K'+index]={v:'是',t:'s'}
								// console.log('————————————————————————')
							} else {
									ws['K'+index]={v:'否',t:'s'}
							}
							 let wb={
								 SheetNames: ['mySheet'],
								 Sheets: {
								     'mySheet': Object.assign({}, ws, { '!ref': ref })
								 }
							 }
							 xlsx.writeFile(wb, 'output.xlsx');
						}
						   
					})
			}

		};


	}
	read() {

	}
}
var a = new Handle()
a.excle()
a.read()
