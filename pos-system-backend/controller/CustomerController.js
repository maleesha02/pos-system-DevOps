const CustomerSchema = require('../model/CustomerSchema');

const createCustomer = async (req, resp) => {
    try {
        const {name, address, salary, contact} = req.body;
        const createdCustomer = new CustomerSchema({
            name, address, salary, contact
        });
        await createdCustomer.save();
        resp.status(201).json({message: 'Customer Saved...'});

    } catch (e) {
        console.log(e)
        resp.status(500).json({'message': 'Error', error: e});
    }

};
const updateCustomer = async (req, resp) => {
    try {
        const {name, address, salary, contact} = req.body;
        const updatedData = await CustomerSchema.findByIdAndUpdate({_id: req.params.id},
            {name: name, address: address, salary: salary, contact: contact}, {new: true});

        if (!updatedData) return resp.status(500).json({'message': 'Try Again'});
        resp.status(201).json({message: 'Customer Updated...'});

    } catch (e) {
        resp.status(500).json({'message': 'Error', error: e});
    }
};
const deleteCustomer = async (req, resp) => {
    try {
        const updatedData = await CustomerSchema.findByIdAndDelete({_id: req.params.id});

        if (!updatedData) return resp.status(500).json({'message': 'Try Again'});
        resp.status(204).json({message: 'Customer Deleted...'});

    } catch (e) {
        resp.status(500).json({'message': 'Error', error: e});
    }
};
const findCustomerById = async (req, resp) => {
    try {
        const selectedCustomer = await CustomerSchema.findOne({_id: req.params.id});

        if (!selectedCustomer) return resp.status(404).json({'message': 'Not Found'});
        console.log(req.params.id)
        resp.status(200).json({message: 'Customer Data', data:selectedCustomer});

    } catch (e) {
        console.log(e)
        resp.status(500).json({'message': 'Error', error: e});
    }
};
const loadAllCustomers = async (req, resp) => {
    try {
        const customers = await CustomerSchema.find();
        resp.status(200).json({message: 'Customer Data', dataList:customers});

    } catch (e) {
        resp.status(500).json({'message': 'Error', error: e});
    }
};

module.exports = {createCustomer, updateCustomer, deleteCustomer, findCustomerById, loadAllCustomers};