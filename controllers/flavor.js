const Flavor = require("../models/flavor");

exports.getFlavorById = (req, res, next, id) => {
  Flavor.findById(id).exec((err, flav) => {
    if (err) {
      return res.status(400).json({
        error: "Flavor not found in DB",
      });
    }
    req.flavor = flav;
    next();
  });
};

exports.createFlavor = (req, res) => {
  const flavor = new Flavor(req.body);
  flavor.save((err, flavor) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save flavor in DB",
      });
    }
    res.json({ flavor });
  });
};

exports.getFlavor = (req, res) => {
  return res.json(req.flavor);
};

exports.getAllFlavor = (req, res) => {
  Flavor.find().exec((err, flavors) => {
    if (err) {
      return res.status(400).json({
        error: "NO flavors found",
      });
    }
    res.json(flavors);
  });
};

exports.updateFlavor = (req, res) => {
  const flavor = req.flavor;
  flavor.name = req.body.name;

  flavor.save((err, updatedFlavor) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update flavor",
      });
    }
    res.json(updatedFlavor);
  });
};

exports.removeFlavor = (req, res) => {
  const flavor = req.flavor;

  flavor.remove((err, flavor) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this flavor",
      });
    }
    res.json({
      message: "Successfull deleted",
    });
  });
};
