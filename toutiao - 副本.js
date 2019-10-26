const
   puppeteer = require("puppeteer"),
	fs      = require('fs'),
	cheerio = require('cheerio'),
	charset = require('superagent-charset'),
	request = require('superagent'),
	xlsx    = require('node-xlsx');
let pag =10,
ab,
    list=[];
	 
		async function demo() {
			   const browser = await puppeteer.launch({ headless: true });
			   const page = await browser.newPage();
			   await page.goto("https://wenku.baidu.com/search?word=%B6%F9%CD%AF%D2%E6%C9%FA%BE%FA&org=0&fd=0&lm=1&od=0&pn="+pag);
			   await page.waitFor(1000);
		   
			   const result = await page.evaluate(() => {
			   let Html = document.querySelector("html").innerHTML;
			   return Html
		   });
		    let
		     $ = cheerio.load(result, {decodeEntities: true}),
		     $itemMod = $('.logFirstClickTime').find('.fl'),
			 len=$itemMod.length;
			 
			 if(len>0){
				 pag+=10;
				let data=[]
				 $itemMod.each((i,e)=>{
				 		 let $e=$(e),
				 			 ArticleHref=$e.find('.log-xsend').attr('href');
						async function demo02() {
								 const browser = await puppeteer.launch({ headless: true });
								 const page = await browser.newPage();
								 await page.goto(ArticleHref);
								 
								 await page.waitFor(2000);	   
								const result02 = await page.evaluate(() => {
									let Html02 = document.querySelector("html").innerHTML;
								    return Html02
								});
								let
								 $ = cheerio.load(result02, {decodeEntities: true}),
								 $articleMod = $('.reader-txt-layer'),
								 $title=$('.reader_ab_test'),
								 title=$title.text(),
								 article=$articleMod.text();
								 
								 return {
									 title,
									 article
								 }
								 await browser.close();
						}
						ab=demo02()
				});
				ab.then(value=>{
							data.push(value.title)
						    data.push(value.article)
							
							console.log(data)
						})
			 }
		
			 await browser.close();
			demo()
		}
		
demo()
		 
	
		 
		 
		 // await page.screenshot({ path: "google.png" })
			// let
			//  $ = cheerio.load(result, {decodeEntities: true}),
			//  $articleMod = $('.reader-page-wrap  reader-txt-layer'),
			//  article=$articleMod.text();
			//  console.log(article)
			// 
			// let buf = xlsx.build([{name: '百度问答', data: list}]);
			// // 将 buffer 写入到 my.xlsx 中（导出）
			// fs.writeFile('1.xlsx', buf, (err)=> {
			//     if(err) throw err;
			//     console.log('File is saved!');
			//     // 回调获取下一页数据
			//    demo();
			// });
			// 				