const   
	fs=require ("fs"),
	xlsx=require ("xlsx")
	cheerio = require('cheerio'),
	request = require('superagent');

class Handle{
	excle(){
		let
		   i,
		   x,
			url,
			urlArr=[],
			realm,
			know='know.baidu.com',
			wenda='zhidao.baidu.com',
			ask='ask.360kad.com',
			wukong='www.wukong.com',
			sogou='wenwen.sogou.com',
			iask='iask.sina.com.cn',
			kuaiwen='kuaiwen.pcbaby.com.cn',
			tieba='tieba.baidu.com',
			realmReg=/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
			rangeReg=/[0-9]+$/g,
			workbook=xlsx.readFile('file.xlsx'),
			sheetName=workbook.SheetNames,
			sheet1=workbook.Sheets[sheetName[0]],
			arr=xlsx.utils.sheet_to_json(sheet1,{header:1}),
			ws=xlsx.utils.aoa_to_sheet(arr),
			ref=sheet1['!ref'],
			range=ref.match(rangeReg)[0];
			
			
			for(i=2;i<range;i++){
				url=ws['E'+i].v,
		        realm=url.match(realmReg)[0],
				console.log(realm)
			let 
				readknow=()=>{
					 request.get(url)
					  .end((err,res)=>{
						  console.log(res)
					  })
				},
				// 手百问答
				readwenda=()=>{
					
				},
				// 360问答
				readask=()=>{
					
				},
				// 康爱多
				readwukong=()=>{
					
				},
				// 悟空问答
				readsogou=()=>{
					
				},
				// 搜狗问答
				readiask=()=>{
					console.log('新浪')
				},
				// 新浪问答
				kuaiwen=()=>{
					
				},
				// 快问
				tieba=()=>{
					
				};
				// 百度贴吧
				switch(realm){
				 	case know:
						readknow();
						break;
					case wenda:
					    readwenda();
					    break;
					case ask:
					    readask();
					    break;
					case wukong:
					    readwukong();
					    break;
					case sogou:
					    readsogou();
					    break;
					case iask:
					    readiask();
					    break;
					case kuaiwen:
						readkuaiwen();
					    break;
					case tieba:
					    readtieba();
					    break;
					default:
					    x="Looking forward to the Weekend";
				}	
				console.log(x)
              
			};
		       
		
				
	} 
	read(){
		
	}
}
var a=new Handle()
a.excle()
a.read()

