const cheerio = require('cheerio');
const axios = require('axios');
require('dotenv').config();

const base_url = process.env.BASE_URL;

module.exports = async function manga(page) {


    let page_num = (page-1)*100 +1;
    let promises = [];
    let titles = [];

    while (1) {
        try {


            let page_url = base_url + `directory/${page_num}.html`;

            const promise = axios.get(page_url);
            promises.push(promise);

            if (page_num > 100*page) break;
            // console.log(page_num);
            promise.then(function (pageData) {
                //console.log(pageData.data);
                const $ = cheerio.load(pageData.data);

                const checker = $(".manga-list-1-list > li");

                

                $(".manga-list-1-list > li").each((index, obj) => {

                    const aRef = $(obj).find("a");
                    const img = $(obj).find("a > img");


                    const tmp = {
                        title: aRef[0].attribs.title,
                        imageUrl: img[0].attribs.src,
                        url: aRef[0].attribs.href,
                    }

                    titles.push(tmp);


                });
            }).catch(err => console.log(err));

            page_num++;

        } catch (err) {
            console.log(err);
        }


    }

    await Promise.all(promises);

    return {
        status: 200,
        list: titles,
    }

}




