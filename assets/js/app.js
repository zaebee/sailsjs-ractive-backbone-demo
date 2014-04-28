var app = app || {};

(function (app) {

  app.User = Backbone.Model.extend({
    urlRoot: '/user',
  });
  
  app.Invoice = Backbone.Model.extend({
    urlRoot: '/invoice',
  });

  app.Task = Backbone.Model.extend({
    urlRoot: '/task',
  });

  app.Tasks = Backbone.Collection.extend({
    url: '/task',
    model: app.Task
  });
})(app);
