$(document).ready(async function(){
    const name = sessionStorage.getItem("name")
    const prefix = "/api"
    document.getElementById("btn-sair").addEventListener("click", async function (){
        sessionStorage.clear()
        location.href = "/";
    })

    if (name){
        document.getElementById("navbarDropdown").innerText = name
        document.getElementById("btn-sair").classList.remove("d-none")
        document.getElementById("btn-entrar").classList.add("d-none")
        document.getElementById("btn-criar-conta").classList.add("d-none")
    } else {
        document.getElementById("btn-sair").classList.add("d-none")
        document.getElementById("btn-entrar").classList.remove("d-none")
        document.getElementById("btn-criar-conta").classList.remove("d-none")
    }


    function getCookie(k) {
        var cookies = " " + document.cookie;
        var key = " " + k + "=";
        var start = cookies.indexOf(key);

        if (start === -1) return null;

        var pos = start + key.length;
        var last = cookies.indexOf(";", pos);

        if (last !== -1) return cookies.substring(pos, last);

        return cookies.substring(pos);
    }

    async function paginator(){
        const response = await fetch(`${prefix}/pages/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            alert("erro")
        }
        const total_sequence = await response.json()
        let searchParams = new URLSearchParams(window.location.search)
        if (searchParams.has('page')) {
            // await getTratamento(searchParams.get('id'))
            let page = Number(searchParams.get('page'));
            let select_sequence = total_sequence.find(s => {
                return s.start <= page && page <= s.end;
            })

            const pagination = document.getElementById("pagination")
            pagination.innerHTML = page > 5 ? `<li class=\"page-item\"><a class=\"page-link text-black\" aria-label=\"Previous\" href=\"?page=${select_sequence.start-1}\"><span aria-hidden=\"true\">«</span></a></li>` : "";
            for(let i = select_sequence.start ; i <= select_sequence.end ; i++){
                if (i < select_sequence.end){
                    pagination.innerHTML += `<li class="page-item"><a id="page-${i}" class="page-link text-black" href="?page=${i}">${i}</a></li>`

                } else {
                    pagination.innerHTML += `<li class="page-item"><a id="page-${i}" class="page-link text-black" href="?page=${i}">${i}</a></li>`

                    if ((i+1) < total_sequence.length){
                        pagination.innerHTML += `<li class=\"page-item\"><a class=\"page-link text-black\" aria-label=\"Next\" href=\"?page=${i+1}\"><span aria-hidden=\"true\">»</span></a></li>`
                    }
                }
            }
            const current_page = document.getElementById(`page-${page}`);
            current_page.classList.remove("text-black")
            current_page.classList.add("text-white")
            current_page.classList.add("bg-dark")

        } else {
            location.href = "/?page=1"
        }


    }

    await paginator()
})