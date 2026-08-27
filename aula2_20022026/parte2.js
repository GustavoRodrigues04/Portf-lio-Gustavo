// Parte 2 - Criando um objeto com 4 propriedades 

let comida = {
    nome: 'Pizza',
    cor: 'Vermelha',
    preco: 50,
    estoque: 100,
};
document.getElementById('objetoInicial').innerHTML = JSON.stringify(comida, null, 2);
console.log(comida);

let respa = document.getElementById('resap2'); 
let respb = document.getElementById('resbp2');
let respc = document.getElementById('rescp2');
let respd = document.getElementById('resdp2');

// Acessando o nome do objeto
respa.innerHTML = `Para acessar o nome do objeto, use: comida.nome. O valor é: ${comida.nome}.`;
// Acessando o preço usando colchetes
respb.innerHTML = `Para acessar o preço usando colchetes, use: comida['preco']. O valor é: ${comida['preco']}.`;

// Atualizando o estoque para 80
comida.estoque = 80;
respc.innerHTML = `O estoque foi atualizado para: ${comida.estoque}.`;

// Imprimindo todas as propriedades no console
respd.innerHTML = `As propriedades do objeto são: nome: ${comida.nome}, cor: ${comida.cor}, preco: ${comida.preco}, estoque: ${comida.estoque}.`;   
