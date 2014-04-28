var app = app || {};

(function (app) {
  app.tasks = new Ractive({
    el: '.invbody-tasks',
    template: JST['assets/templates/invbody-tasks.html'](),
    data: {
      tasks: new app.Tasks, // наша Backbone модель

      // хэлпер используется в шаблоне {{ format(price) }}
      format: function ( num ) {
        return num.toFixed( 2 );
      },

      // хэлпер используется в шаблоне {{ total(tasks) }}
      total: function ( collection ) {
        var total = collection.reduce(function( sum, el ) {
          return el.get('rate') * el.get('hours') + sum;
        }, 0 );
        return total.toFixed( 2 );
      },
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

  app.tasks.on({

    // Обрабатываем нажатие на кнопку создания таска
    // в шаблоне `on-click="add"`
    add: function ( event ) {
      var tasks = this.get('tasks');
      var task = new app.Task({
        name: 'Без названия',
        description: 'Описания нет',
        hours: 0,
        rate: 0,
      });
      tasks.add(task);
      task.save(null, {
        // хак, чтобы привязать новый созданный таск к текущему инвойсу
        success: function() {
          task.set('invoice', app.invoice.data.invoice.id);
          task.save();
        }
      });
    },

    // удаляем таск с сервера тоже
    // в шаблоне `on-tap="destroy:{{this}}"`
    destroy: function ( event, task ) {
      task.destroy();
    },

    // показываем инпут для редактирования свойств таска
    // в шаблоне `on-click="edit"`
    edit: function ( event ) {
      $(event.node).hide();
      $(event.node).next().removeClass('hide').focus().select();
    },

    // сохраняем такс после изменения какого-либо поля
    // в шаблоне `on-blur-enter="hide"`
    hide: function ( event, task ) {
      $(event.node).addClass('hide');
      $(event.node).prev().show();
      task.save({invoice: app.invoice.data.invoice.id});
    },
  });

  // подписываемся на изменения параметров `hours` и `rate` для тасков
  // чтобы пересчитивать сумму
  // сумму также меняем у инвойса
  // TODO нужно сохранять инвойс после изменения суммы
  app.tasks.observe('tasks.*.hours tasks.*.rate', function(tasks, old, keypath){
    var total = this.data.total(this.data.tasks);
    app.invoice.data.invoice.set('total_amount', total);
  });

})(app);
