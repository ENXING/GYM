$('#exercieseTable').delegate('a', 'click', clickDelete)
function clickDelete() {
    var $tr = $(this).parent().parent()
    var name = $tr.children(':first').html()
    if (confirm('Confirm ' + name + '?')) {
        let id = $(this).parent().siblings('th').text();
        const xhr = new XMLHttpRequest();
        xhr.open('POST', protocol +'://' + ip + '/api/del-item');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('id='+id)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    $tr.remove()
                }
            }
        }
        // console.log($(this).parent().siblings('th').text())
    }
    return false
}

function getAll(resovle, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', protocol+ '://' + ip + '/api/get-history');
    xhr.send()
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300){
                let data = JSON.parse(xhr.response);
                resovle(data)
            }
        }
    }
}

function printHistory(resovle, reject) {
    $('#exercieseTable>tbody').children().remove()
    let p = new Promise(getAll)
    p.then((data)=>{
        for (let i = data.length - 1; i > -1; --i) {
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