
var express = require('express');
var router = express.Router();
var amazon = require('amazon-product-api');

// Establish Amazon search abilities
var client = amazon.createClient({
    awsId: '458975845588',
    awsSecret: 'AKIAJN7CA6ZATVUPV4DAHU8T7HunfVTy0uTDpzWRdxMCjOi',
    awsTag: 'evwilson-20'
});

/* GET amazon search results. */
router.get('/', function(req, res, next) {
    console.log('Get at amazonSearch, Keys: ' + Object.keys(req.query) + ' Search: ' + req.query.search);

    /*
    client.itemSearch({
        director: 'Quentin Tarantino',
        actor: 'Samuel L. Jackson',
        searchIndex: 'DVD',
        audienceRating: 'R',
        responseGroup: 'ItemAttributes,Offers,Images'
    })
    .then(function(results) {
        console.log(results);
        res.send('Success');
    })
    .catch(function(err) {
        console.log(err);
    });
    */
});

module.exports = router;