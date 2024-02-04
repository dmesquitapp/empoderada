// Example starter JavaScript for disabling form submissions if there are invalid fields
$(document).ready(function () {
  'use strict'

  function getCart() {
    const cart = JSON.parse(sessionStorage.getItem("cart") || "[]")
    return cart;
  }

  if(!sessionStorage.getItem('token')) {
    alert("É Necessário criar uma conta para efetuar o pedido!!")
    location.href="/cadastro"
  }


  update_cart()
  let searchParams = new URLSearchParams(window.location.search)
  if (searchParams.has('remove')) {
    let index = Number(searchParams.get('remove')) - 1;
    remove_item(index)
    location.href = "/checkout"
  }

  function remove_item(index) {
    let cart = getCart();
    cart.splice(index, 1)

    sessionStorage.setItem("cart", JSON.stringify(cart));
    let line = document.getElementById(`line-${index}`)
    line.remove()
  }

  function update_cart(){
    const cart = getCart();
    document.getElementById("cart_quantity").innerText = cart.length
    let cart_total = 0;
    cart.forEach((p, index) => {
      let line = document.createElement('li')
      line.classList.value = "list-group-item d-flex justify-content-between lh-sm";
      line.id = `line-${index}`
      let div = document.createElement('div')
      let name = document.createElement('h6')
      name.classList.value = "my-0";
      name.innerText = p.name;
      name.innerHTML = `<a class="btn" href="?remove=${index+1}"> <i class="bi bi-trash-fill text-danger"></i></a> ${name.innerText}`;

      let description = document.createElement('small')
      description.classList.value = "text-muted"
      description.innerText = p.description;
      let price = document.createElement('span')
      price.classList.value = "text-muted"
      price.innerText = `R$${p.price}`
      cart_total += Number(p.price)

      div.appendChild(name)
      div.appendChild(description)
      line.appendChild(div)
      line.appendChild(price)
      document.getElementById('your_cart').appendChild(line)
    })
    document.getElementById('your_cart').innerHTML = document.getElementById('your_cart').innerHTML +`
  <li class="list-group-item d-flex justify-content-between">
            <span>Total (R$)</span>
            <strong>R$ ${cart_total}</strong>
          </li>`;
  }



  function validate_cart(){
    let items = getCart();
    let order_items = [];
    items.forEach(i => {
      order_items.push({
        product_sku: i.sku,
        product_name: i.name,
        quantity: 1,
        price: i.price
      })
    })
    const productQuantities = order_items.reduce((acc, product) => {
      if (acc[product.product_name]) {
        acc[product.product_name].quantity += product.quantity;
      } else {
        acc[product.product_name] = product;
      }
      return acc;
    }, {});
    const final = Object.keys(productQuantities).map(key => {
      productQuantities[key].price = productQuantities[key].price * productQuantities[key].quantity;
      return productQuantities[key]
    })
    return final;
  }

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(async function (form) {
      form.addEventListener('submit', async function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        const body = JSON.stringify({
          user: document.getElementById('email').value,
          payment_method: document.querySelector('input[name="paymentMethod"]:checked').value,
          address: await searchCEP(document.getElementById('zip').value),
          order_items: validate_cart()
        })
        const request = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
          },
          body: body
        })

        if (!request.ok) {
          alert("Ocorreu um problema no pedido. Tente novamente mais tarde.")
        } else {
          form.classList.add('was-validated')
          alert("Obrigado por realizar o seu pedido. Aguarde recebe-lo para efetuar o pagamento!")
          sessionStorage.setItem("cart", "[]");
          setTimeout(() => {
            location.href = "/"
          }, 2000)
        }




      }, false)
    })

  async function searchCEP(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const {logradouro, bairro, localidade, uf} = await response.json();
    document.getElementById('address').value = logradouro;
    document.getElementById('neighbor').value = bairro;
    document.getElementById('city').value = localidade;
    return `${logradouro}, ${document.getElementById("address_number").value}, ${document.getElementById("complement").value}, ${bairro}, ${localidade}/${uf}`
  }

  document.getElementById('zip').addEventListener('change', async function() {
    await searchCEP(document.getElementById('zip').value)
  })


});
