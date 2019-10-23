
const
   puppeteer = require("puppeteer"),
	fs      = require('fs'),
	cheerio = require('cheerio'),
	charset = require('superagent-charset'),
	request = require('superagent'),
	xlsx    = require('node-xlsx');
let pag =1;
    list=[]
async function demo01() {
   const browser = await puppeteer.launch({ headless: true });
   const page = await browser.newPage();
   
   await page.goto("https://www.jianshu.com/search?q=儿童益生菌&page="+pag);
   	  
   await page.waitFor(2000);
   
   const result = await page.evaluate(() => {
   	let Html = document.querySelector("html").innerHTML;
     return Html
   });
   
   let 
       $ = cheerio.load(result, {decodeEntities: true}),    // 加载获取到的 html 数据console.log($)
       $itemMod = $('.content').find('.title'),
       len = $itemMod.length;
	   
       if(len>0){
		   pag+=1;
		   $itemMod.each((i,e)=>{
			   let $e=$(e),
					website='https://www.jianshu.com'
			        ArticleHref=website+$e.attr('href');
					request.get(ArticleHref)
						.end((err,res)=>{
							if(!err){
							let
							    data=[],
								ArticleHtml=res.text,	
								$ = cheerio.load(ArticleHtml, {decodeEntities: true}),
								$articleMod = $('._2rhmJa'),
								$title=$("._1RuRku"),
								article=$articleMod.text(),
								title=$title.text();
								data.push(title);
								data.push(article);
								list.push(data);
							     
							}
						})
					
		   });
		   let buf = xlsx.build([{name: '百度问答', data: list}]);
		   // 将 buffer 写入到 my.xlsx 中（导出）
		   fs.writeFile('1.xlsx', buf, (err)=> {
		       if(err) throw err;
		       console.log('File is saved!');
		       // 回调获取下一页数据
		      demo01();
		   });
		   console.log(list)
	   }
	     
   browser.close();

  console.log(pag)
}


/* async function demo02() {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	
	await page.goto(ArticleHref);
		  
	await page.waitFor(4000);
	
	const result02 = await page.evaluate(() => {
		let Html02 = document.querySelector("html").innerHTML;
	    return Html02
	});
	
}
 */
demo01()