
const DOMParser = require('xmldom').DOMParser
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const Http = new XMLHttpRequest()
const rssReader = require('rss-to-json')

async function getRss(args) {
    try{
        let result = await Promise.all([
            parseRss(args)
        ])
        return result
    } catch(e) {
        console.log(e)
        return []
    }
}

function parseRss(args) {
    return new Promise(function(resolve, reject){
        const url = args.url

        rssReader.load(url, (err, rss) => {
            
            for (item of rss.items) {
                console.log(item.title, "\n", item.link, "\n")
             }
        })


        /*
        Http.open("GET", url)
        Http.send()
        Http.onreadystatechange = function() { 
            // Only run if the request is complete
            if (Http.readyState !== 4) return;
            // Process the response
			if (Http.status >= 200 && Http.status < 300) {
                // If successful
                let res = JSON.stringify(Http.responseText)
                let xmlDoc = new DOMParser().parseFromString(Http.responseText, "application/rss+xml")
                //console.log(xmlDoc)
                link = xmlDoc.getElementsByTagName('image')
                console.log(link)
                //console.log(new DOMParser().parseFromString(Http.responseXML, "application/rss+xml"))
				resolve(Http.responseText)
			} else {
				// If failed
				reject({
					status: Http.status,
					statusText: Http.statusText
				})
			}    
        }
            
        //chiamata http all'url passato come args
        //restituisce l'rss convertito in json
        */
})
}

module.exports = getRss