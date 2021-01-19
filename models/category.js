const bookshelf = require('../config/bookshelf');

const Category = bookshelf.Model.extend({
   tableName: 'categories',
   idAttribute: 'id'
})

module.exports.getAll = () => {
   return Category.fetchAll();
}