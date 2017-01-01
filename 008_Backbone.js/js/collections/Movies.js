MovieApp.Collections.Movies = Backbone.Collection.extend({

     initialize: function(options){
        if (options.title)
            this.title = options.title;
    },

    url: function()
    {
        return "http://www.omdbapi.com/?s="+this.title;
    },

    parse: function(response)
    {
        return response.Search;
    }

}); 