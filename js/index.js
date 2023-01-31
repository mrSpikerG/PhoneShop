function onDOMLoaded(){


   
    $.ajax({
        type: "GET",
        url: "https://localhost:7020/api/Category/Get",
        success: function (response) {
            for(let item of response){
                console.log(item);
                let category = `<div class="col-lg-3 col-md-4 col-sm-6 pb-1"><a class="text-decoration-none" href=""><div class="cat-item d-flex align-items-center mb-4"><div class="overflow-hidden" style="width: 100px; height: 100px;">
                <img class="img-fluid" src="img/cat.jpg" alt=""></div>
                <div class="flex-fill pl-3"><h6>${item.name}</h6><small class="text-body">100 Products</small></div></div></a></div>`;
                $('#category-container').append(category);
            }
        }
    });
    
    
}
document.addEventListener('DOMContentLoaded', onDOMLoaded);
