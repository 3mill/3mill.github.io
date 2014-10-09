<?php
	
	$name = trim($_POST['name']);
	$email = $_POST['email'];
	$comments = $_POST['comments'];
	
	$site_owners_email = 'your-email@address.com'; // Replace this with your own email address
	$site_owners_name = 'My Name'; // replace with your name
	
	if (strlen($name) < 2) {
		$error['name'] = "Enter your name";	
	}
	
	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
		$error['email'] = "Enter a valid email";	
	}
	
	if (strlen($comments) < 3) {
		$error['comments'] = "Leave a comment";
	}
	
	if (!$error) {
		
		require_once('phpMailer/class.phpmailer.php');
		$mail = new PHPMailer();
		
		$mail->From = $email;
		$mail->FromName = $name;
		$mail->Subject = "Website Contact Form";
		$mail->AddAddress($site_owners_email, $site_owners_name);
		$mail->Body = $comments;
		
		// GMAIL STUFF
		
		/* $mail->Mailer = "smtp";
		$mail->Host = "smtp.gmail.com";
		$mail->Port = 587;
		$mail->SMTPSecure = "tls"; 
		
		$mail->SMTPAuth = true; // turn on SMTP authentication
		$mail->Username = "username@gmail.com"; // SMTP username
		$mail->Password = "password"; // SMTP password */
		
		$mail->Send();
	
		
		echo "<p class='success'> Message sent </p>";
		
	} # end if no error
	else {

		$response = (isset($error['name'])) ? "<p id='error1'>" . $error['name'] . " \n" : null;
		$response .= (isset($error['email'])) ? "<p id='error2'>" . $error['email'] . "</p> \n" : null;
		$response .= (isset($error['comments'])) ? "<p id='error3'>" . $error['comments'] . "</p>" : null;
		
		echo $response;
	} # end if there was an error sending

?>