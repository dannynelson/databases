window.Chats = Backbone.Collection.extend({
  
  url: '/',

  initialize: function(){
    _.bindAll(this, 'getFromServer', 'dataReceived');
    this.getFromServer();
    this.on('chat:sent', this.getFromServer);
  },

  getFromServer: function(){
    this.fetch({success: this.dataReceived});
  },

  dataReceived: function(data){
    this.trigger('received');
  }

});