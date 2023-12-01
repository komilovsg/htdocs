<?php

$login = filter_var(trim($_POST['login']),
FILTER_SANITIZE_STRING);
$name = filter_var(trim($_POST['name']),
FILTER_SANITIZE_STRING);
$pass = filter_var(trim($_POST['pass']),
FILTER_SANITIZE_STRING);

//trim - позволяет удалить лишные пробелы из строки
//filter_var - позволяет отфильтровать значение и удалить из него различные символы.
//FILTER_SANITIZE_STRING - 

if(mb_strlen($login) < 5 || mb_strlen($login) > 90) {
    echo "
    Invalid login length";
    exit();
} else if(mb_strlen($name) < 3 || mb_strlen($name) > 50) {
    echo "
    Invalid name length";
    exit();
} else if(mb_strlen($pass) < 2 || mb_strlen($pass) > 10) {
    echo "
    Invalid password length (from 2 to 10)";
    exit();
}

//  $mysql = new mysqli('sql116.your-server.de','fdu_test','Shakhron123!','fdu_test')
 $mysql = new mysqli('localhost','root','root','register-bd');
 $mysql->query('INSERT INTO `users` (id, login, pass, name) VALUES($login, $pass, $name)');


 $mysql->close();
?>