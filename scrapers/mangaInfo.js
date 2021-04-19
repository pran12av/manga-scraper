const cheerio = require('cheerio');
const axios = require('axios');
require('dotenv').config();

const base_url = process.env.BASE_URL;


module.exports = async function mangaInfo(url) {

    let chapters = [];
    let promises = [];
    let p;
    let genres = [];


    try {


        let page_url = base_url + url;

        const pageData = await axios.get(page_url, {
            headers: {
                Cookie: "isAdult = 1"
            }
        });
        
        const $ = cheerio.load(pageData.data);
        console.log($);

        $(".detail-main-list > li").each((index, obj) => {

            const aRef = $(obj).find("a");
            const div = $(obj).find("a > div > p").first().text();
        
            const tmp = {
                title: div,
                url: aRef[0].attribs.href,
            }

            

            chapters.push(tmp);
        });

        
        $(".detail-info-right-tag-list > a").each((index, obj) => {

            const genre = $(obj).text();
            genres.push(genre);
        });


        p = $(".fullcontent").text();



    } catch (err) {
        console.log(err);
    }

    //console.log(chapters);

    return {
        description : p,
        genres : genres,
        chapters : chapters,
    }

}