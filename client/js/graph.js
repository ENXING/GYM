
function showGraph(startDay) {
  let colors = [
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
  ]
  let now = Date.now()
  let p = new Promise(getAll)
  let labels_x = getDatesInRange(startDay, new Date())
  let data = {labels: labels_x, datasets: []}
  let name2color = {}
  let count = 0;
  let record = {}
  p.then((items)=>{
    for (let i = 0; i < items.length; ++i) {
      if (items[i] === null) continue;
      let name = items[i].exercise.name;
      let color = colors[count]
      if (name in name2color) {
        color = name2color[name]
      } else {
        name2color[name] = colors[count]; count++;
      }
      let date = new Date(items[i].created).toLocaleDateString("en-US");
      if (record[name] === undefined) record[name] = {}
      if (date in record[name]) {
        record[name][date].push({
          weight: items[i].weight,
          repeat: items[i].repeat
        })
      } else {
        record[name][new Date(items[i].created).toLocaleDateString("en-US")] = [{
          weight: items[i].weight,
          repeat: items[i].repeat
        }]

      }
      console.log(new Date(items[i].created))
    }
    for (let label in record) {
      let item = {label: label, backgroundColor: name2color[label], borderColor: name2color[label], data: Array(labels_x.length).fill()}
      for (let j = 0; j < labels_x.length; ++j) {
        let day = labels_x[j];
        if (day in record[label]) {
          if (item.data[j] === undefined) item.data[j] = 0;
          for (let k = 0; k < record[label][day].length; ++k)
            item.data[j] += record[label][day][k].weight * record[label][day][k].repeat;
        }
      }
      data.datasets.push(item);
    }
    console.log(data)
    const config = {
      type: 'line',
      data: data,
      options: {}
    };
    if (Window.myChart_ !== undefined) {
      Window.myChart_.destroy();
    }
    Window.myChart_ = new Chart( document.getElementById('myChart'), config);
  })
};


function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push((new Date(date)).toLocaleDateString("en-US"));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}


