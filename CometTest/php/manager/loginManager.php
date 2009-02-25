<?php
  set_include_path("c:/wamp/www/CometChat/build/classes" . PATH_SEPARATOR . get_include_path());
  require_once 'propel/Propel.php';
  Propel::init("c:/wamp/www/CometChat/build/conf/CometChat-conf.php");

  require_once('FirePHPCore/FirePHP.class.php');
  include_once 'CometChat/User.php';
	
  ob_start();
  $firephp = FirePHP::getInstance(true);
  
  // On récupéte l'adresse mail
  $userEmail = isset($_GET['userEmail']) ? $_GET['userEmail'] : '';
  $firephp->log($userEmail, 'user email');

  //On vérifie que c'est une adresse mail valide 
  // TODO
  // si oui 
  //On vérifie qu'elle n'existe pas déjà en bdd
  // TODO
  // sinon 
  // On crée le user 
  
  $user = new User();
  $user->setUserEmail($userEmail);
  $user->save();
  
  // return a json array
  $response = array();
  $response['userId']=$user->getUserId();
  echo json_encode($response);

?>