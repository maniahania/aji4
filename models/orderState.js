const bookshelf= require('../config/bookshelf');

const State = bookshelf.Model.extend({
   tableName: 'orderstates',
   idAttribute: 'id'
})

module.exports.getAll = () => {
   return State.fetchAll();
}