window.Chat = Backbone.Model.extend({

  defaults: {
    username: null,
    text: null
  },

  initialize: function (message){
    if (message){
      if (message.roomname) this.set('roomname', message.roomname + ', all');
      else this.set('roomname', 'all');
    }
  },

  sendChat: function(){
    var self = this;
    $.ajax({
      url: '/',
      type: 'POST',
      data: JSON.stringify(this),
      contentType: 'application/json',
      success: function(){
        console.log('chatterbox: Message sent');
        self.trigger('chat:sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  }
});