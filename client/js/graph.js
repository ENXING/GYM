// function showGraph() {
//     const xhr = new XMLHttpRequest();
//     // xhr.open('GET', 'http://localhost:10201/jsonp-server?');
//     xhr.open('GET', 'http://' + ip + ':10201/jsonp-server?');
//     xhr.send()
//     xhr.onreadystatechange = function(){
//         if(xhr.readyState === 4){
//             if(xhr.status >= 200 && xhr.status < 300){
//                 let data = JSON.parse(xhr.response);
//                 let x = []
//                 for (let i = 0; i < data.length; ++i) {
//                     x.push(i);
//                 }
//                 TESTER = document.getElementById('tester');
//                 Plotly.newPlot(TESTER, [{
//                     'x': x,
//                     'y': data 
//                 }], {
//                     margin: { t: 0 }
//                 });
//             }
//         }
//     }
// };

const labels = [
    'January'
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [45],
    }, 
    {
      label: 'My second dataset',
      backgroundColor: 'rgb(0, 99, 132)',
      borderColor: 'rgb(0, 99, 132)',
      data: [5],
    }
  ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

