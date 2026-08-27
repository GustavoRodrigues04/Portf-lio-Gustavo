//Parte 1 - Criando um array com 20 elementos
let times = ['Corinthians','Flamengo','São Paulo', 'Grêmio', 'Internacional', 'Atlético Mineiro', 'Cruzeiro', 'Vasco da Gama', 'Botafogo','Fluminense', 'Santos', 'Athletico Paranaense', 'Bahia', 'Sport Recife', 'Fortaleza', 'Ceará', 'Goiás', 'Coritiba', 'Avaí','Atlético Paranaense'];
console.log(times.length);
document.getElementById('arrayInicial').innerHTML = JSON.stringify(times, null, 2);

// Variavel DOMContent para mostrar as respostas
let respostaA = document.getElementById('respap1');
let respostaB = document.getElementById('respbp1');
let respostaC = document.getElementById('respcp1');
let respostaD = document.getElementById('respdp1');
let respostaE = document.getElementById('respep1');

// Acessando os elementos nas posições 0, 7, 11, 15, 18 e 20
respostaA.innerHTML = `O elemento na posição 0 é ${times[0]}, o elemento na posição 7 é ${times[7]}, o elemento na posição 11 é ${times[11]}, o elemento na posição 15 é ${times[15]}, o elemento na posição 18 é ${times[18]} e o elemento na posição 20 é ${times[20]}.`;

// Acessando os elementos nas posições 18 e 19
respostaB.innerHTML = `O elemento na penúltima posição é ${times[18]}, o elemento na última posição é ${times[19]}.`;

// Verificando o número de elementos no array
respostaC.innerHTML = `O array possui ${times.length} elementos.`;

// Adicionando um novo elemento ao final do array
times.push('Palmeiras');
respostaD.innerHTML = `Novo elemento adicionado ao final do array: ${times[times.length - 1]}.`;

// Imprimindo todos os elementos do array
for (let i = 0; i < times.length; i++) {
    respostaE.innerHTML += `${times[i]}<br>`;
}
