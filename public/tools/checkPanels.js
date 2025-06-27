import checkNumber from "./checkNumber.js";
import checkList from "./checkList.js";
import images from "./images.js";
const panels = [];

/**
 * Contains all the necessary components of a panel on the screen, used to be
 * just a simple for-loop, but the panels required a way to toggle them, which
 * was easier to implement using a class.
 */
class CheckPanel {
    constructor(i) {
        this.number = document.createElement('div');
        this.passOrFail = document.createElement('span');
        this.panel = document.createElement('div');
        this.span = document.createElement('span');
        this.image = document.createElement('img');
        this.pass = true;

        this.number.className = 'numberDiv';
        this.number.innerText = i + 1;

        this.passOrFail.className = 'passOrFail';
        this.passOrFail.innerText = 'PASS';

        this.panel.className = 'panel';
        this.panel.id = `panel${i}`;

        this.span.innerText = checkList[i];
        this.span.style.fontSize = '35px';
        this.span.style.userSelect = 'none';
        this.span.style.mozUserSelect = 'none';
        this.span.style.msUserSelect = 'none';

        this.image.className = 'checkImage';
        this.image.src = images[i].src;

        this.panel.addEventListener('click', () => {
            this.toggleButton();
        });

        this.panel.appendChild(this.span);
        this.panel.appendChild(this.image);
        this.panel.appendChild(this.number);
        this.panel.appendChild(this.passOrFail);
    }
    toggleButton() {
        if (this.pass === true) {
            this.panel.style.backgroundColor = 'red';
            this.panel.style.borderColor = 'red';
            this.number.style.backgroundColor = 'darkred';
            this.passOrFail.innerText = 'FAIL';
            this.passOrFail.style.color = 'rgb(150, 0, 0)';
            this.pass = false;
        } else {
            this.panel.style.backgroundColor = 'green';
            this.panel.style.borderColor = 'green';
            this.number.style.backgroundColor = 'darkgreen';
            this.passOrFail.innerText = 'PASS';
            this.passOrFail.style.color = 'rgb(0, 49, 2)';
            this.pass = true;
        }
    }
}

for (let i = 0; i < checkNumber; i++) {
    const checkPanel = new CheckPanel(i);
    panels.push(checkPanel)
}

export default panels;