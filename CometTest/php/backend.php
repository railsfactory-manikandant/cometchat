 <?php
  require_once('FirePHPCore/FirePHP.class.php');
	
  ob_start();
  $firephp = FirePHP::getInstance(true);
 
 
  $filename  = dirname(__FILE__).'/data.txt';
  
  $firephp->log($filename, 'file name');
	
  // store new message in the file
  $msg = isset($_GET['msg']) ? $_GET['msg'] : '';
  $senderId = isset($_GET['senderId']) ? $_GET['senderId'] : '';

  $firephp->log($msg, 'message');
  $firephp->log($senderId, 'sender id'); 

  if ($msg != '')
  {
    file_put_contents($filename,$senderId . ":" . $msg);
    die();
  }
 
  // infinite loop until the data file is not modified
  $lastmodif    = isset($_GET['timestamp']) ? $_GET['timestamp'] : 0;
  $currentmodif = filemtime($filename);
  while ($currentmodif <= $lastmodif) // check if the data file has been modified
  {
    usleep(5000); // sleep 10ms to unload the CPU
    clearstatcache();
    $currentmodif = filemtime($filename);
  }
 
  $fileContent = split(":",file_get_contents($filename));
  $firephp->log($fileContent, 'file content'); 
  // return a json array
  $response = array();
  $response['msg']       =  $fileContent[1];
  $response['senderId'] = $fileContent[0];
  $response['timestamp'] = $currentmodif;
  $firephp->log($response, 'response'); 
  echo json_encode($response);
  flush();

?>