function findAliItems(stringSearch){

    var axios = require('axios');
    return axios.get('https://www.aliexpress.com/wholesale?SearchText='+stringSearch)
    /*
      .then(function (response) {

        var list =  parseHTML(response.data);
        //console.log(list);
        //return list;
      })
      .catch(function (error) {
        console.log(error);
    });
    */
}
function callBackParseHTML(data){
    parseHTML(data);
}

function replaceAll(str, find, replace) {
    //console.log('str: ' + str);
    return str.replace(new RegExp(find, 'g'), replace);
}

function parseHTML(html){
    let cheerio = require('cheerio');
    let jsonframe = require('jsonframe-cheerio');

    html = replaceAll(html, "script", "");
    //console.log(html);
    let $ = cheerio.load(html);
    jsonframe($);

    let frame1 = {
        "items": {
            _s: "#hs-list-items .list-item",
            _d: [{
                "name": "a @ title",
                "price": "[itemprop=price]",
                "imageUrl": "img @ src",
                "itemUrl": "a @ href"
            }]
        }
    }
    let frame2 = {
        "items": {
            _s: "#hs-below-list-items .list-item",
            _d: [{
                "name": "a @ title",
                "price": "[itemprop=price]",
                "imageUrl": "img @ src",
                "itemUrl": "a @ href"
            }]
       }
    }

//str.match(/(\d[\.]*)/g)
    var list1 = $('body').scrape(frame1);
    var list2 = $('body').scrape(frame2);
    //console.log(list1);
    //console.log(list2);
    var retList = list1.items.concat(list2.items);
    if(retList.length == 0){
        var report = {
            aliStats: {},
            aliInfo: []
        }
        return report;
    }
    var listFirstTen = retList.slice(0, 10);

    var mean = 0;
    var finalList = [];

    var max = 0;
    var min = Number.MAX_SAFE_INTEGER;



    listFirstTen.forEach(function(element) {
        var arr = element.price.match(/(\d[\d\.]*)/g);
        var final = 0.0;
        for(var i = 0; i < arr.length; i++){
            final += parseFloat(arr[i]);
        }
        final = final/arr.length;
        mean += final;
        element.price = final;
        element.imageUrl = "https:" + element.imageUrl;
        element.itemUrl = "https:" + element.itemUrl;

        var nameT = element.name;
        if(nameT === undefined){
            var itemUrlCopy = element.itemUrl;
            var pos1 = itemUrlCopy.lastIndexOf('item/');
            var pos2 = itemUrlCopy.indexOf('/', pos1+5);
            itemUrlCopy = itemUrlCopy.substring(pos1+5, pos2);
            itemUrlCopy = itemUrlCopy.replace(/-/g, ' ');
            element.name = itemUrlCopy;
        }

        var thisInfo = {
            name: element.name,
            link: element.itemUrl,
            price: element.price,
            pic: element.imageUrl
        }

        if(thisInfo.price > max) {
            max = thisInfo.price;
        }
        if(thisInfo.price < min) {
            min = thisInfo.price;
        }


        finalList.push(thisInfo);

    });
    mean = mean/finalList.length;
    var tmpList = finalList;
    var median = 0;

    tmpList.sort(function(a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
    });

    var halfIndex = Math.floor(tmpList.length/2);
    if(tmpList.length % 2) {
        median = parseInt(tmpList[halfIndex].price);
    } else {
        median = (parseInt(tmpList[halfIndex-1].price) + parseInt(tmpList[halfIndex].price)) / 2.0;
    }

    var stats = {
        mean: mean,
        median: median,
        max: max,
        min: min
    }
    var report = {
        aliStats: stats,
        aliInfo: finalList
    }

    return report;
}

module.exports = {
    findAliItems,
    parseHTML
}
