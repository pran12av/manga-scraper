const cheerio = require('cheerio');
const axios = require('axios');
const jsdom = require('jsdom')
const dom = new jsdom.JSDOM("");
require('dotenv').config();

const base_url = process.env.BASE_URL;

module.exports = async function chapter(url) {

    let chapter = [];
    let promises = [];



    try {

        let page_url = base_url + url;

        const pageData = await axios.get(page_url,{ });


        const $ = cheerio.load(pageData.data);

        let checker = $($("body > script").get(7)).html();
        let reg = /chapterid.*?;/g;
        let res = reg.exec(checker).toString();
        reg = /chapterid/;
        let cid = res.replace(reg, "").replace(" ", "").replace(";", "").replace("=", "");


        let cfunUrl = page_url.substring(0, page_url.lastIndexOf('/') + 1) + "chapterfun.ashx";


        // calculate total pages

        let pageLast = $(".pager-list-left > span >a").last().prev().text();



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