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

    const newPanel = document.createElement('div');
    newPanel.style.gridTemplateColumns = '1fr 0fr';
    newPanel.style.alignItems = 'center';
    newPanel.style.backgroundColor = 'green';
    newPanel.innerText = 'TESTING GRID';
    newPanel.style.color = 'white';
    newPanel.className = 'panel';
    newPanel.id = i;
    newPanel.addEventListener('click', () => {
        if (panels[i].pass === true) {
            newPanel.style.backgroundColor = 'red';
            numberDiv.style.backgroundColor = 'darkred';
            panels[i].pass = false;
        } else {
            newPanel.style.backgroundColor = 'green';
            numberDiv.style.backgroundColor = 'darkgreen';
            panels[i].pass = true;
        }
    });

    const newImage = document.createElement('img');
    newImage.style.height = '200px';
    newImage.style.width = '200px';
    newImage.style.borderBottomRightRadius = '20px';
    newImage.style.borderTopRightRadius = '20px';
    newImage.src = images[i].src;

    table.appendChild(newPanel);
    newPanel.appendChild(newImage);
    newPanel.appendChild(numberDiv);
    panels.push({ panel: newPanel, number: numberDiv, pass: true });
}

function submit() {
    if (!isValidId()) {
        window.alert('ID invalida. Por favor, introduzca una identificacion de 6 caracteres.');
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
    });
}

function isValidId() {
    return input.value.length === 6;
}

function reset() {
    scrollToTop();
    input.value = '';
    panels.forEach(element => {
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