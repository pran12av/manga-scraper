const cheerio = require('cheerio');
const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');
require('dotenv').config();

const base_url = process.env.BASE_URL;
const proxy = process.env.PROXY;

module.exports = async function mangaInfo(url) {

    let chapters = [];
    let promises = [];
    let p, imageUrl;
    let genres = [];



    try {


        let page_url = base_url + url;

        const pageData = await fetch(page_url, {
            method: 'get',
            headers: { Cookie: "isAdult = 1" },
            agent: new HttpsProxyAgent(proxy),
        });

        const data = await pageData.text();

        const $ = cheerio.load(data);


        $(".detail-main-list > li").each((index, obj) => {
            
            const aRef = $(obj).find("a");
            const div = $(obj).find("a > div > p").first().text();

            const tmp = {
                title: div,
                url: aRef[0].attribs.href,
            }

            chapters.push(tmp);
        });

        // genre
        $(".detail-info-right-tag-list > a").each((index, obj) => {

            const genre = $(obj).text();
            genres.push(genre);
        });


        // description
        p = $(".fullcontent").text();

        // cover image
        const imageDiv = $(".detail-info-cover");
        const img = $(imageDiv).find("img");

        imageUrl = img[0].attribs.src;
        

    } catch (err) {
        console.log(err);
    }

    //console.log(chapters);

    return {
        description: p,
        genres: genres,
        chapters: chapters,
        imageUrl: imageUrl,
    }

}