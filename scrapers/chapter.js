const cheerio = require('cheerio');
const jsdom = require('jsdom');
const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');
const dom = new jsdom.JSDOM("");
require('dotenv').config();

const base_url = process.env.BASE_URL;
const proxy = process.env.PROXY;

module.exports = async function chapter(url) {

    let chapter = [];
    let promises = [];



    try {

        let page_url = base_url + url;

        const pageData = await fetch(page_url, {
            method: 'get',
            headers: { Cookie: "isAdult = 1" },
            //agent: new HttpsProxyAgent(proxy),
        });

        const data = await pageData.text();

        
        const $ = cheerio.load(data);

        let checker = $($("body > script").get(7)).html();
        let reg = /chapterid.*?;/g;
        let res = reg.exec(checker).toString();
        reg = /chapterid/;
        let cid = res.replace(reg, "").replace(" ", "").replace(";", "").replace("=", "");


        let cfunUrl = page_url.substring(0, page_url.lastIndexOf('/') + 1) + "chapterfun.ashx";


        // calculate total pages

        let pageLast = $(".pager-list-left > span > a").last().prev().text();



        for (let i = 1; i <= pageLast; i++) {
            let isLast = false;

            try {
                const $ = require("jquery")(dom.window);
               
                promises.push($.ajax({
                    url: cfunUrl,
                    data: { cid: cid, page: i },
                    type: 'GET',
                    error: function (msg) {
                    },
                    success: function (msg) {

                        eval(msg);
                        var arr = d;
                        
                        const tmp = {
                            index: i,
                            imageUrl: "https:" + arr[0],
                        }

                        chapter.push(tmp);
                        

                    }
                }));
            } catch (err) {
                console.log(err);
            }


        }

    } catch (err) {
        console.log(err);
    }

    await Promise.all(promises);
    
    chapter.sort((a,b) => {
        return (a.index - b.index);
    });
    return chapter;


}