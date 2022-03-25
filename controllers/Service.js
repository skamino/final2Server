//Service.js
//Description: the controller file that stores the functions for the routes
//Author: ?/Stephen Kamino (comments below)
//Date: ?

let express = require("express");
let mongoose = require("mongoose");
let BookService = require("../models/BookService");
let CreateService = require("../models/CreateService");
let User = require('../models/User');
let Availability = require('../models/Availability');
let Appt = require('../models/Appt');
let Terms = require('../models/TermsOfService');
let bodyParser = require("body-parser");

let fs = require('fs');

module.exports.bookService = (req, res, next) => {
  let newBookService = new BookService({
    ServiceProvider: req.body.ServiceProvider,
    ServiceName: req.body.ServiceName,
    DateTime: req.body.DateTime,
    ServiceSeeker: req.body.ServiceSeeker,
  });

  newBookService
    .save()
    .then(() => res.json("Service Booked"))
    .catch((err) => res.status(400).json("Error: " + err));
};

/*module.exports.getServices = async (req, res) => {
  CreateService.find()
    .then((result) => {
      res.send(result.length > 0 ? result : "No Postings Found");
    })
    .catch((err) => {
      console.log(err);
    });
};*/

module.exports.getServices = async (req, res) => {
  /*CreateService.find()
    .then((result) => {
      res.send(result.length > 0 ? result : "No Postings Found");
    })
    .catch((err) => {
      console.log(err);
    });*/
    CreateService.find((err, servicesList) => {
      if(err) {
        res.send('services not found');
      }
      else
      {
        if(results.length > 0)
        {
          res.send({'results': "No Postings Found"});
        }
        else
        {
          res.send(servicesList);
        }
      }
    })
};

module.exports.addService = (req, res, next) => {
 console.log(req.body.serviceProvEmail);
  let newCreateService = CreateService({
    ServiceName: req.body.serviceName,
    ServiceProviderEmail: req.body.serviceProvEmail,
    ServiceProvider: req.body.serviceProv,
    Description: req.body.description,
    Category: req.body.category,
    StartDate: req.body.startDate,
    EndDate: req.body.endDate,
    Availability: req.body.availibility,
  });
  console.log(newCreateService);
  CreateService.create(newCreateService, (err, Service) =>{
    if(err)
    {
        //console.log(err);
        res.send("Error: " + err);
    }
    else
    {
        res.send("Service Added");
    }
});

};

module.exports.updateService = (req, res, next) => {
  CreateService.findById(req.params.id)
    .then((service) => {
      service.ServiceProvider = req.body.serviceProvider;
      service.ServiceName = req.body.serviceName;
      service.Description = req.body.description;
      service.Category = req.body.category;
      service.StartDate = req.body.startDate;
      service.EndDate = req.body.endDate;
      service.Availability = req.body.availability;

      service
        .save()
        .then(() => res.json("Service updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports.getServices = async (req, res, next) => {
  const services = await CreateService.find().exec();
  res.json(services);
};

module.exports.getBookings = async (req, res, next) => {
  const bookings = await BookService.find().exec();
  res.json(bookings);
};


///Home page Related Routes - this implements the first of our Tech Upgrades!!!
//By: Stephen Kamino
//Date: Feb. 12 2022
module.exports.getHome1 = (req, res, next) => {
  let list1 = [];

  CreateService.find((err, serviceList) => {
    if(err){
      console.log(err);
      res.send("server error");
    }
    else
    {
      for(let i = 0; i < 4; i++){
        list1.push(serviceList[i]);
      }
      res.send(list1);
    }
  });
}

//the second search for the home page data
//By: Stephen Kamino
///Date: Feb 12 2022
module.exports.getHome2 = (req, res, next) => {
  let list1 = [];

  CreateService.find((err, serviceList) => {
    if(err){
      console.log(err);
      res.send("server error");
    }
    else
    {
      for(let i of serviceList){
        if(i.Category == "Beauty") list1.push(i);
      }

      res.send(list1);
    }
  });
}

//the third search for the home page data
//By: Stephen Kamino
///Date: Feb 12 2022
module.exports.getHome3 = (req, res, next) => {
  let list1 = [];

  CreateService.find((err, serviceList) => {
    if(err){
      console.log(err);
      res.send("server error");
    }
    else
    {
      for(let i of serviceList){
        if(i.Category == "Accounting & Management") list1.push(i);
      }
      res.send(list1);
    }
  });
}

//used to retreive a specific service
//By: Stephen Kamino
///Date: Mar 12 2022
module.exports.getDetails = (req, res, next) => {
    let servId = req.params.id;
    console.log(servId);
    CreateService.findById({ _id: servId }, (err, service) => {
      if(err)
      {
        console.log(err);
        res.send("service not found");
      }
      else
      {
        res.send(service);
      }
    });
}

//not needed to be removed after second release
//By: Stephen Kamino
///Date: Mar 9 2022
module.exports.getAppts = (req, res, next) => {
  console.log(req.params.id);
  res.send('helloworld');
}

//By: Stephen Kamino
///Date: Mar 12 2022
module.exports.getAllAds = (req, res, next) => {
  User.findById({ _id : req.params.id}, (err, user) => {
    if(err)
    {
      console.log(err);
      res.send([]);
    }
    if(user)
    {
      let email = user.email;
      CreateService.find((err, serviceList) => {
        if(err) { 
          console.log(err);
          res.send([]) 
        }
        else
        {
          let finalList = [];
          for(let i of serviceList)
          {
            if(i.ServiceProviderEmail === email)
            {
              finalList.push(i)
            }
          }
          res.send(finalList);
        }
      });
    }
  });
}

//to update the availaibilty
//By: Stephen Kamino
///Date: Mar 12 2022
module.exports.updateAvail = (req, res, next) => {  
  console.log(req.body);
  let newAvail = Availability({
    "serviceOwner": req.body.avail.userId,
    "date": req.body.avail.day,
    "start": req.body.avail.start,
    "end": req.body.avail.end,
    "ad": req.body.avail.ad
  });
  Availability.find((err, availList) => {
    if(err)
    {

    }
    else
    {
      let canAdd = true;
      for(let i of availList)
      {
        if(i.ad === newAvail.ad)
        {
          //check the dates
          if(i.date === newAvail.date)
          {
            canAdd = false;
          }
        }
      }
      if(canAdd)
      {
        Availability.create(newAvail, (err, avail) => {
          if(err)
          {
            res.send(err);
          }
          if(avail)
          {
            console.log(avail);
            res.send('avail created');
          }
        });
      }
      else
      {
        res.send('already set');
      }
    }
  });
  
}

//used to get the list of appts
//By: Stephen Kamino
///Date: Mar 12 2022
module.exports.getApptList = (req, res, next) => {
  let id = req.params.id;
  Availability.find((err, list) => {
    if(err)
    {
      res.send('problem fetching list');
    }
    else
    {
      let usesAppts = [];
      for(let i of list)
      {
        if(i.serviceOwner == id)
        {
          usesAppts.push(i);
        }
      }
      res.send(usesAppts);
    }
  });
}

//retreive the list of availibilites for the requirer
//By: Stephen Kamino
///Date: Mar 12 2022
module.exports.getReqAvails = (req, res, next) => {
  let servId = req.params.id;
  CreateService.findById({ _id: servId }, (err, service) => {
    if(err)
    {
      console.log(err);
      res.send("service not found");
    }
    else
    {
      User.findOne({ email: service.ServiceProviderEmail }, (err, user) => {
        if(err)
        {
          console.log(err);
          res.send("user not found");
        }
        else
        {
          let userId = user._id;
          Availability.find((err, availList) => {
            if(err)
            {
              res.send('problem fetching appts');
            }
            else
            {
              let sendList = [];
              for(let i of availList)
              {
                if(i.serviceOwner == userId)
                {
                  sendList.push(i);
                }
              }
              res.send(sendList);
            }
          });
        }
      });
    }
  });
}

//adds an appt to the databese
//By: Stephen Kamino
///Date: Mar 12 2022
module.exports.addAppt = (req, res, next) => {

  CreateService.findById({ _id: req.body.booking.service}, (err, service) => {
    if(err)
    {
      console.log(err)
      res.send('failed to add appt');
    }
    else
    {
      //extract and fill the new array
      let book = Appt({
        "ApptProvider": service.ServiceProvider,
        "ApptRequirer": req.body.booking.requirer,
        "ApptDate": req.body.booking.date,
        "ApptLoc": null,
        "ApptTime": req.body.booking.time
      });
      Appt.create(book, (err, bok) => {
        if(err)
        {
          res.send('failed to create appt');
        }
        else
        {
          console.log(bok.id);
          //not working
          let newAppts = [];
          for(let i of service.Appts)
          {
            newAppts.push(i);
          }
          newAppts.push(bok.id);
          ///
          let altService = CreateService({
            "_id": req.body.service,
            "ServiceProvider": service.ServiceProvider,
            "ServiceProviderEmail": service.ServiceProviderEmail,
            "ServiceName": service.ServiceName,
            "Description": service.Description,
            "Category": service.Category,
            "StartDate": service.StartDate,
            "EndDate": service.EndDate,
            "Availability": service.Availability,
            "Appts": newAppts
          });

          console.log(altService);
          CreateService.updateOne({ _id: req.body.service}, altService, (err) => {
            if(err)
            {
              console.log(err)
              res.send('failed to add appt');
            }
            else
            {
              res.send('appt added');
            }
          });
        }
      })
    }
  });
}

//adds a terms of service to the database - this is an update or create
//By: Stephen Kamino
///Date: Mar 12 2022
module.exports.setTermsOfService = (req, res, next) => {
  let service = req.body.service;
  let newTerms = Terms({
    "service": req.body.service,
    "serviceProvider": req.body.prov,
    "terms": req.body.terms
  });
  let update = false;
  Terms.find((err, termsList) => {
    if(err)
    {
      console.log(err);
      res.send('terms not created');
    }
    else
    {
      for(let i of termsList)
      {
        if(i.service === service)
        {
          //update the terms and return
          newTerms._id = i._id;
          update = true;
        }
      }
      if(update === true)
      {
        Terms.updateOne({_id: newTerms._id}, newTerms, (err) => {
          if(err)
          {
            console.log(err);
            res.send('terms not created');
          }
          else
          {
            res.send('terms updated');
            return;
          }
        });
      }
      else{
        Terms.create(newTerms, (err, term) => {
          if(err)
          {
            console.log(err);
            res.send('terms not created');
          }
          else
          {
            res.send('terms created');
            return;
          }
        });
      }
    }
  })
  
}

//used to retreive the terms of service for the requirer
//By: Stephen Kamino
///Date: Mar 12 2022
module.exports.getTermsOfService = (req, res, next) => {
  let service = req.body.service;
  console.log(req.body.service);
  Terms.findOne({ service: service}, (err, term) => {
    if(err)
    {
      res.send('error finding terms')
    }
    else
    {
      console.log(term);
      res.send(term);
    }
  });
}

module.exports.getUserEmail = (req, res, next) => {
  User.findById({_id: req.body.id}, (err, user1) => {
    if(err)
    {
      console.log(err);
      res.send('no user found')
    }
    else
    {
      res.send(user1.email);
    }
  });
}