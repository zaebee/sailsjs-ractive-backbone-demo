var app = app || {};

(function (app) {

  var backboneUser = new app.User;

  // Здесь мы создаем ractive компонент через Ractive.extend
  // вместо new Ractive({}), потому что у нас будет 2 однотипных блока
  var RactiveUser = Ractive.extend({
    transitions: {
      select: function ( t ) {
        setTimeout( function () {
          t.node.select();
          t.complete();
        }, 200 );
      }
    },
    init: function (options) {
      this.data = options.data;
      this.on({

        // Обрабатываем нажатие на кнопку редактирования
        // в шаблоне `on-click="edit"`
        edit: function (event) {
          var editing = this.get('editing');
          this.set( 'editing', !editing );
          if (editing) {
            this.data.save();
          }
        },

        // Сохраняем аватар после успешной загрузки картинки
        // на https://www.inkfilepicker.com
        // в шаблоне `onchange="app.user.fire('setAvatar', event)"`
        setAvatar: function (event) {
          if (event.fpfile) {
            var url = event.fpfile.url;
            this.set('avatar', url);
          } else {
            this.set('avatar', null);
          }
          this.data.save();
        },

        // Скрываем или показываем форму для загрузки аватара
        // в шаблоне `on-hover="togglePicker"`
        togglePicker: function (event) {
          if (!this.get('avatar')) return;
          if ( event.hover ) {
            $(event.node).find('.BoardCreateRep').removeClass('hide');
          } else {
            $(event.node).find('.BoardCreateRep').addClass('hide');
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
    }
  });

  // Создаем Ractive компонент сверху страницы
  // присоединяем к элементу с классом `.invheader-upper`
  app.user = new RactiveUser({
    el: '.invheader-upper',
    template: JST['assets/templates/invheader-upper.html'](),
    data: backboneUser,
    adaptors: [ 'Backbone' ],
  });

  // Создаем Ractive компонент снизу страницы
  // присоединяем к элементу с классом `.invheader-account`
  app.account = new RactiveUser({
    el: '.invbody-account',
    template: JST['assets/templates/invbody-account.html'](),
    data: backboneUser,
    adaptors: [ 'Backbone' ],
  });
  
  // Подписываемся на измениния Id юзера
  // если id изменилось (то есть юзера сохранили)
  // привязваем инвойс к этому пользователю
  app.user.observe('id', function(id){
    if (id && app.invoice) {
      app.invoice.data.invoice.set('owner', id);
      app.invoice.data.invoice.save();
    }
  });

})(app);
