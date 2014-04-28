var app = app || {};

(function (app) {

  app.invoice = new Ractive({
    el: '.invheader-lower',
    template: JST['assets/templates/invheader-lower.html'](),
    data: {

      invoice: new app.Invoice, // наша Backbone модель
      // хэлпер используется в шаблоне {{ date(createdAt) }}
      date: function (date) {
        return moment(date).format('D MMMM YYYY');
      },

      // хэлпер дв шаблоне {{ lastFour(id) }}
      lastFour: function (str) {
          return str.slice(-4);
      }
    },
    adaptors: [ 'Backbone' ],
    transitions: {
      select: function ( t ) {
        setTimeout( function () {
          t.node.select();
          t.complete();
        }, 200 );
      }
    }
  });

  app.invoice.on({
    // Обрабатываем нажатие на кнопку редактирования
    // в шаблоне `on-click="edit"`
    edit: function (event) {
      console.log(event);
      var editing = this.get('editing');
      this.set( 'editing', !editing );
      if (editing) {
        this.data.invoice.save({owner: app.user.data.id});
      }
    },

    // Показываем или скрываем кнопку для редактирования данных
    // в шаблоне `on-hover="toggleBtn"`
    toggleBtn: function (event) {
      if ( event.hover ) {
        $(event.node).find('[role=button]').removeClass('hide');
      } else {
        $(event.node).find('[role=button]').addClass('hide');
      }
    }
  });

  // сразу сохраняем инвойс на сервер
  app.invoice.data.invoice.save();

})(app);
