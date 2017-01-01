var MovieApp = {

    Views: {},
    Models: {},
    Collections: {},
    Router: {}
}

$(document).ready(function(){
    // Add some code here
    MovieApp.Router.Instance = new MovieApp.Router();   
    Backbone.history.start();

})