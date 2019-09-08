const
    http    = require('http'),
    fs      = require('fs'),
    cheerio = require('cheerio'),
    charset = require('superagent-charset'),
	request = require('superagent'),
    xlsx    = require('node-xlsx'),
    url = 'https://zhidao.baidu.com/search?lm=0&rn=10&pn=0&fr=search&ie=gbk&word=5656',
    iconv = require('iconv-lite')
	charset(request);
let page = 1,
    list = [],
    start = '',
    fetchPage = ()=> {
        start();
    };

start = ()=> {
    request.get(url)

     .charset('gbk')
        .end((err, res)=> {
            if (!err) {     // 如果获取过程中没有发生错误
                let
                    html =res.text,// 获取到数据
                    $ = cheerio.load(html, {decodeEntities: true}),    // 加载获取到的 html 数据console.log($)
                    $itemMod = $('.dl').find('.ti'),
                    len = $itemMod.length;
console.log(html)
                if(len > 0) {
                    page ++;
                    $itemMod.each((i, e)=> {
                        let data = [],  // 用来存储抓取的数据
                            $e = $(e);  // 缓存
                       data.push($e.text().trim());
                        data.push($e.attr('href'));
                        list.push(data);
						console.log(data)
                    });
					  console.log(list.length);
					// 通过 xlsx 模块将数据转化成 buffer 对象
					let buf = xlsx.build([{name: '百度问答', data: list}]);
					// 将 buffer 写入到 my.xlsx 中（导出）
					fs.writeFile('百度问答.xlsx', buf, (err)=> {
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