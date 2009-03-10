// JavaScript Document

    var timestamp= 0;
    var url= './php/backend.php';
    var noerror= true;
    var firstTimeStamp= 0;
    var ajax;
    
    
    function disconnect ()
    {
      log.info("> disconnect()");
    }
    
    function handleResponse(response)
    {
      log.info("> handleResponse(response)");
      log.info("> 	>response['msg'] = " + response['msg']);
	  log.info("> 	>response['senderId'] = " + response['senderId']);
      log.info("> 	>response['timestamp'] = " + response['timestamp']);
      var time = response['timestamp']-firstTimeStamp;
	  var senderId=response['senderId'];
      //on ajoute le texte dans l'aire de Chat 
	  $('#chatAerea').append('<div> ['+senderId+']'  + response['msg'] + '</div>');

	  //on efface la zone de saisie
	  log.info("> 	>$('#userId')[0].value = " + $("#userId")[0].value);
	  if($("#userId")[0].value == senderId)
		  $("#word")[0].value = "";	 
      //document.getElementById("content").innerHTML += '<div> ['+time+']'  + response['msg'] + '</div>';
    }
    
    function doRequest(id,request)
    {
      log.info("> doRequest(request)");
	  log.info("> 	>id ="+ id);
      log.info("> 	>request ="+ request);
      $.ajax({
        url: url,
        dataType : "json",
        data: { 'senderId' : id , 
				'msg' : request 
		}
      }); 
      
    }
 
    function connect(){
        log.info("> connect()");
        ajax = $.ajax({
        url: url,
        dataType : "json",
        data: { 'timestamp' : timestamp },
        success: function(response) {
          log.info("> connect()>success");
          // handle the server response
          log.debug(">	>response = " + response);
          log.debug(">	>response['msg'] = " + response['msg']);
          log.debug(">	>response['timestamp'] = " + response['timestamp']);
          timestamp = response['timestamp'];
          if(firstTimeStamp == 0){
            firstTimeStamp = response['timestamp'];
          }
          handleResponse(response);
          noerror = true;
        },
        complete: function(transport) {
          log.info("> connect()>complete");
          // send a new ajax request when this request is finished
          if (!noerror)
            // if a connection problem occurs, try to reconnect each 5 seconds
            setTimeout(function(){ connect() }, 5000); 
          else
            connect();
          noerror = false;
        }
      });
	}
