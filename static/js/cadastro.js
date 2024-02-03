$(document).ready(async function(){
    console.log("pronto")
    const path = "/api/users"
    const message = document.getElementById("error")
    document.getElementById("cadastrar").addEventListener("click", async function(){
        message.classList.value = "alert alert-danger alert-dismissible d-none"
        if (document.getElementById("password").value == document.getElementById("password2").value){
            const new_user = {
                email: document.getElementById("email").value,
                name: document.getElementById("name").value,
                password: document.getElementById("password").value
            }
            const data = JSON.stringify(new_user)
            await save(data);
        } else {
            message.innerText = "Senhas não coincidem!"
            message.classList.remove("d-none")
        }


    })


    async function save(data){

        const response = await fetch(`${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        if (!response.ok) {
            message.classList.remove("d-none")
        } else {
            const body_response = await response.json();
            console.log(body_response)
            sessionStorage.setItem("token", body_response.token)
            sessionStorage.setItem("name", body_response.name)
            location.href = "/?page=1"
        }

    }


})