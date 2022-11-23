$('#logout').click((e)=>{
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('name', '');
    window.location.href=`index.html`;
})
