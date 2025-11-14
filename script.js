function adicionarAoCarrinho(nome, preco) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push({ nome, preco });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert(`${nome} foi adicionado ao carrinho!`);
  atualizarIconeCarrinho();
}

if (window.location.pathname.includes("carrinho.html")) {
  const itensCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const container = document.getElementById("itens-carrinho");
  const totalEl = document.getElementById("total");

  if (itensCarrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio 😢</p>";
  } else {
    let total = 0;
    container.innerHTML = "";
    itensCarrinho.forEach((item, index) => {
      total += item.preco;
      const div = document.createElement("div");
      div.classList.add("item");
      div.innerHTML = `
        <span>${item.nome}</span>
        <span>R$ ${item.preco.toFixed(2)}</span>
        <button onclick="removerItem(${index})">❌</button>
      `;
      container.appendChild(div);
    });
    totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
  }
}

function atualizarIconeCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const countEl = document.querySelector(".cart-count");
  const totalEl = document.querySelector(".cart-total");

  let total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  if (countEl) countEl.textContent = carrinho.length;
  if (totalEl) totalEl.textContent = `R$ ${total.toFixed(2)}`;
}

atualizarIconeCarrinho();
function zerarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  localStorage.removeItem("carrinho");
}

function removerItem(index) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  location.reload();
  atualizarIconeCarrinho();
}

function finalizarCompra() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Gostaria de finalizar minha compra com os seguintes produtos:\n\n";
  let total = 0;

  carrinho.forEach((item) => {
    mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    total += item.preco;
  });

  mensagem += `\nTotal: R$ ${total.toFixed(2)}`;
  const url = `https://wa.me/554197485449?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
  zerarCarrinho();
}
