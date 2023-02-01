
let count = 2;
let page = 1;
let categoryId = 1;

function updateTable(){


    $('.pagination-container').empty();

    $.ajax({
        type: "GET",
        url: `https://localhost:7020/api/Shop/GetPages?count=${count}&categoryId=${categoryId}`,
        success: function (response) {
            console.log(response);
            
            $('.pagination-container').append(`<li class="page-item disabled"><p class="page-link"> Previous</p></span></li>`);
            for(let i=0;i<response;i++){
                
                // ужас конечно но пока работает всё окей
                let classToAdd = '';
                if(i==0){
                    classToAdd = 'active';
                }
                //

                $('.pagination-container').append(`<li class="page-item ${classToAdd}"><p class="page-link">${i+1}</p></li>`);
            }
            $('.pagination-container').append(`<li class="page-item"><p class="page-link">Next</p></li>`);
        }
    });

   
    $('.shop-container').empty();
    $.ajax({
        type: "GET",
        url: `https://localhost:7020/api/Shop/GetByPage?page=${page}&count=${count}&categoryId=${categoryId}`,
        success: function (response) {
            //shop-container
            for(let shopitem of response ){
                
                let item = `<div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                <div class="product-img position-relative overflow-hidden">
                    <img class="img-fluid w-100" src="${shopitem.image}" alt="">
                    <div class="product-action">
                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                    <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                    </div></div>
                    <div class="text-center py-4">
                    <a class="h6 text-decoration-none text-truncate" href="">${shopitem.name}</a>
                    <div class="d-flex align-items-center justify-content-center mt-2">
                    <h5>$${shopitem.price}</h5><h6 class="text-muted ml-2"><del>$${shopitem.price+5}</del></h6>
                    </div></div></div></div>`
                    $('.shop-container').append(item);
            }
        }
    });
}

function onDOMLoaded(){


    updateTable();
   
    $.ajax({
        type: "GET",
        url: "https://localhost:7020/api/Category/Get",
        success: function (response) {
            for(let item of response){
                $.ajax({
                    type: "GET",
                    url: `https://localhost:7020/api/Category/GetCategoryCount?id=${item.id}`,
                    success: function (response) {
                        let category = `<div id="${item.id}" class="col-lg-3 col-md-4 col-sm-6 pb-1 category-block"><div class="cat-item d-flex align-items-center mb-4"><div class="overflow-hidden" style="width: 100px; height: 100px;">
                        <img class="img-fluid" src="${item.image}" alt=""></div>
                        <div class="flex-fill pl-3"><h6>${item.name}</h6><small class="text-body">${response} продуктов</small></div></div></div>`;
                        $('#category-container').append(category);
                    
                        $('.category-block').off();
                        $('.category-block').click(function (e) { 
                            e.preventDefault();
                            categoryId=$(this).attr('id');
                            updateTable();
                        });
                    }
                });
            }
           

        }
    });
    
    
}
document.addEventListener('DOMContentLoaded', onDOMLoaded);
