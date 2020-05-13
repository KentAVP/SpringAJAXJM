function myFunction() {
    $.ajax({
        url: '/admin/auth',
        type: "GET",
        dataType: 'html',
        success: function(data) {
            var user = data.toString();
            document.getElementById("user").innerHTML = user;
        }
    });
    $.ajax({
        url: '/admin/authRole',
        type: "GET",
        dataType: 'html',
        success: function(data) {
            var role = data.toString();
            document.getElementById("role").innerHTML = role;
        }
    });
};
$(document).ready(function() {
    $.getJSON('http://localhost:8080/admin/list', function(json) {
        var tr=[];
        for (var i = 0; i < json.length; i++) {
            tr.push('<tr>');
            tr.push('<td>' + json[i].id + '</td>');
            tr.push('<td>' + json[i].name + '</td>');
            tr.push('<td>' + json[i].age + '</td>');
            tr.push('<td>' + json[i].username + '</td>');
            tr.push('<td>' + "*****" + '</td>');
            tr.push('<td>' + json[i].roles[0].name + '</td>');
            tr.push('<td><button class= \'edit btn btn-success\'>Edit</button>&nbsp;&nbsp;<button class=\'delete btn btn-danger\' id=' + json[i].id + '>Delete</button></td>');
            tr.push('</tr>');
        }
        $('table').append($(tr.join('')));
    });

    $(document).delegate('#addNew', 'click', function(event) {
        event.preventDefault();

        var name = $('#name').val();
        var age = $('#age').val();
        var username = $('#username').val();
        var password = $('#password').val();

        var a = Number(age);
        if($.trim(name) == "" || $.trim(age) == "" || $.trim(username) == "" || $.trim(password) == ""){
            var empty = true;
            alert("Input is empty!");
            $('#addNew').get(0).reset();
        }
        if(password.includes("*")){
            var empty = true;
            alert("Пароль не должен содержать звездочки!");
            $('#save').get(0).reset();
        }
        if(!Number.isInteger(a)){
            var empty = true;
            alert("Возраст не является числом");
            $('#addNew').get(0).reset();
        }

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:8080/admin/save",
            data: JSON.stringify({'name': name, 'age' : age, 'username' : username, 'password':password}),
            cache: false,
            success: function(result) {
                $("#msg").html( "<div class=\"mx-auto\" style=\"width: 300px;\">" +
                    "            <div class=\"modal-dialog\" role=\"document\">\n" +
                    "                <div class=\"modal-content\">\n" +
                    "                    <div class=\"modal-header\">\n" +
                    "                        <h5 class=\"modal-title\">Успех</h5>\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
                    "                            <span aria-hidden=\"true\">&times;</span>\n" +
                    "                        </button>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"modal-body\">\n" +
                    "                    Пользователь успешно добавлен!\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>" +
                    "</div>" );
                window.setTimeout(function(){location.reload()},1000)
            },
            error: function(err) {
                $("#msg").html(  "<div class=\"mx-auto\" style=\"width: 300px;\">" +
                    "            <div class=\"modal-dialog\" role=\"document\">\n" +
                    "                <div class=\"modal-content\">\n" +
                    "                    <div class=\"modal-header\">\n" +
                    "                        <h5 class=\"modal-title\">Ошибка</h5>\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
                    "                            <span aria-hidden=\"true\">&times;</span>\n" +
                    "                        </button>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"modal-body\">\n" +
                    "                    Произошла ошибка! Попробуйте снова\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>" +
                    "</div>"  );
            }
        });
    });

    $(document).delegate('.delete', 'click', function() {
        if (confirm('Do you really want to delete record?')) {
            var id = $(this).attr('id');
            var parent = $(this).parent().parent();
            $.ajax({
                type: "DELETE",
                url: "http://localhost:8080/admin/delete/" + id,
                cache: false,
                success: function() {
                    parent.fadeOut('slow', function() {
                        $(this).remove();
                    });
                    location.reload(true)
                },
                error: function() {
                    $('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
                        $(this).remove();
                    });
                }
            });
        }
    });

    $(document).delegate('.edit', 'click', function() {
        var parent = $(this).parent().parent();

        var id = parent.children("td:nth-child(1)");
        var name = parent.children("td:nth-child(2)");
        var age = parent.children("td:nth-child(3)");
        var username = parent.children("td:nth-child(4)");
        var password = parent.children("td:nth-child(5)");
        var buttons = parent.children("td:nth-child(7)");

        name.html("<input type='text' id='txtName' value='" + name.html() + "'/>");
        age.html("<input type='text' id='txtAge' value='" + age.html() + "'/>");
        username.html("<input type='text' id='txtUsername' value='" + username.html() + "'/>");
        password.html("<input type='text' id='txtPassword' value='" + password.html() + "'/>");
        buttons.html("<button class='btn btn-info' id='save'>Save</button>&nbsp;&nbsp;<button class='delete btn btn-danger' id='" + id.html() + "'>Delete</button>");
    });

    $(document).delegate('#save', 'click', function() {
        var parent = $(this).parent().parent();

        var id = parent.children("td:nth-child(1)");
        var name = parent.children("td:nth-child(2)");
        var age = parent.children("td:nth-child(3)");
        var username = parent.children("td:nth-child(4)");
        var password = parent.children("td:nth-child(5)");
        var buttons = parent.children("td:nth-child(7)");


        var a = name.children("input[type=text]").val();
        var b = age.children("input[type=text]").val();
        var c = username.children("input[type=text]").val();
        var d = password.children("input[type=text]").val();
        var z = Number(b);
        if($.trim(a) == "" || $.trim(b) == "" || $.trim(c) == "" || $.trim(d) == ""){
            var empty = true;
            alert("Input is empty!");
            $('#save').get(0).reset();
        }
        if(d.includes("*")){
            var empty = true;
            alert("Пароль не должен содержать звездочки!");
            $('#save').get(0).reset();
        }
        if(!Number.isInteger(z)){
            var empty = true;
            alert("Возраст не является числом");
            $('#save').get(0).reset();
        }


        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:8080/admin/save",
            data: JSON.stringify({'id' : id.html(), 'name' : name.children("input[type=text]").val(), 'age' : age.children("input[type=text]").val(), 'username' : username.children("input[type=text]").val(), 'password' : password.children("input[type=text]").val()}),
            cache: false,
            success: function() {
                name.html(name.children("input[type=text]").val());
                age.html(age.children("input[type=text]").val());
                username.html(username.children("input[type=text]").val());
                password.html(password.children("input[type=text]").val());
                buttons.html("<button class='edit btn btn-success' id='" + id.html() + "'>Edit</button>&nbsp;&nbsp;<button class='delete btn btn-danger' id='" + id.html() + "'>Delete</button>");
            },
            error: function() {
                $('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error updating record').fadeIn().fadeOut(4000, function() {
                    $(this).remove();
                });
            }
        });
    });

});