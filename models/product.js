const bookshelf= require('../config/bookshelf');
const Checkit = require('checkit');

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
   initialize: function() {
      this.on('saving', this.validateSave);
   },
   validateSave: function() {
      return validationRules.run(this.attributes);
   }
})

module.exports.getAll = () => {
   return Product.fetchAll();
}

module.exports.getById = (id) => {
   return new Product({'id':id}).fetch();
}

module.exports.create = (product) => {
   return new Product({
       name: product.name,
       description: product.description,
       unitPrice: product.unitPrice,
       unitWeight: product.unitWeight,
       categoryId: product.categoryId

   }).save().then(function(validated){
         console.log(validated)
   }).catch(function(message) { 
         console.log(message);
   })
};

module.exports.update = (id,product) => {
   return new Product({
       id: id
   }).save({
       name: product.name,
       description: product.description,
       unitPrice: product.unitPrice,
       unitWeight: product.unitWeight,
       categoryId: product.categoryId
       }, 
       {patch: true}
   ).then(function(validated){
      console.log(validated)
   }).catch(function(message) { 
      console.log(message);
});
}