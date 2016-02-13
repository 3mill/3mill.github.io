<?php
// PHP Script Chat - http://www.marplo.net/

// AICI se creaza numele pt. camerele de chat (Maxim 30 caractere)
$chatrooms = ['English', 'Nature'];

//DATELE de conectare la baza de date mysql (server mysql, nume, parola, baza-date)
$mysql = [ 'host'=>'localhost', 'user'=>'root', 'pass'=>'password', 'bdname'=>'db_name' ];

define('STORAGE', 'file');  //UNDE sa salveze datele: 'mysql' sau 'file'
define('MAXROWS', 40);  // Numarul maxim de randuri in camera de chat
define('CHATLINK', 1);  // Permite link-uri in chat (1), nu permite link-uri (0)

//PAROLA folosita pt golire camera chat, dupa ce e accesat acest fisier, cu ?mod=admin in URL
define('CADMPASS', 'adminpass');
/* De exemplu, accesati in browser
    http://domain/chatfiles/setchat.php?mod=admin
*/

$c_subdir ='';  //Aici se poate seta sub-director (in "chattxt/") pt. fisiere chat

// Daca vreti ca doar utilizatorii autentificati sa adauge text in chat, setati 0 la CHATADD 
// Si setati $_SESSION['username'] cu cea folosita de scriptul de logare pt. retinere nume utilizator
define('CHATADD', 1);
if(!isset($_SESSION)) session_start();
if(CHATADD !== 1){
  if(isset($_SESSION['username'])) define('CHATUSER', $_SESSION['username']);
}

// Numele directorului in care sunt salvate fisierele text pt fiecare camera de chat
define('CHATDIR', 'chattxt/'. ($c_subdir == '' ? '' : $c_subdir .'/'));

// creaza sub-director, daca e definit si nu exista
if($c_subdir != '' && !file_exists(CHATDIR)) mkdir(CHATDIR, 0755);

include('texts.php');  // fisierul cu textele pt. diferite limbi
$lsite = $ro_site;  //preia textele din anumita limba ($en_site pt. Engleza, $ro_site pt. Romana)

if(!headers_sent()) header('Content-type: text/html; charset=utf-8');  // header pt. utf-8

// include clasa ChatSimple, si creaza obiect al ei
include('class.ChatSimple.php');
$obc = new ChatSimple($chatrooms);

// daca fisierul e accesat cu mod=admin in URL, apeleaza metpda emptyChatRooms()
if(isset($_GET['mod']) && $_GET['mod'] == 'admin') $obc->emptyChatRooms();