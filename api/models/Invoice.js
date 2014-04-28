/**
* Invoice.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    total_amount: 'float',
    name: 'string',
    address: 'text',
    owner: {
      required: false,
      model: 'user',
    },
    tasks: {
      required: false,
      collection: 'task',
      //references: 'task',
      via: 'invoice',
      //dominant: true
    }
  },
};

