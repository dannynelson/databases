window.ChatApp = Backbone.Model.extend({
  initialize: function(){
    var self = this;
    this.chats = new Chats({model: Chat});
    this.chatsView = new ChatsView({collection: this.chats});
    this.router = new Router();
    // router.on('route:index', function(){
    //   $('.container').append(chatsView.render());
    // });
    Backbone.history.start();
    $('.userInput').on('click', this.clearInput);
    $( ".userInput" ).keydown(function(event) {
      if (event.keyCode == 13) {
        self.setUsername();
      }
    });
  },

  sendAndReceive: function(){
    var msg = new Chat({username: this.username || "Anonymous", text:$('.chatInput').val()});
    msg.on('chat:sent', this.chats.getFromServer);
    msg.sendChat();
    $('.chatInput').val('');
  },

  clearInput: function(){
    $(this).val('');
  },

  setUsername: function(){
    var usernameVal = $('.userInput').val();
    if (usernameVal !== "Username" && usernameVal !== ""){
      this.username = usernameVal;
      $('.userInput').remove();
      $('.sendUsername').remove();
      var $userSpan = $('<span class="username"></span>');
      $userSpan.text(this.username);
      $('.inputs').prepend($userSpan);
      this.addMessageInputs();
    }
  },

  addMessageInputs: function (){
    var self = this;
    var $msgInput = $('<input type="text" class="chatInput" value="Message"></input>');
    $('.inputs').append($msgInput);
    $('.chatInput').focus();
    $('.chatInput').on('click', this.clearInput);
    $('.chatInput').keydown(function(event) {
      if (event.keyCode == 13) {
        self.sendAndReceive();
      }
    });
  }
});