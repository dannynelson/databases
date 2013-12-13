window.ChatsView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('received', this.render.bind(this));
  },

  className: 'page',

  render: function(){
    var allChatViews = this.collection.map(function(eachChat){
      return new ChatView({model: eachChat}).render();
    });
    this.$el.html(allChatViews);
    $('.container').append(this.$el);
    return this.el;
  }

});