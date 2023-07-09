module.exports = app => {

  const products = require("../controllers/product.controller.js");

 

  var router = require("express").Router();

 

  // Create a new Product

  router.post("/", products.create);
  const product = new Products({

    name: req.body.name,

      description: req.body.description,

      price: req.body.price,

      category: req.body.category,

      published: req.body.published ? req.body.published : false

  });

 

  // Retrieve all Products

  router.get("/", products.findAll);
  exports.findAll = (req, res) => {
    const name = req.query.name;

    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
   
  
    Products.find(condition)
  
      .then(data => {
  
        res.send(data);
  
      })
  
      .catch(err => {
  
        res.status(500).send({
  
          message:
  
            err.message || "Some error occurred while retrieving products."
  
        });
  
      });

 

  };

 

  // Retrieve all published Products

  router.get("/published", products.findAllPublished);
  const id = req.params.id;

 

  Products.findById(id)

    .then(data => {

      if (!data)

        res.status(404).send({ message: "Not found Product with id " + id });

      else res.send(data);

    })

    .catch(err => {

      res

        .status(500)

        .send({ message: "Error retrieving Product with id=" + id });

    });

 

  // Retrieve a single Product with id

  router.get("/:id", products.findOne);
  exports.findOne = (req, res) => {

 

  };

 

  // Update a Product with id

  router.put("/:id", products.update);
  exports.update = (req, res) => {
    if (!req.body) {

      return res.status(400).send({
  
        message: "Data to update can not be empty!"
  
      });
  
    }
  
   
  
    const id = req.params.id;
  
   
  
    Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  
      .then(data => {
  
        if (!data) {
  
          res.status(404).send({
  
            message: `Cannot update Product with id=${id}. Maybe Product was not found!`
  
          });
  
        } else res.send({ message: "Product was updated successfully." });
  
      })
  
      .catch(err => {
  
        res.status(500).send({
  
          message: "Error updating Product with id=" + id
  
        });
  
      });

 

  };

 

  // Delete a Product with id

  router.delete("/:id", products.delete);
  exports.delete = (req, res) => {
    const id = req.params.id;

 

  Products.findByIdAndRemove(id)

    .then(data => {

      if (!data) {

        res.status(404).send({

          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`

        });

      } else {

        res.send({

          message: "Product was deleted successfully!"

        });

      }

    })

    .catch(err => {

      res.status(500).send({

        message: "Could not delete Product with id=" + id

      });

    });

 

  };

 

  // Delete all Products

  router.delete("/", products.deleteAll);
  exports.deleteAll = (req, res) => {
    Products.deleteMany({})

    .then(data => {

      res.send({

        message: `${data.deletedCount} Products were deleted successfully!`

      });

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while removing all products."

      });

    });

 

 

  };

// Retrieve all Products from the database with Kw

exports.findAll = (req, res) => {

  const name = req.query.name;

 var condition = name ? { name: { $regex: new RegExp(name), $options: "kw" } } : {};



 Products.find(condition)

   .then(data => {

     res.send(data);

   })

   .catch(err => {

     res.status(500).send({

       message:

         err.message || "Some error occurred while retrieving products."

     });

   });



};
 

  app.use('/api/products', router);

};