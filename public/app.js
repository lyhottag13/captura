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


const input = document.getElementById('input');
window.onload = () => {
    input.value = '';
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
    const newPanel = document.createElement('div');
    newPanel.style.display = 'flex';
    newPanel.style.flexDirection = 'row';
    // newPanel.style.paddingTop = '30px';
    // newPanel.style.paddingBottom = '30px';
    newPanel.style.gap = '10px';
    newPanel.style.alignItems = 'center';
    newPanel.style.backgroundColor = 'green';
    newPanel.innerText = `${i + 1} - TESTING GRID`;
    newPanel.style.color = 'white';
    newPanel.className = 'panel';
    newPanel.id = i;
    newPanel.addEventListener('click', () => {
        if (panels[i].pass === true) {
            newPanel.style.backgroundColor = 'red';
            panels[i].pass = false;
        } else {
            newPanel.style.backgroundColor = 'green';
            panels[i].pass = true;
        }
    });
    const newImage = document.createElement('img');
    newImage.style.height = '150px';
    newImage.style.width = '150px';
    // newImage.style.position = 'relative';
    // newImage.style.left = '50%';
    // newImage.style.transform = 'translateX(-50%)';
    newImage.src = images[i].src;
    table.appendChild(newPanel);
    newPanel.appendChild(newImage);
    panels.push({ panel: newPanel, pass: true });
}

function submit() {
    if (!isValidId()) {
        window.alert('ID invalida. Por favor, introduzca una identificacion de 6 caracteres.');
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
    fetch('/api/send', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ output })
    }).then(res => res.json()).then(_ => {
        console.log('Success!');
    });
}

function isValidId() {
    return input.value.length === 6;
}