const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN;
const geocoder = mbxGeocoding({
  accessToken: mapBoxToken,
});
const Organization = require("../models/Organization.model");

const { isAuthenticated } = require("../middleware/jwt.middleware"); // <== IMPORT

// PUT  /orgs/edit/:orgId" -  Updates a specific organization by id
router.put("/orgs/edit/:orgId", isAuthenticated, (req, res, next) => {
  const { orgId } = req.params;

  const {
    name,
    country,
    city,
    street,
    email,
    categories,
    mainIdiom,
    description,
    url,
  } = req.body;

  if (name === "" || city === "" || country === "" || email === "") {
    res.status(400).json({
      message: "Please provide organization's name, city,  country and email",
    });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    res.status(400).json({
      message: "Specified id is not valid",
    });
    return;
  }

  geocoder
    .forwardGeocode({
      query: street + " " + city + " " + country,
      limit: 1,
    })
    .send()
    .then((response) => {
      const geometry = response.body.features[0].geometry;

      Organization.findByIdAndUpdate(
        orgId,
        {
          name,
          country,
          city,
          street,
          email,
          categories,
          mainIdiom,
          description,
          url,
          creator: req.payload._id,
          geometry,
        },
        {
          new: true,
        }
      )
        .then((updatedOrg) => res.json(updatedOrg))
        .catch((error) => {
          console.log("Organization not updated", error);
          res.json(error);
        });
    })
    .catch((err) => {
      console.log("Geometry not created!", err);
      res.json(err);
    });
});

// DELETE  /orgs/delete/:orgId  -  Deletes a specific organization by id
router.delete("/orgs/delete/:orgId", isAuthenticated, (req, res, next) => {
  const { orgId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    res.status(400).json({
      message: "Specified id is not valid",
    });
    return;
  }

  Organization.findByIdAndRemove(orgId)
    .then(() =>
      res.json({
        message: `Project with ${orgId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

//  GET /api/orgs/:orgId -  Retrieves a specific organization by id
router.get("/orgs/:orgId", (req, res, next) => {
  const { orgId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    res.status(400).json({
      message: "Specified id is not valid",
    });
    return;
  }

  // Each Project document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Organization.findById(orgId)
    .populate("reviews")
    .populate({
      path: "reviews",
      populate: {
        path: "reviewer",
        select: "name",
      },
    })
    .then((org) => {
      res.status(200).json(org);
    })
    .catch((error) => res.json(error));
});

//  GET /api/orgs -  Retrieves all of the organizations
router.get("/orgs", (req, res, next) => {
  Organization.find()
    .populate("reviews")
    .then((allOrgs) => res.json(allOrgs))
    .catch((err) => res.json(err));
});

//  POST /api/orgs  -  Creates a new organization
router.post("/orgs", isAuthenticated, (req, res, next) => {
  const {
    name,
    country,
    city,
    street,
    email,
    categories,
    mainIdiom,
    description,
    url,
  } = req.body;

  if (name === "" || city === "" || country === "" || email === "") {
    res.status(400).json({
      message: "Please provide organization's name, city,  country and email",
    });
    return;
  }

  geocoder
    .forwardGeocode({
      query: street + " " + city + " " + country,
      limit: 1,
    })
    .send()
    .then((response) => {
      const geometry = response.body.features[0].geometry;

      Organization.create({
        name,
        country,
        city,
        street,
        email,
        categories,
        mainIdiom,
        description,
        url,
        creator: req.payload._id,
        geometry,
      })
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          console.log("Organization not created!", err);
          res.json(err);
        });
    })
    .catch((err) => {
      console.log("Geometry not created!", err);
      res.json(err);
    });
});

module.exports = router;
