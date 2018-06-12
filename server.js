// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// 2nd part -- connect database and add data table
var Bear     = require('./app/models/bear');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://walter:gta12345@ds257470.mlab.com:57470/netflix'); // connect to our database
// 2nd part

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// 2nd part -- add actual routing
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
// 2nd part

// 3rd part - insert a bear POST
// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var bear = new Bear();      // create a new instance of the Bear model
        // bear.Name = req.body.name;  // set the bears name (comes from the request)
        // bear.Detail=req.body.detail;
        // bear.Good=0;
        bear.movieList={
            mylist:[
                {
                'title': 'Futurama',
                'id': 1,
                'img': 'http://cdn1.nflximg.net/webp/7621/3787621.webp'
                },
                {
                'title': 'The Interview',
                'id': 2,
                'img': 'http://cdn1.nflximg.net/webp/1381/11971381.webp'
                },
                {
                'title': 'Gilmore Girls',
                'id': 3,
                'img': 'http://cdn1.nflximg.net/webp/7451/11317451.webp'
                }
                ],
                recommendations:[
                {
                'title': 'Family Guy',
                'id': 4,
                'img': 'http://cdn5.nflximg.net/webp/5815/2515815.webp'
                },
                {
                'title': 'The Croods',
                'id': 5,
                'img': 'http://cdn3.nflximg.net/webp/2353/3862353.webp'
                },
                {
                'title': 'Friends',
                'id': 6,
                'img': 'http://cdn0.nflximg.net/webp/3200/9163200.webp'
                }
                ]
        }
        // save the bear and check for errors
        bear.save(function(err) {
            console.log(bear);
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    })
	//;
// 3rd part

// 4th part -- get the bear list
// get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });
// 4th part

// 5th part - access an individual bear
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
	//;
// 5th part

// 6th part -- update
// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {
      if(req.body.type==="add"){
        Bear.findById(req.params.bear_id, function(err, bear) {
                if (err)
                    res.send(err);

                let tempstate={...bear.movieList};
                    for(let i=0;i<tempstate.recommendations.length;i++){
                        if(tempstate.recommendations[i].id==req.body.id){
                            tempstate.mylist.push(tempstate.recommendations[i]);
                            tempstate.recommendations.splice(i,1);
                            break;
                        }
                    }

                 Bear.update({_id:req.params.bear_id},{movieList:tempstate}).exec();

                 res.json({ message: 'Successfully updated' }); 
        })
    } else if(req.body.type==="remove") {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);

            let tempstate={...bear.movieList};
                for(let i=0;i<tempstate.mylist.length;i++){
                    if(tempstate.mylist[i].id==req.body.id){
                        tempstate.recommendations.push(tempstate.mylist[i]);
                        tempstate.mylist.splice(i,1);
                        break;
                    }
                }

             Bear.update({_id:req.params.bear_id},{movieList:tempstate}).exec();

             res.json({ message: 'Successfully updated' }); 
    })
    }
                
                
        // use our bear model to find the bear we want
     
 
         
    })
	//;
// 6th part

// 7th part - delete
// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
// 7th part 

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
