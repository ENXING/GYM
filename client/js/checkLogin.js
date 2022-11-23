function checkedLogin(){

    let url = sessionStorage.getItem('url')
    const token = sessionStorage.getItem("token");
    $.post(
        {
            url: `${url}/profile`,
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            data: json2url({
                "token": token
            }),
            success: e => {
                $('#user-page').css('display', 'block')
                sessionStorage.setItem('name', e)
                $('#user').text(e.toUpperCase())
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                window.location.href=`index.html`;
                alert(`Status: ${textStatus}, Erro: ${errorThrown}`)
            }
        }
    )
};
checkedLogin();