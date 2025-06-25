const CHECKS = 50;

const table = document.getElementById('checks');
table.style.gridTemplateRows = CHECKS / 2;

const panels = [];
for (let i = 0; i < CHECKS; i++) {
    const newPanel = document.createElement('div');
    newPanel.style.backgroundColor = 'green';
    newPanel.style.height = '80px';
    newPanel.style.width = '300px';
    newPanel.innerText = i + ' - TESTING GRID';
    newPanel.style.color = 'white';
    newPanel.className = 'panel';
    newPanel.id = i;
    newPanel.addEventListener('click', () => {
        console.log(newPanel.id);
        if (newPanel.style.backgroundColor === 'red') {
            newPanel.style.backgroundColor = 'green';
            panels[i].pass = true;
        } else {
            newPanel.style.backgroundColor = 'red';
            panels[i].pass = false;
        }
        console.log(panels[i]);
    });
    table.appendChild(newPanel);
    panels.push({ panel: newPanel, pass: true });
}

function send() {
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