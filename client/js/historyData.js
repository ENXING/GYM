
$('#exercieseTable').delegate('a', 'click', clickDelete)
const token = sessionStorage.getItem("token");
function clickDelete() {
    var $tr = $(this).parent().parent()
    var name = $tr.children(':first').html()
    if (confirm('Confirm ' + name + '?')) {
        let id = $(this).parent().siblings('th').text();
        $.post(
            {
                url: `${url}/del-item`,
                headers: {'Content-type': 'application/x-www-form-urlencoded'},
                data: json2url({
                    "token": token,
                    'id': id
                }),
                success: e => {
                    $tr.remove()
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert(`Status: ${textStatus}, Erro: ${errorThrown}`)
                }
            }
        )
    }
    return false
}

function getAll(resovle, reject) {
    $.post(
        {
            url: `${url}/get-history`,
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            data: json2url({
                "token": token
            }),
            success: e => {
                let data = JSON.parse(e);
                resovle(data)
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert(`Status: ${textStatus}, Erro: ${errorThrown}`)
                reject(errorThrown)
            }
        }
    )
}

function printHistory(resovle, reject) {
    $('#exercieseTable>tbody').children().remove()
    let p = new Promise(getAll)
    p.then((data)=>{
        for (let i = data.length - 1; i > -1; --i) {
            if (data[i] === null) break;
            var $insertIten = $('<tr></tr>')
                .append('<th scope="row">' + data[i]._id + '</th>')
                .append('<td>' + data[i].exercise.name + '</td>')
                .append('<td>' + data[i].repeat + '</td>')
                .append('<td>' + data[i].weight + '</td>')
                .append('<td>' + (new Date(data[i].created)) + '</td>')
                .append('<td><a >Delete</a></td>')
                .appendTo('#exercieseTable>tbody')
            console.log(new Date(data[i].created))
        }
        resovle("200 ok")
    })
}