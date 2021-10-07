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
    request.get('https://zhidao.baidu.com/search?ct=17&pn=0&tn=ikaslist&rn=10&fr=wwwt&ie=utf-8&word=superagent+%E7%88%AC%E8%99%AB')
	.set('Referer','https://www.baidu.com/s?wd=superagent%20%20%E6%96%87%E6%A1%A3&rsv_spt=1&rsv_iqid=0xf7e46e140001d1d1&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_dl=tb&rsv_enter=1&oq=superagent&rsv_btype=t&inputT=1520&rsv_t=d45av2gq4ktTyp%2FyTaq7MGe8fzfO%2BE%2FisOuAMiHv2yM9hTN4aAwtKl6GYrayCpjuexkr&rsv_pq=f3f196f70007ffae&rsv_sug3=36&rsv_sug1=32&rsv_sug7=100&rsv_sug2=0&rsv_sug4=2139')
	.set( 'User-Agent',' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4549.3 Safari/537.36')
	.set( 'Host',' zhidao.baidu.com')
	.set('cookie','BAIDUID=4B761B18E3B7CB86368709AD06AC092F:FG=1; __yjs_duid=1_492cd6b65a5989365dceee4104bb7e881618801588169; PSTM=1618802226; BIDUPSID=DB3A323AC88472BB06063C7FC1718AC0; BDUSS=lF3d2NGZ3RFMmwwR2t6OWd1c3pMZ09Nd1V0NmtaeEVwaVBEOTg2MHc5TzN4Y1pnRVFBQUFBJCQAAAAAAAAAAAEAAAAOdo1QvfDFo7PKz9az9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALc4n2C3OJ9gQ; BDUSS_BFESS=lF3d2NGZ3RFMmwwR2t6OWd1c3pMZ09Nd1V0NmtaeEVwaVBEOTg2MHc5TzN4Y1pnRVFBQUFBJCQAAAAAAAAAAAEAAAAOdo1QvfDFo7PKz9az9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALc4n2C3OJ9gQ; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; H_PS_PSSID=34099_31253_34112_33607_34134_26350; BDSFRCVID=_M-OJeC62mLtaURec7vE7nUVlgfa7KOTH6aosQ8oWS2aF9GyWEZxEG0Pjx8g0Kubq6MWogKK3gOTHxDF_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF=tJ4DoDPXJII3qR5gMJ5q-n3HKUrL5t_XbI6y3JjOHJOoDDv3XDccy4LdjG5LWn3KQGr-3K3K3C3_SfQ1bPjHjUPg3-Aq54ReLRby-M8-KlLBsPT5Qq6WQfbQ0M6OqP-jW5TaQCQzQb7JOpkRbUnxybkvQRPH-Rv92DQMVU52QqcqEIQHQT3m5-5bbN3ut6T2-DA_VIIaJMK; BDSFRCVID_BFESS=_M-OJeC62mLtaURec7vE7nUVlgfa7KOTH6aosQ8oWS2aF9GyWEZxEG0Pjx8g0Kubq6MWogKK3gOTHxDF_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF_BFESS=tJ4DoDPXJII3qR5gMJ5q-n3HKUrL5t_XbI6y3JjOHJOoDDv3XDccy4LdjG5LWn3KQGr-3K3K3C3_SfQ1bPjHjUPg3-Aq54ReLRby-M8-KlLBsPT5Qq6WQfbQ0M6OqP-jW5TaQCQzQb7JOpkRbUnxybkvQRPH-Rv92DQMVU52QqcqEIQHQT3m5-5bbN3ut6T2-DA_VIIaJMK; shitong_key_id=2; delPer=0; PSINO=6; ZD_ENTRY=baidu; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; BA_HECTOR=2la4050la1ag0l25rt1gddmil0r; BAIDUID_BFESS=875C06BEEDE44B218E25172ADA0678CC:FG=1; Hm_lvt_6859ce5aaf00fb00387e6434e4fcc925=1624690596,1624692560,1624692624,1624693391; Hm_lpvt_6859ce5aaf00fb00387e6434e4fcc925=1624693391; ab_sr=1.0.1_ZjQ4NmRmM2QzNDlhMmViZTJhOGZlMDU4ZWI4ZTI5ODQ0YjlhNTY3ZTg5OGQ1NjFjODBkYTgwMjkxMDM5M2VhMGQyNDdjMDA1MzYwZTVmZjg1OWIzNWZiNzdkZjdjMmEzNmJjZDM1MDUyMDg4YTY2NDQ2MGNlYTkxZDM5NzRkMjRmYTliZWU3MTNiYmFhODMxMTVjNGU2NTJmNTljODAwYTE1MWQ5ZTExZjg5N2EzMjIxNTI2NjRkYzA5N2RmNWY1; shitong_data=9b23313391d648a8238a2765f7d885779a0a630c66578f5aaa76e56017e9c71a2cdbf04b39a5d60a1bc776f62a779cb834dc5c430f7a2d86abfe381dff8102dcfa5155f53ab6db33f6328bbf20c948420bd33058647f91ac78bf6eb16c372d701ea7c74f6b109a61792a3130e7f4fa7f60e55520e27e18a8fdca58755ed8e54edefc986099ba799bdd191b6763134f85; shitong_sign=c14f0482')
	.charset('gbk')
	   .end((err, res)=> {
		
            if (!err) {     // 如果获取过程中没有发生错误
			 let
				html =res.text,// 获取到数据
				$ = cheerio.load(html, {decodeEntities: true}),    // 加载获取到的 html 数据console.log($)
				$itemMod = $('.dl').find('.ti'),
				len = $itemMod.length; 
			console.log( $itemMod)
			/*   let
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
                } */

            } else {
                console.log('Get data error !');
            }
        });
};

fetchPage();