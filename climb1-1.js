const
    http    = require('http'),
    fs      = require('fs'),
    cheerio = require('cheerio'),
    charset = require('superagent-charset'),
	request = require('superagent'),
    xlsx    = require('node-xlsx'),
    url = 'https://zhidao.baidu.com/search?word=%B9%D8%BD%DA%D1%D7&ie=gbk&site=-1&sites=0&date=0&pn=',
    iconv = require('iconv-lite')
	charset(request);
let page = 10,
    list = [],
    start = '',
	RegOver=(/展开全部/g),
	RegCheck=(/健力多/g),
	ArticleHtml=""
	article="",
	ArticleHref="",
    fetchPage = ()=> {
        start();
    };

start = ()=> {
    request.get(url+page)

     .charset('gbk')
        .end((err, res)=> {
            if (!err) {     // 如果获取过程中没有发生错误
                let
                    html =res.text,// 获取到数据
                    $ = cheerio.load(html, {decodeEntities: true}),    // 加载获取到的 html 数据console.log($)
                    $itemMod = $('.dl').find('.ti'),
                    len = $itemMod.length;
			        
                if(len > 0) {
                    page+=10;
                    $itemMod.each((i, e)=> { 
						let data = [],  
						$e = $(e)
						ArticleHref=$e.attr('href')
                        request.get(ArticleHref)
						    .charset('gbk')
							.end((err,res)=>{
								if(!err){
									ArticleHtml=res.text,
									$ = cheerio.load(ArticleHtml, {decodeEntities: true}),
									$articleMod = $('.mb-10')
									article=$articleMod.text().replace(RegOver,'')
									if(!RegCheck.test(article)){
										  data.push($e.text().trim());
										  data.push($e.attr('href'));
										  list.push(data);
									}
								}
							})
                    });
					  console.log(list.length);
					// 通过 xlsx 模块将数据转化成 buffer 对象
					let buf = xlsx.build([{name: '百度问答', data: list}]);
					// 将 buffer 写入到 my.xlsx 中（导出）
					fs.writeFile('健力多.xlsx', buf, (err)=> {
					    if(err) throw err;
					    console.log('File is saved!');
					    // 回调获取下一页数据
					    start();
					});
                }

            } else {
                console.log('Get data error !');
            }
        });
};

fetchPage();