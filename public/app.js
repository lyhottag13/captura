import { hidePassword, submitPassword, initializePasswordQuery } from './tools/passwordUtils.js';
import checkPanels from './tools/checkPanels.js';
import testConnection from './tools/testConnection.js';
/*
The total number of checks that will be performed. If this number
doesn't match the number of checks in the database, there will be a
mismatch error in the SQL query, so be careful.
*/
async function main() {
    const testData = await testConnection();
    if (testData.err) {
        return window.alert(testData.err);
    }
    window.alert('Conexion exitosa.');
    // Asks the user for a password, and only continues if it was good.
    initializePasswordQuery(handlePasswordSubmit);
}

async function handlePasswordSubmit(password) {
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
    if (checkId(idInput.value)) {
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
    submitButton.addEventListener('click', submitInspection);
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
 * @returns {void} Used to break out of the function.
 */
async function submitInspection() {
    const confirm = window.confirm('Confirmar submision?');
    if (!confirm) {
        return;
    }
    const id = document.getElementById('input').value;
    const isValidId = checkId(id);
    if (!isValidId) {
        scrollToTop();
        return window.alert('ID invalida. Por favor, introduzca una identificacion de 6 digitos.');
    }
    const notes = document.getElementById('notes').value;
    try {
        const res = await fetch('/api/inspection', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id,
                checkPanels,
                notes
            })
        });
        if (!res.ok) {
            throw new Error('Something went wrong with the API call.');
        }
        const data = await res.json();
        console.log(data);
        // If there is an error, then the submission failed.
        if (data.err) {
            const errorNumber = data.err.errno;
            let err;
            if (errorNumber === 1136) {
                // Not enough columns error.
                err = 'Discrepancia de columnas.\n';
            } else {
                err = 'Algo fue mal.\n';
            }
            err += 'Comunicase con su departamento de TI';
            return window.alert(err);
        }
        window.alert('Submision exitosa.');
        reset();
    } catch (err) {
        window.alert(err.message);
    }
}

/**
 * Checks to see whether or not the ID in the input box is valid. We only
 * want an ID that has exactly six numbers and no letters. If the ID 
 * doesn't pass both these checks, then it is invalid.
 * @param {string} id The ID to check.
 * @returns Whether the ID is valid.
 */
function checkId(id) {
    let valid = true;
    for (let i = 0; i < id.length; i++) {
        if (!(id.charAt(i) <= '9' && id.charAt(i) >= '0')) {
            valid = false;
        }
    }
    return id.length === 6 && valid;
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
        element.stepNumber.style.backgroundColor = 'darkgreen';
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