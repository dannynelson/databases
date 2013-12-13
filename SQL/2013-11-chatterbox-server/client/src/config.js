$.ajaxPrefilter( function(options, originalOptions, jqXHR){
      options.url = "http://localhost:8080" + options.url;
      // options.url = "https://api.parse.com/1/classes/chatterbox" + options.url;
      // jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
      // jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
    });