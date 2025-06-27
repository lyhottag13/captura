import { hidePassword, submitPassword, initializePasswordQuery } from './tools/passwordUtils.js';
import checkPanels from './tools/checkPanels.js';

/*
    The total number of checks that will be performed. If this number
    doesn't match the number of checks in the database, there will be a
    mismatch error in the SQL query, so be careful.
*/
async function main() {
    // Asks the user for a password, and only continues if it was good.
    initializePasswordQuery(handleSubmit);
}

async function handleSubmit(password) {
    const isValidPassword = await submitPassword(password);
    if (isValidPassword === false) {
        // Reloads the page if the password was incorrect to prevent use.
        window.location.href = '/';
    } else {
        initializePanels();
        reset();
        hidePassword();
    }
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

// Controls the clock, useful for the operator to see what time it is.
const header = document.getElementById('header');
setInterval(() => {
    header.innerText = `Inspeccion de Calidad Ensamblaje - ${new Date().toLocaleString()}`;
});

/**
 * Initializes each of the panels needed for all the checks. There are only
 * CHECKS number of panels required. New elements are created dynamically
 * by the for loop.
 * Each panel uses a number, a pass/fail indicator, a span with the step text,
 * and an image representing the step.
 */
function initializePanels() {
    const checkTable = document.getElementById('checks');
    checkPanels.forEach(panel => {
        checkTable.appendChild(panel.panel);
    });
    const notesPanel = document.createElement('div');
    notesPanel.style.display = 'grid';
    notesPanel.style.width = '100%';
    notesPanel.style.gridTemplateRows = '0fr 1fr';
    notesPanel.style.alignItems = 'center';
    notesPanel.style.justifyItems = 'center';

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
    submitButton.addEventListener('click', () => submitInspection());
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
 * @returns nothing, just used to break out of the function.
 */
async function submitInspection() {
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
        Sidenote, there's no possibility for SQL injection, since the
        user can't directly input into the SQL string.
    */
    let SQLstring = `INSERT INTO breville2 VALUES ("${document.getElementById('input').value}"`;
    // Appends to the SQL string a pass or fail state for each panel.
    checkPanels.forEach(panel => {
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
        let errorMessage = 'Algo fue mal. Comunicase con su departamento de TI.';
        if (errorNumber === 1062) {
            // Duplicate entry error.
            errorMessage = 'Ya existe una entrada con ese identificador. Intente otro.';
            scrollToTop();
        }
        window.alert(errorMessage);
    }
}

/**
 * Checks to see whether or not the ID in the input box is valid. We only
 * want an ID that has exactly six numbers and no letters. If the ID 
 * doesn't pass both these checks, then it is invalid.
 * @returns whether or not the ID is valid.
 */
function isValidId() {
    let valid = true;
    for (let i = 0; i < idInput.value.length; i++) {
        if (!(idInput.value.charAt(i) <= '9' && idInput.value.charAt(i) >= '0')) {
            valid = false;
        }
    }
    return idInput.value.length === 6 && valid;
}
/**
 * Resets the web app's screen so that everything is back to its default state.
 */
function reset() {
    scrollToTop();
    idInput.value = '';
    idInput.focus();
    document.getElementById('notes').value = '';
    checkPanels.forEach(element => {
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