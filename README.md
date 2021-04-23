**manga-scraper**

A rest api to obtain manga information by scraping a site.

**Usage**

1. Get all manga
    /manga/page_number
    
    example : /manga/1

    output :
    {     
    "title": "0x0 Memories",

    "imageUrl": "https://fmcdn.mfcdn.net/store/manga/4919/cover.jpg?token=24276abdde14540d61beb2303e89fe4b2b2c0976&ttl=1618732800&v=1309572598",

    "url": "/manga/0x0_memories/"

    },


2. Get Manga info
    /info/url_from_above
    
    example : /info/manga/go_go_purin_teikoku/

    output :

    {

    "description": "The pudding empire’s home planet only has a lifespan left of one year. Thus, they aim to invade Earth and make it their own... but first they’ve got to wipe out those annoying humans who are currently inhabiting the planet. Planning an invasion turns out to be much easier said than done, especially when your human-killing monsters start having problems with morale, sickness, family issues, and so forth...",

    "genres": [
    "Comedy",
    "Sci-fi",
    "Seinen"
    ],

    "chapters": [

    {
    "title": "Vol.02 Ch.036",
    "url": "/manga/go_go_purin_teikoku/v02/c036/1.html"
    },

    {
    "title": "Vol.02 Ch.035 - Do your best!",
    "url": "/manga/go_go_purin_teikoku/v02/c035/1.html"
    },

    ]

3. Get particular chapter
    /chapter/url_from_above

    example : /chapter/manga/go_go_purin_teikoku/v02/c036/1.html

[hosted on opeNode.io](https://www.openode.io/)
