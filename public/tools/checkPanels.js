import checkNumber from "./checkNumber.js";
import checkList from "./checkList.js";
import images from "./images.js";

/** @type {CheckPanel[]} */
const panels = [];

/**
 * Contains all the necessary components of a panel on the screen, used to be
 * just a simple for-loop, but the panels required a way to toggle them, which
 * was easier to implement using a class.
 */
class CheckPanel {
    /**
     * Creates a new CheckPanel based on the index of a for-loop later.
     * @param {number} index The index to base the current CheckPanel on.
     */
    constructor(index) {
        /** @type {HTMLDivElement} */
        this.stepNumber = document.createElement('div');

        /** @type {HTMLSpanElement} */
        this.passOrFail = document.createElement('span');

        /** @type {HTMLDivElement} */
        this.panel = document.createElement('div');

        /** @type {HTMLSpanElement} */
        this.span = document.createElement('span');

        /** @type {HTMLImageElement} */
        this.image = document.createElement('img');

        /** @type {boolean} */
        this.pass = true;

        this.stepNumber.className = 'numberDiv';
        this.stepNumber.innerText = index + 1;

        this.passOrFail.className = 'passOrFail';
        this.passOrFail.innerText = 'PASS';

        this.panel.className = 'panel';
        this.panel.id = `panel${index}`;

        this.span.innerText = checkList[index];
        this.span.style.fontSize = '35px';
        this.span.style.userSelect = 'none';
        this.span.style.mozUserSelect = 'none';
        this.span.style.msUserSelect = 'none';

        this.image.className = 'checkImage';
        this.image.src = images[index].src;

        this.panel.addEventListener('click', () => {
            this.togglePanel();
        });

        this.panel.appendChild(this.span);
        this.panel.appendChild(this.image);
        this.panel.appendChild(this.stepNumber);
        this.panel.appendChild(this.passOrFail);
    }
    /**
     * Toggles a CheckPanel based on its state. There are only two states
     * possible, pass or fail.
     */
    togglePanel() {
        if (this.pass === true) {
            this.panel.style.backgroundColor = 'red';
            this.panel.style.borderColor = 'red';
            this.stepNumber.style.backgroundColor = 'darkred';
            this.passOrFail.innerText = 'FAIL';
            this.passOrFail.style.color = 'rgb(150, 0, 0)';
            this.pass = false;
        } else {
            this.panel.style.backgroundColor = 'green';
            this.panel.style.borderColor = 'green';
            this.stepNumber.style.backgroundColor = 'darkgreen';
            this.passOrFail.innerText = 'PASS';
            this.passOrFail.style.color = 'rgb(0, 49, 2)';
            this.pass = true;
        }
    }
}

// Creates all the CheckPanels based on the CheckPanel's index.
for (let i = 0; i < checkNumber; i++) {
    const checkPanel = new CheckPanel(i);
    panels.push(checkPanel);
}

export default panels;