// Capturing the event of the form. 
const form = document.querySelector('.form');

// Then I need to create a function alongside an eventListener so I can manipulate the DOM later on. 

form.addEventListener('submit', function (e) {
    // The parameter e stands for Event, used in more professional projects.
    //preventDefault will stop the page from reloading everytime the submit is sent. 
    e.preventDefault();
    console.log('Evento previnido.');

    // Now, to capture the inputs on the form to make it possible to get the numbers. 
    // These captures are not values. They will come as the html line. They MUST be converted into numbers.
    const inputPeso = document.querySelector('#peso');
    const inputAltura = document.querySelector('#altura');

    // Here we will convert the values inside the form to numbers. Anything aside that will be shown as NaN.
    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    console.log(peso, altura);

    // If peso is anything other than an Number, two parameters will be sent to setResultado(), one with the message and the other with 'false', so the isValid is shown. 
    if (!peso) {
        setResultado('Peso Inválido', false);
        // Return interrupts the code, stopping it on track.
        return;
    }

    // If altura is anything other than an Number, two parameters will be sent to setResultado(), one with the message and the other with 'false', so the isValid is shown.
    if (!altura) {
        setResultado('Peso Inválido', false);
        return;
    }

    const imc = getImc(peso, altura);
    const nivelImc = getNivelImc(imc);

    const msg = `Seu nível de IMC é ${imc} (${nivelImc})`;

    setResultado(msg, true);
});

// Here is a function with the sole purpose to create a new <p>
function criaP() {
    const p = document.createElement('p');
    // The return instruction is very necessary as it will return the paragraph.
    return p;
}

// Here is the function that will show the results on the screen.
function setResultado(msg, isValid) {
    const resultado = document.querySelector('#resultado');
    // This one instruction here will reset the parameter everytime a new value is set on the form.
    resultado.innerHTML = '';

    const p = criaP();

    if (isValid) {
        // This will create a class element on the recently created <p> so it can be manipulated on the CSS.
        p.classList.add('paragrafo-resultado');
    } else {
        // If anything goes wrong, another class will be added to show another result.
        p.classList.add('bad');
    }
    // This will receive the msg parameter and will append the child <p> to the div <resultado>
    p.innerHTML = msg;
    resultado.appendChild(p)
}

// This one is a simple function to return the result within the math of the IMC. it will return the result already calculated. 
function getImc(peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
}

function getNivelImc(imc) {
    // An array is created with a few strings which stores the names of the levels of IMC.
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

    // ifs can be done with single lines if you aim for only one result.
    if (imc >= 39.9) return nivel[5];
    if (imc >= 34.9) return nivel[4];
    if (imc >= 29.9) return nivel[3];
    if (imc >= 24.9) return nivel[2];
    if (imc >= 18.5) return nivel[1];
    if (imc < 18.5) return nivel[0];
}