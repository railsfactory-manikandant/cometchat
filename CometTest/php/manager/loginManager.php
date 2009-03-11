<?php
  //set_include_path("c:/wamp/www/CometChat/build/classes" . PATH_SEPARATOR . get_include_path());
  require_once 'propel/Propel.php';
  Propel::init("../../build/conf/CometChat-conf.php");

  require_once('FirePHPCore/FirePHP.class.php');
  include_once 'CometChat/User.php';
  
  ob_start();
  $firephp = FirePHP::getInstance(true);

/***
 * Définition des fonctions
 ***/

/*
 * checkUser
 */
 function checkUser($userEmail,$userPassword){
 	global $firephp;
	
 	$c = new Criteria();
	$c->add(UserPeer::USEREMAIL, $userEmail);
	
	$user = UserPeer::doSelect($c);
	$firephp->log($user , 'user');

	if(count($user)!=1) return false;
	else {
		$firephp->log($user[0]->getUserpwd() , 'password Bdd');
		$firephp->log($userPassword , 'password user');
		//controle du password
		if(!strcmp( $user[0]->getUserpwd(),$userPassword)){
			return $user[0]; //login ok le password est bon
		}	
		else return false; 
	} 

 } 

  // On récupére l'adresse mail et le password
  $userEmail = isset($_GET['userEmail']) ? $_GET['userEmail'] : '';
  $userPassword = isset($_GET['userPassword']) ? $_GET['userPassword'] : '';
  $firephp->log($userEmail, 'user email');
  $firephp->log($userPassword , 'user password');
  
  $response = array();
	
  //On vérifie que c'est une adresse mail valide 
  // TODO
  // si oui 
  //On vérifie qu'elle n'existe pas déjà en bdd
  // TODO
  $user = checkUser($userEmail, $userPassword);
  if ($user){
  	$firephp->log("User existant");
	$response['userId']=$user->getUserId();
  	$response['userEmail']=$user->getUserEmail();
  }
  else{
	$response['message']="Login impossible, ce couple email/password n'existe pas !";		
  	$firephp->log("le user n'existe pas");
  }
  // sinon 
  // On crée le user 
  
  //$user = new User();
  //$user->setUserEmail($userEmail);
  //$user->save();
  
  // return a json array
  echo json_encode($response);
  
  
 

?>