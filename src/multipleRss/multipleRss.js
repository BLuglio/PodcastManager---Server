const DOMParser = require('xmldom').DOMParser
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
let total = []

async function getMultipleRss(args) {
    total = [];
    try{
        for(let url of args.urls) {
            await parseRss(url).then(res => {
                total.push(res)
            })
        }
        return total
    } catch(e) {
        console.log(e)
    }
}

function parseRss(url) {
    
    return new Promise(function(resolve, reject){
        
            let Http = new XMLHttpRequest()
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
                        "id": '_' + Math.random().toString(36).substr(2, 9),
                        "url": url,
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
            }//Http.onreadystatechange   
    })
}

module.exports = getMultipleRss