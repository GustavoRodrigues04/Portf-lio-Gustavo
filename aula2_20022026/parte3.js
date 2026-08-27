// Parte 3 - Criando 10 arrays com 3 objetos cada
let objetos = [
    {
        nome: 'Geladeira',
        preco: 2000,
        estoque: 50,
    },
    { 
        nome: 'Fogão',
        preco: 1500,
        estoque: 30,
    },
    {
        nome: 'Micro-ondas',
        preco: 800,
        estoque: 20,   
    },
    {
        nome: 'Máquina de lavar',
        preco: 2500,
        estoque: 30,
    },
    {
        nome: 'Ar-condicionado',
        preco: 3000,
        estoque: 5,
    },
    {
        nome: 'Televisão',
        preco: 1800,        
        estoque: 15,
    },
    {   
        nome: 'Computador',
        preco: 3500,
        estoque: 8,
    },  
    {
        nome: 'Smartphone',
        preco: 1200,    
        estoque: 25,
    },
    {
        nome: 'Tablet',     
        preco: 900,
        estoque: 12,
    },
    {
        nome: 'Impressora',
        preco: 600,
        estoque: 18,
    },
];
document.getElementById('arrayObjetos').innerHTML = JSON.stringify(objetos, null, 2);
console.log(objetos);

// Variáveis para mostrar as respostas
let resa = document.getElementById('resap3');
let resb = document.getElementById('resbp3');
let resc = document.getElementById('rescp3');
let resd= document.getElementById('resdp3');
let rese = document.getElementById('respep3');
let resf = document.getElementById('respfp3');

// Acessando o nome do primeiro objeto
resa.innerHTML = 'O preço do segundo objeto é: ' + objetos[1].preco + '.';
// Acessando o preço do terceiro objeto
resb.innerHTML = `o Nome do terceiro objeto é: ${objetos[2].nome}.`;
// Acessando quantas objetos existe na arrayz
resc.innerHTML = `A array possui ${objetos.length} objetos.`;
// Mostrar o nome de todos os objetos
resd.innerHTML = `Os nomes de todos os objetos são: ${objetos.map(obj => obj.nome).join(', ')}.`;
// somando o total do estoque de todos os objetos
let totalEstoque = objetos.reduce((total, obj) => total + obj.estoque, 0);
rese.innerHTML = `O total do estoque de todos os objetos é: ${totalEstoque}.`;
// Buscando o objeto com o maior estoque
let objetoMaiorEstoque = objetos.reduce((maior, obj) => obj.estoque > maior.estoque ? obj : maior, objetos[0]);
resf.innerHTML = `O objeto com o maior estoque é: ${objetoMaiorEstoque.nome} com ${objetoMaiorEstoque.estoque} unidades.`;