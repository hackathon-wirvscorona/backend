const router = require('express').Router();
const Customer = require('../models/Customer');
const Company = require('../models/Company');
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

    //Checking if the user is already in the database
    let emailExist = await Customer.findOne({where: {email: req.body.email}})
    if(emailExist) return res.status(400).send({err: 'Email already exists'});
    //Checking if the user is already in the database
    emailExist = await Company.findOne({where: {email: req.body.email}})
    if(emailExist) return res.status(400).send({err: 'Email already exists'});

    register(req.body.password)
    .catch(err => {res.status(500).send(err)})
    .then(auth => {        
        Adress.create(req.body.adress)
        .catch(err => {res.status(500).send(err)})
        .then(address => {
            Customer.create({
                email: req.body.email,
                name: req.body.name,
                authorizationFk: auth.id,
                addressFk: address.id
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
