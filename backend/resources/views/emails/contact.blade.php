<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Messaggio form di contatto</title>
</head>
<body>
    <p>Nome: {{$details['name']}}</p>
    <p>Email: {{$details['email']}}</p>
    <p>Messaggio: {{$details['message']}}</p>
</body>
</html>