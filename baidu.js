const 
	   puppeteer = require("puppeteer"),
		fs      = require('fs'),
		cheerio = require('cheerio'),
		xlsx    = require('node-xlsx');
let url="https://zhidao.baidu.com/search?word=111&ie=gbk&site=-1&sites=0&date=0&pn=",
	textUrl='',
	regUrl= "?fr=iks&word=111&ie=gbk",
	list=[],
	pagenum1=0;	
	
		pageurl = async () =>{
			const browser = await puppeteer.launch({headless: true});
			const page = await browser.newPage();
			const cookies ={'url': 'https://zhidao.baidu.com', 'name': 'UserName', 'value': 'xxx'}
			
			await page.setCookie(cookies)
			await page.evaluate('1 + 2')
			await page.goto(url+pagenum1,{
				referer: 'https://zhidao.baidu.com/search?lm=0&rn=10&pn=0&fr=search&ie=gbk&dyTabStr=null&word=11',
			});
			// await page.waitFor(3000);
			const result1 =  await page.evaluate(() =>{
				let Html = document.querySelector("html").innerHTML;
				return Html
			});
			
			let
				$ = cheerio.load(result1, {decodeEntities: true}),    // 加载获取到的 html 数据console.log($)
				$itemurl = $('.dl').find('.ti'),
				lenUrl = $itemurl.length;
				// console.log( $itemurl)
			if(lenUrl>0){
				 pagenum1+=10;
				 for(let i=0;i<lenUrl;i++){
					let textUrl='',
						$e=$itemurl.eq(i),
						reg_url=$e.attr('href');
						if(!reg_url) continue;
					    textUrl=$e.attr('href').replace(regUrl,'');
						
						console.log(textUrl)
					    await page.goto(textUrl);
					    await page.waitFor(3000);//运行
						
						const TitleExist=await page.$('#wgt-ask > h1 > span.ask-title'),
							  ansTextExist=await page.$('#qb-content > div.question-all-answers-number > span.question-all-answers-title');
						
						if(TitleExist!==null){
							title= await page.$eval('#wgt-ask > h1 > span.ask-title', divs => divs.innerText);
						}
						if(ansTextExist!==null&TitleExist!==null){
							ansText = await page.$eval('#qb-content > div.question-all-answers-number > span.question-all-answers-title', divs => divs.innerText);
							regRemove=(/个回答/),
							ansCounts=ansText.replace(regRemove,''),
							pagenum=Math.ceil(ansCounts/5);
							
							let data = [],
							    RegOver=(/展开全部/),
								article1='';
								decide=(/ddfasfas/i);  //查关键词
							
							
							for(let i=0;i<pagenum;i++){
									await page.goto(textUrl+"?sort=11&rn=5&pn="+i*5);
									const result =  await page.evaluate(() =>{
										let Html = document.querySelector("html").innerHTML;
										return Html
									});
												    			
									let 
										$ = cheerio.load(result, {decodeEntities: true}),
										$itemMod = $('.mb-10'),
										len=$itemMod.length;
												    				 
									if(len>0){
										$itemMod.each((i, e)=> {
											$e = $(e),
											article=$e.text().replace(RegOver,'');
											article1+=article
										})
									}//链接内容页
							}
							
							
							let bool=decide.test(article1);
							if(!bool){
								data.push(title);
								data.push(textUrl);
								list.push(data);
								console.log(list.length);
							}
							
						}else if(ansTextExist==null&TitleExist!==null){
							let data = [];
							data.push(title);
							data.push(textUrl);
							list.push(data);
							console.log(list.length+'2');
						}
				 }
				 browser.close();
				 let buf = xlsx.build([{name: '百度问答', data: list}]);
				 // 将 buffer 写入到 my.xlsx 中（导出）
				 fs.writeFile('11.xlsx', buf, (err)=> {
				     if(err) throw err;
				     console.log('File is saved!'+pagenum1/10);
				     // 回调获取下一页数据
				    pageurl();
				 });
				 
				
			}
		}
	pageurl () 

	