
let debug= true;
let count = 9;
let page = 1;
let categoryId = 1;
let maxPage = 1;
let minCost = -1;
let maxCost = -1;

function checkForPagination() {
    if (page != 1) {
        $('.page-prev').removeClass('disabled');
    }
    if (page == 1) {
        $('.page-prev').addClass('disabled');
    }

    if (page != maxPage) {
        $('.page-next').removeClass('disabled');
    }
    if (page == maxPage) {
        $('.page-next').addClass('disabled');
    }
}

function updateTable() {

    console.log(`page = ${page}`);
    console.log(`maxPage = ${maxPage}`);
    console.log(`categoryId = ${categoryId}`);
    console.log(`minCost = ${minCost}`);
    console.log(`maxCost = ${maxCost}`);
    console.log(`count = ${count}`);

    $('.pagination-container').empty();

    $.ajax({
        type: "GET",
        url: `https://localhost:7020/api/Shop/GetPages?count=${count}&categoryId=${categoryId}&minCost=${minCost}&maxCost=${maxCost}`,
        success: function (response) {


            $('.pagination-container').append(`<li class="page-item page-prev"><p class="page-link">Previous</p></span></li>`);
            for (let i = 0; i < response; i++) {
                maxPage = response;
                // ужас конечно но пока работает всё окей
                let classToAdd = '';
                if (i + 1 == page) {
                    classToAdd = 'active';
                }
                //

                $('.pagination-container').append(`<li class="page-item ${classToAdd}"><p class="page-link">${i + 1}</p></li>`);
            }
            $('.pagination-container').append(`<li class="page-item page-next"><p class="page-link">Next</p></li>`);
            checkForPagination();
            $('.page-item').click(function (e) {
                e.preventDefault();

                let pageId = $(this).text();
                if (pageId === 'Next') {
                    if (page < maxPage) {
                        page++;
                    }

                    checkForPagination();
                    updateTable();
                    return;
                }
                if (pageId === 'Previous') {
                    if (page > 1) {
                        page--;
                    }

                    checkForPagination();
                    updateTable();
                    return;
                }


                page = pageId;
                checkForPagination();
                updateTable();
            });
        }
    });


  

   

    $('.shop-container').empty();
    $.ajax({
        type: "GET",
        url: `https://localhost:7020/api/Shop/GetByPage?page=${page}&count=${count}&categoryId=${categoryId}&minCost=${minCost}&maxCost=${maxCost}`,
        success: function (response) {
            //shop-container
            for (let shopitem of response) {

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
                    <h5>$${shopitem.price}</h5><h6 class="text-muted ml-2"><del>$${shopitem.price + 5}</del></h6>
                    </div></div></div></div>`
                $('.shop-container').append(item);
            }
        }
    });
}

function onDOMLoaded() {

    $('.dropdown-item').click(function (e) {
        e.preventDefault();
        count = $(this).text();
        updateTable();
    });
    updateTable();


    $('#max-cost-bar, #min-cost-bar').change(function (e) {
      


        if ($('#min-cost-bar').val() === '') {
            minCost = -1;
        } else {

            //  Границы инпута
            if ($('#min-cost-bar').val() < 0) {
                $('#min-cost-bar').val(0);
            }
            if ($('#min-cost-bar').val() > 100000) {
                $('#min-cost-bar').val(100000);
            }
            //


            if ($('#max-cost-bar').val() !== '' && $('#max-cost-bar').val()!=-1) {
                if ($('#min-cost-bar').val() > $('#max-cost-bar').val()) {
                    $('#min-cost-bar').val($('#max-cost-bar').val());
                }
            }
            minCost = $('#min-cost-bar').val();
        }
        if ($('#max-cost-bar').val() === '') {
            maxCost = -1;
        } else {

            //  Границы инпута
            if ($('#max-cost-bar').val() > 100000) {
                $('#max-cost-bar').val(100000);
            }
            if ($('#max-cost-bar').val() < 0) {
                $('#max-cost-bar').val(0);
            }
            //


            if ($('#min-cost-bar').val() !== '') {
                if ($('#max-cost-bar').val() < $('#min-cost-bar').val()) {
                    $('#max-cost-bar').val($('#min-cost-bar').val());
                }
            }
            maxCost = $('#max-cost-bar').val();
        }
        updateTable();
    });
    $.ajax({
        type: "GET",
        url: "https://localhost:7020/api/Category/Get",
        success: function (response) {
            for (let item of response) {
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
                            categoryId = $(this).attr('id');
                            updateTable();
                        });
                    }
                });
            }


        }
    });


}
document.addEventListener('DOMContentLoaded', onDOMLoaded);
