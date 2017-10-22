
var express = require('express');
var router = express.Router();
var amazon = require('amazon-product-api');
import { processAmazonResults } from '../util'

// Establish Amazon search abilities
var client = amazon.createClient({
    awsId: 'AKIAIKMUVUJEGNAADWTQ',
    awsSecret: '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',
    awsTag: 'evwilson-20'
});

/* GET amazon search results. */
router.get('/', function(req, res, next) {
    console.log('Get at amazonSearch, Keys: ' + Object.keys(req.query) + ' Search: ' + req.query.search);

    client.itemSearch({
        searchIndex: 'All',
        keywords: req.query.search,
        responseGroup: 'Medium',
        itemPage: 1
    })
    .then(function(results) {
        processAmazonResults(results);
    })
    .catch(function(err) {
        console.log('In Amazon query failure');
        console.log(err);
        err.Error.forEach(function(error) {
            console.log(error);
        });
    });

});

module.exports = router;