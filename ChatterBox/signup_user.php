<?php
include("include/connection.php");
if (isset($_POST['sign_up'])) {
    $name = htmlentities(mysqli_real_escape_string($con, $_POST['user_name']));
    $pass = htmlentities(mysqli_real_escape_string($con, $_POST['user_pass']));
    $email = htmlentities(mysqli_real_escape_string($con, $_POST['user_email']));
    $country = htmlentities(mysqli_real_escape_string($con, $_POST['user_country']));
    $gender = htmlentities(mysqli_real_escape_string($con, $_POST['user_gender']));
    $rand = rand(1,2);

    if($name == ''){
        echo "<script>alert('We cannot verify you name')</script>";
    }
    if(strlen($pass)<8){
        echo "<script>alert('Password should be minimum 8 characters!')</script>";
        exit();
    }

    $check_email = "select * from users where user_email='$email'";
    $run_email = mysqli_query($con, $check_email);
    $check = mysqli_num_rows($run_email);
    if($check == 1){
        echo "<script>alert('Email already exists, please try again!')</script>";
        echo "<script>window.open('signup.php', '_self')</script>";
        exit();
    }

    if ($rand == 1) {
        $profile_pic = "images/codingcafe1.png";
    }
    else if ($rand == 2) {
        $profile_pic = "images/codingcafe2.png";
    }

    $insert = "insert into users (user_name, user_pass, user_email, user_profile, user_country, user_gender) values ('$name', '$pass', '$email', '$profile_pic', '$country', '$gender')";
    $query = mysqli_query($con, $insert);

    if($query){
        echo "<script>alert('Congratulations $name! Your account has been created successfully')</script>";
        echo "<script>window.open('signin.php', '_self')</script>";
    }else{
        echo "<script>alert('Registration failed! Please try again')</script>"; 
        echo "<script>window.open('signup.php', '_self')</script>";
    }
}
?>