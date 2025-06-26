/*
    The total number of checks that will be performed. If this number
    doesn't match the number of checks in the database, there will be a
    mismatch error in the SQL query, so be careful.
*/
const CHECKS = 50;

const panels = [];
async function main() {
    // Asks the user for a password, and only continues if it was good.
    queryPassword();
}

async function submitPassword(password) {
    const res = await fetch('/api/password', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
    });
    const data = await res.json();
    const { goodPassword } = data;
    if (goodPassword === false) {
        // Reloads the page if the password was incorrect to prevent use.
        window.location.href = '/';
    } else {
        initializePanels();
        reset();
        hidePassword();
    }
}
function queryPassword() {
    const passwordDiv = document.createElement('div');
    passwordDiv.id = 'passwordDiv';
    passwordDiv.innerText = 'Ingresa contraseña';
    const passwordField = document.createElement('input');
    passwordField.id = 'passwordField';
    const passwordSubmit = document.createElement('button');
    passwordSubmit.innerText = 'Enviar';
    passwordSubmit.addEventListener('click', () => {
        submitPassword(passwordField.value);
    })
    passwordDiv.appendChild(passwordField);
    passwordDiv.appendChild(passwordSubmit);
    document.body.appendChild(passwordDiv);
    hidePassword = () => {
        passwordDiv.style.display = 'none';
    }
}

const submitButton = document.getElementById('submit');

const images = initializeImages();

function initializeImages() {
    const images = [];
    for (let i = 0; i < CHECKS; i++) {
        newImage = new Image();
        newImage.src = `assets/step${i + 1}.png`; // i + 1 is used since the index is off by one.
        newImage.alt = `step ${i + 1}`;
        newImage.style.height = '100px';
        newImage.style.width = '100px';
        images.push(newImage);
    }
    return images;
}

// Contains all the key phrases for the panels.
const stepKeyPhrases = [];
{
    stepKeyPhrases.push("2 tornillos Ctrl Panel"); // 1.
    stepKeyPhrases.push("Panel de aislamiento");
    stepKeyPhrases.push("Protección mangueras"); // NEW 3
    stepKeyPhrases.push("Cintillo de bolitas");
    stepKeyPhrases.push("Ruteo de cables R & N");
    stepKeyPhrases.push("Clip manguera superior");
    stepKeyPhrases.push("2 tornillos TC-MB superior"); // Thermocoil Main Body
    stepKeyPhrases.push("Malla TC centrado"); // NEW 8
    stepKeyPhrases.push("3 cables amarillos TC");
    stepKeyPhrases.push("Cintillo 3 cables amarillos TC");
    stepKeyPhrases.push("Posición thermostat"); // NEW 11
    stepKeyPhrases.push("Abrazadera steam valve");
    stepKeyPhrases.push("3 cables V & A steam valve");
    stepKeyPhrases.push("2 puntos welding"); // NEW 14
    stepKeyPhrases.push("2 tornillos sensor TC");
    stepKeyPhrases.push("Ruteo sensor TC");
    stepKeyPhrases.push("Clips Thermocoil"); // NEW 17
    stepKeyPhrases.push("Clip manguera Steam Valve");
    stepKeyPhrases.push("Clip manguera TC");
    stepKeyPhrases.push("2 tornillos válvulas-TC");
    stepKeyPhrases.push("2 tornillos TC-MB frontal");
    stepKeyPhrases.push("Terminales válvula izquierda");
    stepKeyPhrases.push("Terminales válvula derecha");
    stepKeyPhrases.push("Clips válvulas"); // NEW 24
    stepKeyPhrases.push("Cintillo manguera bomba");
    stepKeyPhrases.push("Cintillo cables rojo-naranja");
    stepKeyPhrases.push("Cintillos baffle"); // NEW 27
    stepKeyPhrases.push("Conexiones bomba");
    stepKeyPhrases.push("Arnés rojo-blanco-verde");
    stepKeyPhrases.push("2 tornillos TC-MB inferior");
    stepKeyPhrases.push("2 tornillos heat sink");
    stepKeyPhrases.push("4 tierras con tornillo TC");
    stepKeyPhrases.push("Ruteo cables Ctrl Panel");
    stepKeyPhrases.push("Cintillo cables Ctrl Panel");
    stepKeyPhrases.push("Magneto con silicón"); // NEW 35
    stepKeyPhrases.push("4 tornillos grinder");
    stepKeyPhrases.push("Posición y movimiento dial");
    stepKeyPhrases.push("4 tornillos PCB BOX");
    stepKeyPhrases.push("2 tornillos sujetador AC");
    stepKeyPhrases.push("Tubing AC"); // NEW 40
    stepKeyPhrases.push("Crimpado terminales 1-7");
    stepKeyPhrases.push("Crimpado terminales 8-11");
    stepKeyPhrases.push("Ruteo cable rojo TC");
    stepKeyPhrases.push("Amarre de cables");
    stepKeyPhrases.push("Ruteo terminales 8 & 9");
    stepKeyPhrases.push("Baffle Outlet Tube");
    stepKeyPhrases.push("Botón grinder");
    stepKeyPhrases.push("Botones Ctrl Panel");
    stepKeyPhrases.push("Manómetro Ctrl Panel");
    stepKeyPhrases.push("Estampado");
}

// Controls the ID input box and its color when it receives input.
const idInput = document.getElementById('input');
idInput.addEventListener('selectionchange', () => {
    if (isValidId()) {
        idInput.style.backgroundColor = 'rgb(7, 198, 0)';
    } else {
        idInput.style.backgroundColor = 'red';
    }
});

// Controls the clock, useful for the employee to see what time it is.
const header = document.getElementById('header');
setInterval(() => {
    header.innerText = `Inspeccion de Calidad Ensamblaje - ${new Date().toLocaleString()}`;
})

/**
 * Initializes each of the panels needed for all the checks. There are only
 * CHECKS number of panels required. New elements are created dynamically
 * by the for loop.
 * Each panel uses a number, a pass/fail indicator, a span with the step text,
 * and an image representing the step.
 */
function initializePanels() {
    const checkTable = document.getElementById('checks');
    for (let i = 0; i < CHECKS; i++) {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'numberDiv';
        numberDiv.innerText = i + 1;

        const passOrFail = document.createElement('span');
        passOrFail.className = 'passOrFail';
        passOrFail.innerText = 'PASS';

        const newPanel = document.createElement('div');
        newPanel.className = 'panel';
        newPanel.id = `panel${i}`;

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
        newSpan.style.fontSize = '35px';
        newSpan.style.userSelect = 'none';
        newSpan.style.mozUserSelect = 'none';
        newSpan.style.msUserSelect = 'none';

        const newImage = document.createElement('img');
        newImage.className = 'checkImage';
        newImage.src = images[i].src;


        checkTable.appendChild(newPanel);
        newPanel.appendChild(newSpan);
        newPanel.appendChild(newImage);
        newPanel.appendChild(numberDiv);
        newPanel.appendChild(passOrFail);
        panels.push({ panel: newPanel, number: numberDiv, passOrFail: passOrFail, pass: true });
    }
    const notesPanel = document.createElement('div');
    notesPanel.style.width = '100%';

    const notesLabel = document.createElement('span');
    notesLabel.innerText = 'Notas:';
    notesLabel.style.fontSize = '20px';
    notesLabel.style.fontFamily = 'Consolas';

    const notes = document.createElement('textarea');
    notes.id = 'notes';
    notes.placeholder = 'Ingresa sus notas aqui.';
    notes.rows = '6';
    notes.cols = '40';

    const submitButton = document.createElement('button');
    submitButton.addEventListener('click', () => submit());
    submitButton.id = 'submit';
    submitButton.innerText = 'Enviar';
    submitButton.addEventListener('mouseover', () => {
        submitButton.style.scale = 1.1;
    });
    submitButton.addEventListener('mouseleave', () => {
        submitButton.style.scale = 1;
    });
    notesPanel.appendChild(notesLabel);
    notesPanel.appendChild(notes);
    checkTable.appendChild(notesPanel);
    checkTable.appendChild(submitButton);
}

/**
 * Submits the ID, notes, and each panel's pass/fail state to the server.
 * There is a confirmation, a valid ID check, and an error check before the
 * submit can be considered fully completed. 
 * @returns 
 */
async function submit() {
    const confirm = window.confirm('Confirmar submision?');
    if (!confirm) {
        return;
    }
    if (!isValidId()) {
        window.alert('ID invalida. Por favor, introduzca una identificacion de 6 digitos.');
        scrollToTop();
        return;
    }
    /* 
        Builds the SQL string dynamically, so that we can handle 10, 20, or 50 checks.
        The sequence for the string goes (id, check1, check2, ... , check n, notes).
        They're all VARCHAR.
    */
    let SQLstring = `INSERT INTO breville2 VALUES ("${document.getElementById('input').value}"`;
    panels.forEach(panel => {
        SQLstring += ', ';
        if (panel.pass === true) {
            SQLstring += '"PASS"';
        } else {
            SQLstring += '"FAIL"';
        }
    });
    SQLstring += `, "${document.getElementById('notes').value}");`;
    const res = await fetch('/api/send', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ SQLstring })
    });
    const data = await res.json();

    console.log(data);

    // If there is no error, then the submission was successful. Else, it describes the error.
    if (!data.err) {
        window.alert('Submision exitosa.');
        reset();
    } else {
        const errorNumber = data.err.errno;
        let errorMessage = 'Algo fue mal. Comunicase con su departamento de IT.';
        if (errorNumber === 1062) {
            // Duplicate entry error.
            errorMessage = 'Ya existe una entrada con ese identificador. Intente otro.';
            scrollToTop();
        }
        window.alert(errorMessage);
    }
}

function isValidId() {
    let valid = true;
    for (let i = 0; i < idInput.value.length; i++) {
        if (!(idInput.value.charAt(i) <= '9' && idInput.value.charAt(i) >= '0')) {
            valid = false;
        }
    }
    return idInput.value.length === 6 && valid;
}

function reset() {
    scrollToTop();
    idInput.value = '';
    idInput.focus();
    document.getElementById('notes').value = '';
    panels.forEach(element => {
        element.passOrFail.innerText = 'PASS';
        element.passOrFail.style.color = 'rgb(0, 49, 2)';
        element.panel.style.borderColor = 'green';
        element.panel.style.backgroundColor = 'green';
        element.number.style.backgroundColor = 'darkgreen';
        element.pass = true;
    });

}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

main();