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

         $.ajax({
            type: "GET",
            url: "https://localhost:7020/api/admin/Admin/GetUsersByRole?role=Admin",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            success: function (response) {

                $('.admin-container').empty();
                for(let item of response){

                  
                    $('.admin-container').append(`<tr><td>${item.userName}</td><td>${item.email}</td><td><label class="badge badge-danger font-weight-bold">Admin</label></td></tr>`);
                }
            }
         });

         $.ajax({
            type: "GET",
            url: "https://localhost:7020/api/admin/Admin/GetUsersByRole?role=Manager",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            success: function (response) {

                $('.manager-container').empty();
                for(let item of response){

                   
                    $('.manager-container').append(`<tr><td>${item.userName}</td><td>${item.email}</td><td><label class="badge badge-warning font-weight-bold">Manager</label></td></tr>`);
                }
            }
         });


         $('#admin-add-role').click(function (e) { 
            e.preventDefault();
           
            if($('#admin-username').val()==null|| $('#admin-role').val()==null){
                return;
            }

            $.ajax({
                type: "POST",
                url: `https://localhost:7020/api/Auth/SetRole/setAdmin?username=${$('#admin-username').val()}&role=${$('#admin-role').val()}`,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                },
                success: function (response) {
                    alert("Роль успешно добавлена")
                }
            });
         });

         $('#admin-remove-role').click(function (e) { 
            e.preventDefault();
            
            if($('#admin-username').val()==null|| $('#admin-role').val()==null){
                return;
            }

            $.ajax({
                type: "POST",
                url: `https://localhost:7020/api/admin/Admin/RemoveRole/removeAdmin?username=${$('#admin-username').val()}&role=${$('#admin-role').val()}`,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                },
                success: function (response) {
                    alert("Роль успешно удалена")
                }
            });
         });
    }else{
        window.location = '../index.html';
    }
}
document.addEventListener('DOMContentLoaded', onDOMLoaded);
