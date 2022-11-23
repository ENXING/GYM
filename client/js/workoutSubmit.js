$('#workoutSubmit').click(function(e){
    e.preventDefault();
    let workout_name = $('#workout_name :selected').text()
    if (!confirm('Confirm ' + workout_name + '?')) return;
    let pounds =$('#pounds').val();
    let repeat = $('#repeat').val();
    let obj = {"exercise": workout_name, "weight": pounds, "repeat": repeat, "token": token};
    $.post({
        url: `${url}/put-workout`,
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        data: json2url( obj ),
        success: e => {
            console.log(e);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert(`Status: ${textStatus}, Erro: ${errorThrown}`)
        }
    })
})