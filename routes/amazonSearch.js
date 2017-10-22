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

    results = results.filter(
        function(result) {
            return typeof result.OfferSummary[0].LowestNewPrice[0].Amount !== 'undefined';
        }
    );

    if(results.length == 0){
        var report = {
            aliStats: {},
            aliInfo: []
        }
        return report;
    }
    var statMax = parseInt(results[0].OfferSummary[0].LowestNewPrice[0].Amount[0]) / 100;
    var statMin = parseInt(results[0].OfferSummary[0].LowestNewPrice[0].Amount[0]) / 100;

    var stats = {
        mean: 0,
        median: 0,
        max: statMax,
        min: statMin
    }
    var info = [];

    results.forEach(function(result) {
        /*
        console.log('Item link keys: ' + Object.keys(result.ItemLinks[0]) + ' Item attribs: ' + Object.keys(result.ItemAttributes[0]));
        console.log('Binding: ' + result.ItemAttributes[0].Binding + ' EAN: ' + result.ItemAttributes[0].EAN);
        */

        var picUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
        if(typeof result.ImageSets !== 'undefined') {
            var picUrl = result.ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
        }

        var titleString = '';
        if(result.ItemAttributes[0].Title[0] !== undefined) {
            titleString = result.ItemAttributes[0].Title[0];
        }

        //console.log(result);
        var thisInfo = {
            name: titleString,
            link: result.DetailPageURL[0],
            price: parseInt(result.OfferSummary[0].LowestNewPrice[0].Amount[0]) / 100,
            pic: picUrl
        }

        if(thisInfo.price > stats.max) {
            stats.max = thisInfo.price;
        }
        if(thisInfo.price < stats.min) {
            stats.min = thisInfo.price;
        }

        //console.log(JSON.stringify(thisInfo, null, 2));
        info.push(thisInfo);

        stats.mean += thisInfo.price;

    });

    stats.mean = stats.mean / (info.length);

    var retInfo = info;

    info.sort(function(a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
    });

    var halfIndex = Math.floor(info.length/2);
    if(info.length % 2) {
        stats.median = parseInt(info[halfIndex].price);
    } else {
        stats.median = (parseInt(info[halfIndex-1].price) + parseInt(info[halfIndex].price)) / 2.0;
    }

    var report = {
        amStats: stats,
        amInfo: retInfo
    }

    console.log('end of amazon');
    return report;
}

/* GET amazon search results. */
router.get('/', function(req, res, next) {

    Promise.all([client.itemSearch({searchIndex: 'All', keywords: req.query.search, responseGroup: 'Medium', itemPage: 1}), axios.get('https://www.aliexpress.com/wholesale?SearchText='+req.query.search)])
        .then(function(values) {

            var amResult = values[0];
            var aliResult = values[1].data;
            var amReport = processAmazonResults(amResult);
            var aliReport = ali.parseHTML(aliResult);


            var totalMin = amReport.amStats.min;
            if(aliReport.aliStats.min < totalMin) {
                totalMin = aliReport.aliStats.min;
            }
            var totalMax = amReport.amStats.max;
            if(aliReport.aliStats.max > totalMax) {
                totalMax = aliReport.aliStats.max;
            }

            amReport.amInfo.forEach(function(info) {

                info.rawProfit = (aliReport.aliStats.mean - info.price).toFixed(2);
                info.percentProfit = ((1 - (info.price / aliReport.aliStats.mean)) * 100).toFixed(2);

                if(info.percentProfit > 20) {
                    info.ourEval = "Good";
                }
                else {
                    info.ourEval = "Poor";
                }

            });

            aliReport.aliInfo.forEach(function(info) {

                info.rawProfit = (amReport.amStats.mean - info.price).toFixed(2);
                info.percentProfit = ((1 - (info.price / amReport.amStats.mean)) * 100).toFixed(2);

                if(info.percentProfit > 20) {
                    info.ourEval = "Good";
                }
                else {
                    info.ourEval = "Poor";
                }

            });

            var amRawProfit = aliReport.aliStats.mean - amReport.amStats.mean;
            var amPercentProfit = (1 - (amReport.amStats.mean / aliReport.aliStats.mean)) * 100;
            var aliRawProfit = amReport.amStats.mean - aliReport.aliStats.mean;
            var aliPercentProfit = (1 - (aliReport.aliStats.mean / amReport.amStats.mean)) * 100;
            /*console.log("before: " + amRawProfit)
            amRawProfit = amRawProfit.toFixed(2)
            console.log("after: " + amRawProfit)

            amPercentProfit = amPercentProfit.toFixed(2)
            aliRawProfit = aliRawProfit.toFixed(2)
            aliPercentProfit = aliPercentProfit.toFixed(2)*/

            var ourEval = '';
            if(aliPercentProfit > 0.2) {
                ourEval = 'Good'
            }
            else {
                ourEval = 'Poor'
            }

            amReport.amStats.max = amReport.amStats.max.toFixed(2);
            amReport.amStats.min = amReport.amStats.min.toFixed(2);
            amReport.amStats.median = amReport.amStats.median.toFixed(2);
            amReport.amStats.mean = amReport.amStats.mean.toFixed(2);

            amReport.amInfo.forEach(function(info) {
                info.price = info.price.toFixed(2);
            });

            aliReport.aliStats.max = aliReport.aliStats.max.toFixed(2);
            aliReport.aliStats.min = aliReport.aliStats.min.toFixed(2);
            aliReport.aliStats.median = aliReport.aliStats.median.toFixed(2);
            aliReport.aliStats.mean = aliReport.aliStats.mean.toFixed(2);

            aliReport.aliInfo.forEach(function(info) {
                info.price = info.price.toFixed(2);
            });

            var prodAnal = {
                ali: {
                    rawProfit: aliRawProfit,
                    percentProfit: aliPercentProfit
                },
                am: {
                    rawProfit: amRawProfit,
                    percentProfit: amPercentProfit
                },
                totalMin: totalMin,
                totalMax: totalMax,
                searchTerm: req.query.search,
                ourEval: ourEval
            }

            var finalReport = {
                prodAnal: prodAnal,
                amReport: amReport,
                aliReport: aliReport
            }

            res.send(finalReport);
        })
        .catch(function(error) {
            console.log('Promises erroring out: ' + error);
            res.status(500).send('Could not access results at this time!');
        });


});

module.exports = router;
