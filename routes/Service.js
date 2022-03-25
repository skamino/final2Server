//Service.js
//Author: Previous Dev Team/Stephen Kamino
//Date: ?
//Description: indicate the routes and the corresponding functions

const router = require('express').Router();
let serviceController = require('../controllers/Service')

router.post('/add', serviceController.addService);
router.post('/book', serviceController.bookService);
router.get('/getAll', serviceController.getServices);
router.post('/update/:id', serviceController.updateService);

//Home page routes
//By: Stephen Kamino
///Date: Feb 12 2022
router.get('/getHome1', serviceController.getHome1);
router.get('/getHome2', serviceController.getHome2);
router.get('/getHome3', serviceController.getHome3);

//get specific service details
//By: Stephen Kamino
///Date: Mar 12 2022
router.get('/getdetails/:id', serviceController.getDetails);
//router.get('/getappts/:id', serviceController.getAppts);
router.get('/getservs/:id', serviceController.getAllAds);
router.post('/updateavail', serviceController.updateAvail)
router.get('/getavails/:id', serviceController.getApptList);
router.get('/reqgetavails/:id', serviceController.getReqAvails);
router.put('/booking', serviceController.addAppt);
router.put('/setterms/', serviceController.setTermsOfService);
router.post('/serviceterms', serviceController.getTermsOfService);
router.post('/getuser', serviceController.getUserEmail);

module.exports = router;
