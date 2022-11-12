$('#graph').click(e=>{
    present.hide()
    present = $('#graph_form')
    const xhr = new XMLHttpRequest();
    // xhr.open('GET', 'http://localhost:10201/jsonp-server?');
    xhr.open('GET', 'http://' + ip + ':10201/jsonp-server?');
    xhr.send()
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300){
                let data = JSON.parse(xhr.response);
                let x = []
                for (let i = 0; i < data.length; ++i) {
                    x.push(i);
                }
                TESTER = document.getElementById('tester');
                Plotly.newPlot(TESTER, [{
                    'x': x,
                    'y': data 
                }], {
                    margin: { t: 0 }
                });
            }
        }
    }
    present.show()
});