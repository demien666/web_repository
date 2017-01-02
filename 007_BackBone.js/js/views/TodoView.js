    // renders individual todo items list (li)
    app.TodoView = Backbone.View.extend({
      tagName: 'tr',
      template: _.template($('#item-template').html()),
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
        return this; // enable chained calls
      },
      initialize: function(){
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this); // remove: Convenience Backbone's function for removing the view from the DOM.
      },      
      events: {
        'click .save-btn' : 'close',
        'click .cancel-btn' : 'cancel',
        'click .toggle': 'toggleCompleted',
        'click .remove-btn': 'destroy',
        'click .edit-btn': 'edit'
      },
      edit: function(){
        this.$el.addClass('editing');
        this.input.focus();
      },
      cancel: function(){
        this.$el.removeClass('editing');
      },
      close: function(){
        var value = this.input.val().trim();
        if(value) {
          this.model.save({title: value});
        }
        this.$el.removeClass('editing');
      },
      toggleCompleted: function(){
        this.model.toggle();
      },
      destroy: function(){
        this.model.destroy();
      }      
    });
