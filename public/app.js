const CHECKS = 50; // The number of checks that will be performed in total.

const submitButton = document.getElementById('submit');
submitButton.addEventListener('mouseover', () => {
    submitButton.style.scale = 1.1;
});
submitButton.addEventListener('mouseleave', () => {
    submitButton.style.scale = 1;
});
const images = initializeImages();

function initializeImages() {
    const images = [];
    for (let i = 0; i < CHECKS; i++) {
        newImage = new Image();
        newImage.src = `assets/step${i + 1}.png`;
        newImage.alt = `step ${i + 1}`;
        newImage.style.height = '100px';
        newImage.style.width = '100px';
        images.push(newImage);
    }
    return images;
}


const stepKeyPhrases = [];
{
    stepKeyPhrases.push("2 tornillos ctrl panel"); // 1.
    stepKeyPhrases.push("Panel de aislamiento");
    stepKeyPhrases.push("Proteccion mangueras"); // NEW 3
    stepKeyPhrases.push("Cintillo de bolitas");
    stepKeyPhrases.push("Ruteo de cables R & N");
    stepKeyPhrases.push("Clip manguera superior");
    stepKeyPhrases.push("2 tornillos TC-MB superior"); // Thermocoil Main Body
    stepKeyPhrases.push("Malla TC centrado"); // NEW 8
    stepKeyPhrases.push("3 cables amarillos TC");
    stepKeyPhrases.push("Cintillo 3 cables amarillos TC");
    stepKeyPhrases.push("Posicion thermostat"); // NEW 11
    stepKeyPhrases.push("Abrazadera steam valve");
    stepKeyPhrases.push("3 cables V & A steam valve");
    stepKeyPhrases.push("2 puntos welding"); // NEW 14
    stepKeyPhrases.push("2 tornillos sensor TC");
    stepKeyPhrases.push("Ruteo sensor TC");
    stepKeyPhrases.push("Clips Thermocoil"); // NEW 17
    stepKeyPhrases.push("Clip Manguera Steam Valve");
    stepKeyPhrases.push("Clip Manguera TC");
    stepKeyPhrases.push("2 tornillos valvulas-TC");
    stepKeyPhrases.push("2 tornillos TC-MB frontal");
    stepKeyPhrases.push("Terminales valvula izquierda");
    stepKeyPhrases.push("Terminales valvula derecha");
    stepKeyPhrases.push("Clips valvulas"); // NEW 24
    stepKeyPhrases.push("Cintillo manguera bomba");
    stepKeyPhrases.push("Cintillo cables rojo-naranja");
    stepKeyPhrases.push("Cintillos baffle"); // NEW 27
    stepKeyPhrases.push("Conexiones bomba");
    stepKeyPhrases.push("Arnes rojo-blanco-verde");
    stepKeyPhrases.push("2 tornillos TC-MB inferior");
    stepKeyPhrases.push("2 tornillos heat sink");
    stepKeyPhrases.push("4 tierras con tornillo TC");
    stepKeyPhrases.push("Ruteo cables ctrl panel");
    stepKeyPhrases.push("Cintillo cables ctrl panel");
    stepKeyPhrases.push("Magneto con silicon"); // NEW 35
    stepKeyPhrases.push("4 tornillos grinder");
    stepKeyPhrases.push("Posicion y movimiento dial");
    stepKeyPhrases.push("4 tornillos PCB BOX");
    stepKeyPhrases.push("2 tornillos sujetador AC");
    stepKeyPhrases.push("Tubing AC"); // NEW 40
    stepKeyPhrases.push("Crimpado terminales 1-7");
    stepKeyPhrases.push("Crimpado terminales 8-11");
    stepKeyPhrases.push("Ruteo cable rojo TC");
    stepKeyPhrases.push("Amarre de cables");
    stepKeyPhrases.push("Ruteo terminales 8 & 9");
    stepKeyPhrases.push("Baffle Outlet Tube");
    stepKeyPhrases.push("Boton grinder");
    stepKeyPhrases.push("Botones ctrl panel");
    stepKeyPhrases.push("Manometro ctrl panel");
    stepKeyPhrases.push("Estampado");
}

const input = document.getElementById('input');
window.onload = () => {
    reset();
}
input.addEventListener('selectionchange', () => {
    if (isValidId()) {
        input.style.backgroundColor = 'rgb(7, 198, 0)';
    } else {
        input.style.backgroundColor = 'red';
    }
});

const header = document.getElementById('header');
setInterval(() => {
    header.innerText = `Inspeccion de Calidad Ensamblaje - ${new Date().toLocaleString()}`;

})

const table = document.getElementById('checks');
table.style.gridTemplateRows = CHECKS / 2;

const panels = [];
for (let i = 0; i < CHECKS; i++) {
    const numberDiv = document.createElement('div');
    numberDiv.style.position = 'absolute';
    numberDiv.style.height = '50px';
    numberDiv.style.width = '50px';
    numberDiv.style.borderTopLeftRadius = '20px';
    numberDiv.style.borderBottomRightRadius = '20px';
    numberDiv.style.fontSize = '35px';
    numberDiv.style.backgroundColor = 'darkgreen';
    numberDiv.style.alignSelf = 'start';
    numberDiv.style.alignContent = 'center';
    numberDiv.innerText = i + 1;
    
    const passOrFail = document.createElement('span');
    passOrFail.innerText = 'PASS';
    passOrFail.style.color = 'rgb(0, 49, 2)';
    passOrFail.style.fontWeight = 'bold';
    passOrFail.style.fontSize = '30px';
    passOrFail.style.position = 'absolute';
    passOrFail.style.alignSelf = 'start';
    passOrFail.style.marginLeft = '60px';

    const newPanel = document.createElement('div');
    newPanel.style.gridTemplateColumns = '1fr 0fr';
    newPanel.style.alignItems = 'center';
    newPanel.style.backgroundColor = 'green';
    newPanel.style.color = 'white';
    newPanel.style.border = '10px outset green';
    newPanel.className = 'panel';
    newPanel.id = i;
    
    newPanel.addEventListener('click', () => {
        if (panels[i].pass === true) {
            newPanel.style.backgroundColor = 'red';
            newPanel.style.borderColor = 'red';
            numberDiv.style.backgroundColor = 'darkred';
            passOrFail.innerText = 'FAIL';
            passOrFail.style.color = 'rgb(150, 0, 0)';
            panels[i].pass = false;
        } else {
            newPanel.style.backgroundColor = 'green';
            newPanel.style.borderColor = 'green';
            numberDiv.style.backgroundColor = 'darkgreen';
            passOrFail.innerText = 'PASS';
            passOrFail.style.color = 'rgb(0, 49, 2)';
            panels[i].pass = true;
        }
    });

    const newSpan = document.createElement('span');
    newSpan.innerText = stepKeyPhrases[i];
    newSpan.style.fontSize = '40px';
    newSpan.style.userSelect = 'none';
    newSpan.style.webkitUserSelect = 'none'; // Safari
    newSpan.style.mozUserSelect = 'none';    // Firefox
    newSpan.style.msUserSelect = 'none';

    const newImage = document.createElement('img');
    newImage.style.height = '200px';
    newImage.style.width = '200px';
    newImage.style.borderBottomRightRadius = '10px';
    newImage.style.borderTopRightRadius = '10px';
    newImage.src = images[i].src;


    table.appendChild(newPanel);
    newPanel.appendChild(newSpan);
    newPanel.appendChild(newImage);
    newPanel.appendChild(numberDiv);
    newPanel.appendChild(passOrFail);
    panels.push({ panel: newPanel, number: numberDiv, pass: true });
}

function submit() {
    if (!isValidId()) {
        window.alert('ID invalida. Por favor, introduzca una identificacion de 6 digitos.');
        scrollToTop();
        return;
    }
    output = `INSERT INTO breville2 VALUES ("${document.getElementById('input').value}"`;
    panels.forEach(panel => {
        output += ', ';
        if (panel.pass === true) {
            output += '"PASS"';
        } else {
            output += '"FAIL"';
        }
    });
    output += ");";
    input.value = '';
    reset();
    fetch('/api/send', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ output })
    }).then(res => res.json()).then(_ => {
        console.log('Success!');
        window.alert('Submision exitosa.');
    });
}

function isValidId() {
    let valid = true;
    for (let i = 0; i < input.value.length; i++) {
        if (!(input.value.charAt(i) <= '9' && input.value.charAt(i) >= '0')) {
            valid = false;
        }
    }
    return input.value.length === 6 && valid;
}

function reset() {
    scrollToTop();
    input.value = '';
    panels.forEach(element => {
        element.panel.style.borderColor = 'green';
        element.panel.style.backgroundColor = 'green';
        element.number.style.backgroundColor = 'darkgreen';
        element.pass = true;
    })
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}