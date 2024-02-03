$(document).ready(async function(){
    console.log("pronto")
    const path = "/api/login"
    const message = document.getElementById("error")
    document.getElementById("entrar").addEventListener("click", async function(){
        const credentials = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        const data = JSON.stringify(credentials)
        await login(data);
    })


    async function login(data){

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