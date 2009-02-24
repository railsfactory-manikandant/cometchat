// JavaScript Document
  function Comet(){
  
    this.timestamp= 0;
    this.url= './backend.php';
    this.noerror= true;
    this.firstTimeStamp= 0;
    //this.ajax;
    
    this.disconnect = function()
    {
    }
    
    this.handleResponse = function(response)
    {
      var time = response['timestamp']-this.firstTimeStamp;
      $('content').innerHTML += '<div> ['+time+']'  + response['msg'] + '</div>';
    }
    
    this.doRequest = function(request)
    {
      new Ajax.Request(this.url, {
        method: 'get',
        parameters: { 'msg' : request }});
    }
 
    this.connect = function()
    {
    
      this.ajax = $.ajax({
        url: this.url,
        dataType : "json",
        data: { 'timestamp' : this.timestamp },
        success: function(response) {
          // handle the server response
          alert("response ->" + response['msg']);
          this.timestamp = response['timestamp'];
          if(this.firstTimeStamp == 0){
            this.firstTimeStamp = response['timestamp'];
          }
          //this.handleResponse(response);
          var time = response['timestamp']-this.firstTimeStamp;
          $('content').innerHTML += '<div> ['+time+']'  + response['msg'] + '</div>';
          this.noerror = true;
        },
        complete: function(transport) {
          // send a new ajax request when this request is finished
          if (!this.noerror)
            // if a connection problem occurs, try to reconnect each 5 seconds
            setTimeout(function(){ comet.connect() }, 5000); 
          else
            this.connect();
          this.noerror = false;
        }
      });
      
      this.ajax.comet = this;
    }
  }
  
 /* Comet.prototype = {
 
    timestamp: 0,
    url: './backend.php',
    noerror: true,
    firstTimeStamp: 0,
 
    initialize: function() { },
    
    disconnect: function()
    {
    },
 
    handleResponse : function(response)
    {
      var time = response['timestamp']-this.firstTimeStamp;
      $('content').innerHTML += '<div> ['+time+']'  + response['msg'] + '</div>';
    },
 
    doRequest : function(request)
    {
      new Ajax.Request(this.url, {
        method: 'get',
        parameters: { 'msg' : request }});
    },
 
    connect : function()
    {
      *//*this.ajax = new Ajax.Request(this.url, {
        method: 'get',
        parameters: { 'timestamp' : this.timestamp },
        onSuccess: function(transport) {
          // handle the server response
          var response = transport.responseText.evalJSON();
          this.comet.timestamp = response['timestamp'];
          if(this.comet.firstTimeStamp == 0){
            this.comet.firstTimeStamp = response['timestamp'];
          }
          this.comet.handleResponse(response);
          this.comet.noerror = true;
        },
        onComplete: function(transport) {
          // send a new ajax request when this request is finished
          if (!this.comet.noerror)
            // if a connection problem occurs, try to reconnect each 5 seconds
            setTimeout(function(){ comet.connect() }, 5000); 
          else
            this.comet.connect();
          this.comet.noerror = false;
        }
      });*//*
      
      this.ajax = $.ajax({
        url: this.url,
        dataType : "json",
        data: { 'timestamp' : this.timestamp },
        success: function(response) {
          // handle the server response
          alert("response ->" + response['msg']);
          this.timestamp = response['timestamp'];
          if(this.firstTimeStamp == 0){
            this.firstTimeStamp = response['timestamp'];
          }
          this.handleResponse(response);
          this.noerror = true;
        },
        complete: function(transport) {
          // send a new ajax request when this request is finished
          if (!this.noerror)
            // if a connection problem occurs, try to reconnect each 5 seconds
            setTimeout(function(){ comet.connect() }, 5000); 
          else
            this.connect();
          this.noerror = false;
        }
      });
      
      this.ajax.comet = this;
    },
 
    
  }*/
