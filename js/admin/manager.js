


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
                        
                        $('.shop-container').append(`<tr><td>${item.id}</td><td class="shop-name-searching">${item.name}</td><td>${item.price}</td><td>${item.image}</td><td>${res}</td></tr>`);
                    }
                });
            }
        }
    });
}

function onDOMLoaded(){
  
    if(sessionStorage.getItem("token")!=null){

       $('#manager-search-bar').change(function (e) { 
        e.preventDefault();
        console.log( $('#manager-search-bar').val());
        
        for(let item of $('.shop-name-searching')){
           
            console.log( item.replace('td',''));//.text().includes($('#manager-search-bar').val()));
        }
       });

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
            if($('#manager-category-id').val()==null){
                return;
            }

            $.ajax({
                type: "POST",
                url: `https://localhost:7020/api/Category/Delete?id=${$('#manager-category-id').val()}`,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                },
                success: function (response) {
                    alert('категория успешно удалена');
                    update();
                }
            });
         });

         $('#manager-add-category').click(function (e) { 
            e.preventDefault();
            if($('#manager-category-name').val()==null || $('#manager-category-image').val()==null){
                return;
            }

            $.ajax({
                type: "POST",
                url: `https://localhost:7020/api/Category/Insert?name=${$('#manager-category-name').val()}&image=${$('#manager-category-image').val()}`,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                },
                success: function (response) {
                    alert('категория успешно добавлена');
                    update();
                }
            });
         });


         $('#manager-add-shop').click(function (e) { 
            e.preventDefault();
            if($('#manager-shop-name').val()==null || $('#manager-shop-cost').val()==null|| $('#manager-shop-image').val()==null|| $('#manager-shop-category').val()==null){
                return;
            }

            $.ajax({
                type: "POST",
                url: `https://localhost:7020/api/Shop/Insert?name=${$('#manager-shop-name').val()}&image=${ $('#manager-shop-image').val()}&price=${$('#manager-shop-cost').val()}&categoryId=${$('#manager-shop-category').val()}`,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                },
                success: function (response) {
                    alert('Товар успешно добавлен');
                    update();
                }
            });
           
         });

         $('#manager-remove-shop').click(function (e) { 
            e.preventDefault();
            if($('#manager-shop-id').val()==null){
                return;
            }

            $.ajax({
                type: "POST",
                url: `https://localhost:7020/api/Shop/Delete?id=${$('#manager-shop-id').val()}`,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                },
                success: function (response) {
                    alert('Товар успешно удален');
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
