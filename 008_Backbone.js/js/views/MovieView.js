MovieApp.Views.MovieView = Backbone.View.extend({

    tagName: 'li',

    initialize: function(options) {

        if (options.model)
            this.model = options.model;
    },

    render: function() {

        this.$el.html(this.model.attributes.Title+" ("+this.model.attributes.Year+")");

        return this;
    }

});