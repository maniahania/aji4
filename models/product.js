const bookshelf = require('../config/bookshelf')
const Checkit = require('checkit');
const e = require('express');
const { check } = require('checkit');

var validationRules = new Checkit({
   name: [
      {
         'rule': 'required',
         'message': 'Product name is required!'
      }
   ],
   description: [
      {
         'rule': 'required',
         'message': 'Product description is required!'
      }
   ],
   unitPrice: [
      {
         'rule': 'required',
         'message': 'Product price is required!'
      },
      {
         'rule': 'greaterThan:0',
         'message': 'Product price has to be greater than zero!'
      }
   ],
   unitWeight: [
      {
         'rule': 'required',
         'message': 'Product weight is required!'
      },
      {
         'rule': 'greaterThan:0',
         'message': 'Product weight has to be greater than zero!'
      }
   ],
   categoryId: [
      {
         'rule': 'required',
         'message': 'Product category is required!'
      }
   ]
});

const Product = bookshelf.Model.extend({
   tableName: 'products',
   idAttribute: 'id',
   initialize: function () {
      this.on('saving', this.validateSave)
   },
   validateSave: function () {
      return validationRules.run(this.attributes)
   }
})

module.exports.getAll = () => {
   return Product.fetchAll({ require: false })
}

module.exports.getById = (id) => {
   let el = new Product({ 'id': id }).fetch({ require: false })
}

module.exports.create = (product) => {
   let created = new Product({
      name: product.name,
      description: product.description,
      unitPrice: product.unitPrice,
      unitWeight: product.unitWeight,
      categoryId: product.categoryId

   }).save().catch(Checkit.Error, function (message) {
      console.log(message.toString())
      return null
   })
   return created
};

module.exports.update = (id, product) => {
   let created = new Product({
      id: id
   }).save({
      name: product.name,
      description: product.description,
      unitPrice: product.unitPrice,
      unitWeight: product.unitWeight,
      categoryId: product.categoryId
   },
      { patch: true }
   ).catch(Checkit.Error, function (message) {
      console.log(message.toString())
      return null
   });
   return created
}
