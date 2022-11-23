$('#registerSubmit').click(function (e){
    var data;
    try {
        let phoneNumber = $('#phoneNumber').val();
        let email = $('#emailAddress').val();
        let name = $('#Name').val();
        let birthday = $("#datepicker").datepicker('getDate').toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
        let password = $('#password').val();
        let gender = $('input[name=inlineRadioOptions]:checked').val()
        data = {
            name, email, gender, birthday, password, phoneNumber
        }
        if ( !name || !email || !gender || !birthday || !password || !phoneNumber) throw "MISS INFO"
    } catch (e) {
        alert(e)
        return;
    }
    let url = sessionStorage.getItem('url');
    console.log(data)
    function json2url(obj) {
        var ret = '';
        for (let key in obj) {
            ret += key + '=' + obj[key] + '&'
        }
        return ret.slice(0, -1);
    }
    $.post({
        url: `${url}/register`,
        data:json2url(data),
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        success: e => {
            window.location.href = 'index.html'
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert(`Status: ${textStatus}, Erro: ${errorThrown}`)
        }    
    })
})