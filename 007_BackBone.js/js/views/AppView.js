    // renders the full list of todo items calling TodoView for each one.
    app.AppView = Backbone.View.extend({
      el: '#todoapp',
      initialize: function () {
        this.input = this.$('#new-todo');
        app.todoList.on('add', this.addAll, this);
        app.todoList.on('reset', this.addAll, this);
        app.todoList.fetch(); // Loads list from local storage
      },
      events: {
        'click #add-btn': 'btnAddClick',
      },
      btnAddClick: function(e){
        app.todoList.create(
            {
              title: this.input.val().trim(),
              completed: false
            }
        );
        this.input.val(''); // clean input box
      },
      addOne: function(todo){
        var view = new app.TodoView({model: todo});
        $('#todo-list').append(view.render().el);
      },
      addAll: function(){
        this.$('#todo-list').html(''); // clean the todo list
        app.todoList.each(this.addOne, this);
      }
    });
