import checkNumber from "./checkNumber.js";
import checkList from "./checkList.js";
import images from "./images.js";
const panels = [];
for (let i = 0; i < checkNumber; i++) {
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
    newSpan.innerText = checkList[i];
    newSpan.style.fontSize = '35px';
    newSpan.style.userSelect = 'none';
    newSpan.style.mozUserSelect = 'none';
    newSpan.style.msUserSelect = 'none';

    const newImage = document.createElement('img');
    newImage.className = 'checkImage';
    newImage.src = images[i].src;
    
    newPanel.appendChild(newSpan);
    newPanel.appendChild(newImage);
    newPanel.appendChild(numberDiv);
    newPanel.appendChild(passOrFail);
    panels.push({ panel: newPanel, number: numberDiv, passOrFail: passOrFail, pass: true });
}
export default panels;