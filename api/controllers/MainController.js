/**
 * MainController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  /**
   * `MainController.generate`
   */

  generate: function (req, res) {
    return res.view();
  }
};
