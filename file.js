const
	   puppeteer = require("puppeteer"),
		fs      = require('fs'),
		cheerio = require('cheerio'),
		charset = require('superagent-charset'),
		request = require('superagent'),
		xlsx    = require('node-xlsx');
let url="https://zhidao.baidu.com/search?word=%C9%C6%B4%E6&ie=gbk&site=-1&sites=0&date=0&pn=",
	textUrl='',
	regUrl= "?fr=iks&word=%C9%C6%B4%E6&ie=gbk",
	list=[],
	pagenum1=0;	
		pageurl = async () =>{
			const browser = await puppeteer.launch({ headless: false });
			const page = await browser.newPage();
			await page.goto(url+pagenum1);
			await page.waitFor(3000);
			const result1 =  await page.evaluate(() =>{
					let Html = document.querySelector("html").innerHTML;
					return Html
			});
			
			
			let
			    $ = cheerio.load(result1, {decodeEntities: true}),    // 加载获取到的 html 数据console.log($)
			    $itemurl = $('.dl').find('.ti'),
			    lenUrl = $itemurl.length;
				
			if(lenUrl>0){
				 pagenum1+=10	
				 for(let i=0;i<lenUrl;i++){
					let $e=$itemurl.eq(i),
					    textUrl=$e.attr('href').replace(regUrl,'');
						
						
						
					    await page.goto(textUrl);
					    await page.waitFor(3000);
						const title=await page.$eval('#wgt-ask > h1 > span.ask-title', divs => divs.innerText),
							  ansText = await page.$eval('#qb-content > div.question-all-answers-number > span.question-all-answers-title', divs => divs.innerText),
					    	   regRemove=(/个回答/),
					    	   ansCounts=ansText.replace(regRemove,''),
					    	   pagenum=Math.ceil(ansCounts/5);
							   
					    	   let data = [],
					    		   RegOver=(/展开全部/),
					    		   decide=(/善存/);
								   data.push(title);
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
					    						let bool=decide.test(article);
					    						if(bool){
					    							data.push(article)
													list.push(data)
					    						}
					    				})															   
					    			}
					    			
					    	   }
							   console.log(list)
							 
				 }
				 
			}	
				
			
			
		}
	pageurl () 