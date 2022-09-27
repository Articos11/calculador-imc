// Capturar o evento de submit de formulário.
const form = document.querySelector('.form');

// É adicionado um eventListener quando o submit é ativado, o que irá ativar a função a seguir. 
form.addEventListener('submit', function(e){
    // preventDefault evita que a página seja recarregada após o envio do formulário.
    e.preventDefault();
    
    // Irá determinar de onde o evento da função receberá o elemento, nesse caso, o submit. 
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');
    
    // As variáveis abaixo são onde o valor recebido no formulário serão convertidos em números. 
    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    // Se peso for diferente de numero, será retornado peso inválido e o código será encerrado.
    if (!peso){
                     // par 1          par 2
        setResultado('Peso inválido.', false);
        return;
    }

    // Se a altura for diferente do número, será retornado altura inválida e o código será encerrado.
    if (!altura) {
                     // par 1            par 2
        setResultado('Altura inválida.', false);
        return; 
    }

    // Aqui serão passados para a função getImc os valores de peso e altura. 
    const imc = getImc(peso, altura);
    const nivelImc = getNivelImc(imc);

    const msg = `Seu IMC é ${imc} (${nivelImc})`;

    setResultado(msg, true);
    console.log(imc, nivelImc);
});

function getNivelImc(imc){
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];
    
    // Caso o if realize uma única condições, é possível deixa-lo numa linha única.
    if (imc >= 39.9) return nivel[5];
    if (imc >= 34.9) return nivel[4];
    if (imc >= 29.9) return nivel[3];
    if (imc >= 24.9) return nivel[2];
    if (imc >= 18.5) return nivel[1];
    if (imc < 18.5) return nivel[0];
}

// Essa função receberá os valores de peso e altura inseridos no formulário.
function getImc(peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
}

function criaP() {
    // Após isso, é criado uma variável que guarda um <p> dentro de si, e logo após esse P é inserido dentro de resultado, que está zerado. 
    const p = document.createElement('p');
    // Irá retornar para quem o chamou a tag <p>
    return p;
}

function setResultado (msg, isValid) {
    // É selecionada a div com a id resultado e é zerado o HTML, deixando-o em branco toda vez que um novo resultado for criado. 
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';

    const p = criaP();

    if (isValid) {
        p.classList.add('paragrafo-resultado'); 
    } else {
        p.classList.add('bad');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);
}