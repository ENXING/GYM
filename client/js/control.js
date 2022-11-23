let present = $('#inputdata')
$('#history_data').click(e=>{
    checkedLogin();
    if(!event.detail || event.detail == 1){
        present.hide()
        present = $('#history_form')
        var p1 = new Promise(printHistory);
        p1.then((e)=>present.show(), (e)=>alert(e))
    }
});
$('#record').click(e=>{
    checkedLogin();
    present.hide()
    present = $('#inputdata')
    present.show()
});

$('#graph').click(e => {
    checkedLogin();
    if(!event.detail || event.detail == 1){
        present.hide()
        present = $('#graph_form')
        showGraph(new Date('2022-11-1'));
        present.show()
    }
});


var canvas = document.getElementById("myChart");
var dragging = false;
var lastX;
var marginLeft = 0;

canvas.addEventListener('mousedown', function(e) {
    var evt = e || event;
    dragging = true;
    lastX = evt.clientX;
    e.preventDefault();
}, false);

window.addEventListener('mousemove', function(e) {
    var evt = e || event;
    if (dragging) {
        var delta = evt.clientX - lastX;
        lastX = evt.clientX;
        marginLeft += delta;
        canvas.style.marginLeft = marginLeft + "px";
    }
    e.preventDefault();
}, false);

window.addEventListener('mouseup', function() {
    dragging = false;
}, false);