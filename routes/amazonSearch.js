var express = require('express');
var router = express.Router();
var amazon = require('amazon-product-api');
var ali = require('./AliexpressParser');
var axios = require('axios');

// Establish Amazon search abilities
var client = amazon.createClient({
    awsId: 'AKIAIKMUVUJEGNAADWTQ',
    awsSecret: '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',
    awsTag: 'evwilson-20'
});

function processAmazonResults(results) {
    console.log('In Amazon query success');
    //console.log(results);

    var stats = {
        mean: 0,
        median: 0
    }
    var info = [];

    results.forEach(function(result) {
        /*
        console.log('Item link keys: ' + Object.keys(result.ItemLinks[0]) + ' Item attribs: ' + Object.keys(result.ItemAttributes[0]));
        console.log('Binding: ' + result.ItemAttributes[0].Binding + ' EAN: ' + result.ItemAttributes[0].EAN);
        */
        //console.log(JSON.stringify(result, null, 2));

        var thisInfo = {
            name: result.ItemAttributes[0].Title[0],
            link: result.DetailPageURL[0],
            price: parseInt(result.OfferSummary[0].LowestNewPrice[0].Amount[0]),
            pic: result.ImageSets[0].ImageSet[0].TinyImage[0].URL[0]
        }

        //console.log(JSON.stringify(thisInfo, null, 2));
        info.push(thisInfo);

        stats.mean += thisInfo.price;

    });

    var myLength = info.length;
    //console.log('myLength: ' + myLength);

    stats.mean = stats.mean / (100 * myLength);

    var retInfo = info;

    info.sort(function(a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
    });

    //console.log('Sorted info', info);

    //console.log('Spot 1: ' + info[myLength / 2].price + ' Spot 2: ' + info[(myLength / 2) + 1].price);
    stats.median = ( parseInt(info[myLength / 2].price) + parseInt(info[(myLength / 2) + 1].price) ) / 200;
    //console.log('Mean: ' + stats.mean + ' Median: ' + stats.median);

    var report = {
        amStats: stats,
        amInfo: retInfo
    }

    return report;
}

/* GET amazon search results. */
router.get('/', function(req, res, next) {
    console.log('Get at amazonSearch, Keys: ' + Object.keys(req.query) + ' Search: ' + req.query.search);

/*
    client.itemSearch({
        searchIndex: 'All',
        keywords: req.query.search,
        responseGroup: 'Medium',
        itemPage: 1
    })
    .then(function(results) {
        var report = processAmazonResults(results);
        //console.log(report);
        res.send(report);
    })
    .catch(function(err) {
        console.log('In Amazon query failure');
        console.log(err);
        err.Error.forEach(function(error) {
            console.log(error);
        });
    });
*/

/*
    axios.get('https://www.aliexpress.com/wholesale?SearchText='+req.query.search)
        .then(function(response) {
            console.log(response);
            var list = ali.parseHTML(response.data);
            console.log(list);

            res.send(list);
        })
        .catch(function(error) {
            console.log(error);
        });
*/


    Promise.all([client.itemSearch({searchIndex: 'All', keywords: req.query.search, responseGroup: 'Medium', itemPage: 1}), axios.get('https://www.aliexpress.com/wholesale?SearchText='+req.query.search)])
        .then(function(values) {
            console.log(values);
            //console.log('Made it');
            //console.log(Object.keys(values));

            var amResult = values[0];
            var aliResult = values[1].data;
            var amReport = processAmazonResults(amResult);
            var aliReport = ali.parseHTML(aliResult);

            var finalReport = {
                amReport: amReport,
                aliReport: aliReport
            }

            res.send(finalReport);
        })
        .catch(function(error) {
            console.log('Promises erroring out: ' + error);
        });


});

module.exports = router;
