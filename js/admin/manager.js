


function update(){
    $.ajax({
        type: "GET",
        url: "https://localhost:7020/api/Category/Get",
        success: function (response) {
            $('.category-container').empty();
            for(let item of response){
                $('.category-container').append(`<tr><td>${item.id}</td><td>${item.name}</td><td>${item.image}</td></tr>`);
            }
        }
    });

    $.ajax({
        type: "GET",
        url: "https://localhost:7020/api/Shop/Get",
        success: function (response) {
            $('.shop-container').empty();
            for(let item of response){
                $.ajax({
                    type: "GET",
                    url: `https://localhost:7020/api/Shop/GetCategory?id=${item.id}`,
                    success: function (res) {
                        
                        $('.shop-container').append(`<tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td><td>${item.image}</td><td>${res}</td></tr>`);
                    }
                });
            }
        }
    });
}

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


         $('#manager-remove-category').click(function (e) { 
            e.preventDefault();
            if($('#manager-category-image').val()==null|| $('#manager-category-name').val()==null){
                return;
            }

            $.ajax({
                type: "POST",
                url: "https://localhost:7020/api/Category/Insert",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                },
                success: function (response) {
                    
                    
                    update();
                }
            });

         });

         update();

    }else{
        window.location = '../index.html';
    }
}
document.addEventListener('DOMContentLoaded', onDOMLoaded);
