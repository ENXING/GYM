$('#submit').click(function(e){
    e.preventDefault();
    let workout_name = $('#workout_name :selected').text()
    if (!confirm('Confirm ' + workout_name + '?')) return;
    const xhr = new XMLHttpRequest();
    let url = protocol +'://' + ip + '/api/put-workout'
    xhr.open('POST', url, true);
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    let pounds =$('#pounds').val()
    let repeat = $('#repeat').val()
    console.log(typeof pounds)
    if (!(!isNaN(pounds) && Number(pounds) > 0 && !isNaN(repeat) && Number(repeat) > 0 && Number.isInteger(Number(repeat)))) {
        alert("Wrong input")
        return
    }
    // xhr.send('a=100&b=200&c=300');
    // xhr.send(JSON.stringify({"pounds": pounds, "repeat": repeat}))
    var obj = {"exercise": workout_name, "weight": pounds, "repeat": repeat};

    function json2url(obj) {
        var ret = ''; 
        for (let key in obj) {
            ret += key + '=' + obj[key] + '&'
        }
        return ret.slice(0, -1);
    }
    xhr.send(json2url(obj))
    console.log("Send:> " + json2url(obj))
    xhr.onerror = function (e) {
        alert(" ERROR FETCHING " + url);
    };
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300){
                let data = JSON.parse(xhr.response);
                console.log(data);
                // alert(JSON.stringify(data));
            }
        }
    }
})