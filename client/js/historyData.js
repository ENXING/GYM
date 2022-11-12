$('#exercieseTable').delegate('a', 'click', clickDelete)
function clickDelete() {
    var $tr = $(this).parent().parent()
    var name = $tr.children(':first').html()
    if (confirm('确定删除' + name + '吗?')) {
        $tr.remove()
    }
    return false
}


function getHistory() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://43.226.26.53:10201/get_history');
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
            }
        }
    } 
}
{/* <tr>
<th scope="row">1</th>
<td>bench press</td>
<td>3</td>
<td>45</td>
<td>19/192/21</td>
<td><a >Delete</a></td>
</tr> */}

// $('#addEmpButton').click(function () {
//     var $empName = $('#empName')
//     var $email = $('#email')
//     var $salary = $('#salary')
//     var empName = $empName.val()
//     var email = $email.val()
//     var salary = $salary.val()

//     var $xxx = $('<tr></tr>')
//         .append('<td>' + empName + '</td>') 
//         .append('<td>' + email + '</td>')
//         .append('<td>' + salary + '</td>')
//         .append('<td><a href="deleteEmp?id="' + Date.now() + '>Delete</a></td>')
//         .appendTo('#exercieseTable>tbody')
//     $empName.val('')
//     $email.val('')
//     $salary.val('')
// })
