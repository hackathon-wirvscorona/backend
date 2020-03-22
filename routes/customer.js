const router = require('express').Router();
const Customer = require('../models/Customer');
const Adress = require('../models/Address');
const verify = require('./verifyToken');
const {registerValidationCustomer} = require('../validation');
var {register} = require('./auth');


/** 
 * Returns all customers
*/

router.get('/customers', verify, async(req, res, next) => {
    var customers = await Customer.findAll();
    res.status(200).json(customers);
});

/**
 * Creates a new Customer
 */

router.post('/create', async(req, res) => {
    const validation = registerValidationCustomer(req.body);
    if(validation.error) {
       return res.status(400).send(validation.error);
    }
    console.log(req.body.password);
    register(req.body.password)
    .catch(err => {res.status(500).send(err)})
    .then(auth => {
        console.log(auth);
        Adress.create(req.body.adress)
        .catch(err => {res.status(500).send(err)})
        .then(adress => {
            Customer.create({
                email: req.body.email,
                name: req.body.name,
                authorizationFk: auth.id,
                adressFk: adress.id
            })
            .catch(err => {res.status(500).send(err)})
            .then(customer => {res.status(200).send(customer)});
        })
    });
});



/**
 * Returns all information about a customer
*/
router.get('/:id', verify, async(req, res) => {
    var customer_id = req.params.id;
    var customer = await Customer.findOne({
        where: {
            id : customer_id
        }
    });
    if (customer == null){
        res.status(404);
    }

    res.status(200).send(JSON.stringify(customer));
})


/**
 * Change Customer Information
 */
router.post('/:id', verify, async(req, res) =>{
    var customer_id = req.params.id;
    var customer = await Customer.findOne({
        where: {
            id: customer_id
        }
    });
    if (customer == null){
        res.status(404);
    }

    await Customer.update({email: req.body.email},  {
        where: {
            id: customer_id
        }
    });

    res.status(200).send("Account was successfully updated.");

});

/**
 * Deletes a customer
 */
router.delete('/:id', verify, async(req, res) => {
    var customer_id = req.params.id;

    await Customer.destroy({
        where: {
            id: customer_id
        }
    }).then(function(customerDeleted){
            res.status(200)
    }).catch(function(err){
            res.status(400)
    });
});



module.exports = router;
