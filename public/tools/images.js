import checkNumber from "./checkNumber.js";

const images = [];
for (let i = 0; i < checkNumber; i++) {
    const newImage = new Image();
    newImage.src = `../assets/step${i + 1}.webp`; // i + 1 is used since the index is off by one.
    newImage.alt = `step ${i + 1}`;
    newImage.style.height = '100px';
    newImage.style.width = '100px';
    images.push(newImage);
}
export default images;