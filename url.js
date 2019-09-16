const 
	  fs      = require('fs'),
	  cheerio = require('cheerio'),
	  charset = require('superagent-charset'),
	  request = require('superagent'),
	  url ="http://zhidao.baidu.com/question/647041188276598525.html?fr=iks&word=%B1%B1%BE%A9&ie=gbk";
	 let  len ="";
	  charset(request);
	  start=()=>{
		  request.get(url)
		  .charset("gbk")
		  .end((err, res)=>{
			 if(!err){
				 const html=res.text
				 $ = cheerio.load(html, {decodeEntities: true})
				 $itemMod = $('.mb-10')
				 len=$itemMod.length
				 let data=$itemMod.text()
				 const reg=(/展开全部/g)
				 console.log(data.replace(reg,''))
				
			 }
		  })
	  }
	  
	  start()