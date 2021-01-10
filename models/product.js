const bookshelf= require('../config/bookshelf');

const Product = bookshelf.Model.extend({
   tableName: 'products'
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

   }).save();
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
   );
}