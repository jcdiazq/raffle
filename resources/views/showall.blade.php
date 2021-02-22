<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Show All Numbers Registered</title>
</head>
<body>
    <table border="1">
    <thead>
    <tr><th>Número</th><th>Nombre</th><th>Teléfono</th><th>Fecha</th></tr>
    </thead>
    <tbody>
    @foreach ($dataNumbers as $rowNumber)
    <tr><th>{{$rowNumber->number}}</th><th>{{$rowNumber->name}}</th><th>{{$rowNumber->number_phone}}</th><th>{{$rowNumber->created_at}}</th>
    @endforeach
    </tbody>
    </table>
</body>
</html>