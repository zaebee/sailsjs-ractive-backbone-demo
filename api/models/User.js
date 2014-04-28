/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: 'string',
    email: 'string',
    avatar: 'string',
    address: 'text',
    account: 'text',
    invoices: {
      collection: 'invoice',
      via: 'owner',
    }
  },
  beforeCreate: function (values, cb) {
    delete values.editable;
    cb();
  }
};

