$.ajaxSetup({
    // headers: { 'custom-header': 'some value' }
});
$("#login_btn").click(function (e) {
    e.preventDefault();
    let email = $("#login_email").val();
    let password=$("#login_password").val();

    let url = sessionStorage.getItem('url');

    function json2url(obj) {
        var ret = ''; 
        for (let key in obj) {
            ret += key + '=' + obj[key] + '&'
        }
        return ret.slice(0, -1);
    }
    $.ajax({
        url: `${url}/login`,
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        data: json2url({
            "email": email,
            "password": password 
        }),
        success: e => {
            console.log(e)
            sessionStorage.setItem("name", e.name); 
            sessionStorage.setItem("token", e.token); 
            window.location.href=`user.html`;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert(`Status: ${textStatus}, Erro: ${errorThrown}`)
        },   
        type: 'post'
    })

})

console.log(window.location.href)
console.log(sessionStorage.getItem("favoriteMovie"))