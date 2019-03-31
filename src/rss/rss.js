
const DOMParser = require('xmldom').DOMParser
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const Http = new XMLHttpRequest()

async function getRss(args) {
    try{
        let result = await Promise.all([
            parseRss(args)
        ])
        return result[0]
    } catch(e) {
        console.log(e)
        return []
    }
}

function parseRss(args) {
    return new Promise(function(resolve, reject){
        const url = args.url
      
        Http.open("GET", url)
        Http.send()
        Http.onreadystatechange = function() { 
            if (Http.readyState !== 4) return
			if (Http.status >= 200 && Http.status < 300) {
                let res = Http.responseText
                let xmlDoc = new DOMParser().parseFromString(res, "application/rss+xml")
                let podcastTitle = xmlDoc.getElementsByTagName('title')[0].childNodes[0].nodeValue
                let podcastDescription = xmlDoc.getElementsByTagName('description')[0].childNodes[0].nodeValue
                let podcastImage = xmlDoc.getElementsByTagName('image')[0].getElementsByTagName('url')[0].childNodes[0].nodeValue
                let items = xmlDoc.getElementsByTagName('item')
                let episodes = []
                for(let i = 0; i < items.length; i++){   
                    let title= items[i].getElementsByTagName('title')[0].childNodes[0].nodeValue
                    let description = items[i].getElementsByTagName('description')[0].childNodes[0].nodeValue
                    let date = items[i].getElementsByTagName('pubDate')[0].childNodes[0].nodeValue
                    episodes.push({
                        "title": title,
                        "description": description,
                        "date": date
                    })
                }

                let result = {
                    "podcastTitle": podcastTitle,
                    "podcastDescription": podcastDescription,
                    "imageUrl": podcastImage,
                    "episodes": episodes   
                }

                resolve(result)
			} else {
				reject({
					status: Http.status,
					statusText: Http.statusText
				})
			}    
        }
    })
}

module.exports = getRss