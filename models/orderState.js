const bookshelf= require('../config/bookshelf');

const State = bookshelf.Model.extend({
   tableName: 'orderstates'
})

module.exports.getAll = () => {
   return State.fetchAll();
}