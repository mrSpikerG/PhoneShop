function onDOMLoaded(){
  
    if(sessionStorage.getItem("token")!=null){

       

         $.ajax({
            type: "POST",
            url: "https://localhost:7020/api/Auth/CheckManagerAccess/checkManagerAccess",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            success: function (response) {
                
            },
            error: function (error) {
                alert('Недостаточно прав.');
                window.location = '../index.html';
            }
         });

    }else{
        window.location = '../index.html';
    }
}
document.addEventListener('DOMContentLoaded', onDOMLoaded);
