let present = $('#inputdata')
$('#history_data').click(e=>{
    if(!event.detail || event.detail == 1){
        present.hide()
        present = $('#history_form')
        var p1 = new Promise(getHistory);
        p1.then((e)=>present.show(), (e)=>alert(e))
    }
});
$('#record').click(e=>{
    present.hide()
    present = $('#inputdata')
    present.show()
});

$('#graph').click(e => {
    if(!event.detail || event.detail == 1){
        present.hide()
        present = $('#graph_form')
        // showGraph();
        present.show()
    }
});

var ip = '43.226.26.53'
// var ip = 'localhost'