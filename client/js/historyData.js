$('#exercieseTable').delegate('a', 'click', clickDelete)
function clickDelete() {
    var $tr = $(this).parent().parent()
    var name = $tr.children(':first').html()
    if (confirm('Confirm ' + name + '?')) {
        let id = $(this).parent().siblings('th').text();
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://' + ip + ':10201/del-item');
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


function getHistory(resovle, reject) {
    $('#exercieseTable>tbody').children().remove()
    const xhr = new XMLHttpRequest();
    // xhr.open('GET', 'http://43.226.26.53:10201/get-history');
    // xhr.open('GET', 'http://workoutreport.ga:10201/jsonp-history');
    xhr.open('GET', 'http://' + ip + ':10201/get-history');
    // xhr.open('GET', 'http://localhost:10201/get-history');
    xhr.send()
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300){
                let data = JSON.parse(xhr.response);
                for (let i = 0; i < data.length; ++i) {
                    var $insertIten = $('<tr></tr>')
                    .append('<th scope="row">' + data[i]._id+ '</th>')
                    .append('<td>' + data[i].exercise.name + '</td>')
                    .append('<td>' + data[i].repeat+ '</td>')
                    .append('<td>' + data[i].weight+ '</td>')
                    .append('<td>' + (new Date(data[i].created))+'</td>')
                    .append('<td><a >Delete</a></td>')
                    .appendTo('#exercieseTable>tbody')
                    console.log(new Date(data[i].created))
                }
                resovle("200 ok")
            }
        }
    } 
}