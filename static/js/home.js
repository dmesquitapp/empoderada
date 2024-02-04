$(document).ready(async function(){
    const name = sessionStorage.getItem("name")
    const prefix = "/api"
    document.getElementById("btn-sair").addEventListener("click", async function (){
        sessionStorage.clear()
        location.href = "/";
    })

    const cart = JSON.parse(sessionStorage.getItem("cart") || "[]")
    if (!sessionStorage.getItem("cart")) {
        sessionStorage.setItem('cart', "[]")
    }
    document.getElementById("cart_quantity").innerText = cart.length


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

    async function paginator(){
        const response = await fetch(`${prefix}/pages/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            alert("erro") //TODO: EXIBIR MENSAGEM DE ERRO CORRETAMENTE
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
                    pagination.innerHTML += `<li class="page-item"><a id="page-${i}" class="page-link ${page == i ? 'text-white bg-dark' : 'text-black'}" href="?page=${i}">${i}</a></li>`
                } else {
                    pagination.innerHTML += `<li class="page-item"><a id="page-${i}" class="page-link ${page == i ? 'text-white bg-dark' : 'text-black'}" href="?page=${i}">${i}</a></li>`
                    if ((i+1) < total_sequence.length){
                        pagination.innerHTML += `<li class=\"page-item\"><a class=\"page-link text-black\" aria-label=\"Next\" href=\"?page=${i+1}\"><span aria-hidden=\"true\">»</span></a></li>`
                    }
                }
            }

            await list_products(page);
        } else {
            location.href = "/?page=1"
        }
    }
    await paginator();

    async function list_products(page){
        const response = await fetch(`${prefix}/products/${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            alert("erro") //TODO: EXIBIR MENSAGEM DE ERRO CORRETAMENTE
        } else {

            const products = await response.json();
            console.log(products)
            const list_products = document.getElementById("list-products")
            products.forEach(p => {
                let column = document.createElement('div')
                column.classList.value = "col mb-5";
                let card = document.createElement('div')
                card.classList.value = "card h-100";
                let image = document.createElement('img')
                image.classList.value = "card-img-top"
                let body = document.createElement('div')
                body.classList.value = "card-body p-4";
                let text_center = document.createElement('div')
                text_center.classList.value = "text-center"
                let product_name = document.createElement('h5')
                product_name.classList.value = "fw-bolder"
                let product_sku = document.createElement('p')
                product_sku.classList.value = "card-subtitle";
                let product_price = document.createElement('span')
                let card_footer = document.createElement("div")
                card_footer.classList.value = "card-footer p-4 pt-0 border-top-0 bg-transparent";
                let footer_center = document.createElement("div");
                footer_center.classList.value = "text-center";
                let add_to_cart = document.createElement("a");
                add_to_cart.classList.value = "btn btn-outline-dark mt-auto";
                add_to_cart.innerText = "Por no carrinho";

                add_to_cart.addEventListener("click", async function(e){
                    e.preventDefault()
                    let cart = JSON.parse(sessionStorage.getItem("cart") || "[]")
                    cart.push(p)
                    sessionStorage.setItem("cart", JSON.stringify(cart))
                    document.getElementById("cart_quantity").innerText = cart.length
                })

                image.src = p.image_url;
                product_name.innerText = p.name;
                product_price.innerText = p.price;
                product_sku.innerText = p.sku;


                footer_center.appendChild(add_to_cart)
                card_footer.appendChild(footer_center)
                text_center.appendChild(product_name)
                text_center.appendChild(product_sku)
                text_center.appendChild(product_price)
                body.appendChild(text_center)
                card.appendChild(image)
                card.appendChild(body)
                card.appendChild(card_footer)
                column.appendChild(card)

                list_products.appendChild(column)
            })

        }
    }

})