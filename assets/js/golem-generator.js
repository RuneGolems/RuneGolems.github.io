document.addEventListener('DOMContentLoaded', function() {
    setupNavbarToggle();
    setupPageSpecificListeners();
    setupGolemListeners(); // Setup listeners related to the golem interaction
});



const backgrounds = [
    '/assets/traits/bg/background(red).png',
    '/assets/traits/bg/background(white).png',
    '/assets/traits/bg/background(blue).png',
    '/assets/traits/bg/background(green).png',
    '/assets/traits/bg/background(orange).png',
];
const bodies = [
    '/assets/traits/body/body(rock).png',
    '/assets/traits/body/body(blue).png',
    '/assets/traits/body/body(pink).png',
    '/assets/traits/body/body(green).png',
];
const hats = [
    '/assets/traits/hats/not.png',
    '/assets/traits/hats/grass(hat).png',
    '/assets/traits/hats/phat(green).png',
    '/assets/traits/hats/phat(purp).png',
    '/assets/traits/hats/phat(red).png',
    '/assets/traits/hats/phat(blue).png',
    '/assets/traits/hats/phat(white).png',
    '/assets/traits/hats/phat(yellow).png',
    '/assets/traits/hats/band(black).png',
    '/assets/traits/hats/band(white).png',
    '/assets/traits/hats/beanie(blue).png',
    '/assets/traits/hats/excalibur.png',
    '/assets/traits/hats/topHat.png',
    '/assets/traits/hats/strawHat.png',
];
const runes = [
    '/assets/traits/runes/not.png',
    '/assets/traits/runes/rune-(1).png',
    '/assets/traits/runes/rune-(2).png',
    '/assets/traits/runes/rune-(3).png',
    '/assets/traits/runes/rune-(4).png',
    '/assets/traits/runes/rune-(5).png',
    '/assets/traits/runes/rune-(6).png',
    '/assets/traits/runes/rune-(7).png',
    '/assets/traits/runes/rune-(8).png',
    '/assets/traits/runes/rune-(9).png',
    '/assets/traits/runes/rune-(10).png',
    '/assets/traits/runes/rune-(11).png',
];

function setupNavbarToggle() {
    const hamburger = document.querySelector('.navbar-hamburger');
    const navContent = document.querySelector('.navbar-content');

    if (hamburger && navContent) {
        hamburger.addEventListener('click', function() {
            navContent.classList.toggle('show');
        });
    }
}

function setupPageSpecificListeners() {
    const generateButton = document.getElementById('generateButton');
    const downloadButton = document.getElementById('downloadButton');

    if (generateButton) {
        generateButton.addEventListener('click', async function() {
            await handleGenerateButtonClick();
        });
    }

    if (downloadButton) {
        downloadButton.addEventListener('click', async function() {
            await handleDownloadButtonClick();
        });
    }
}




async function handleGenerateButtonClick() {
    try {
        const traits = pickRandomTraits();
        displayGolem(traits);
        const hash = await generateAlphaHash(traits);
        await generateAndSaveCompositeImage(traits);
        updateDisplayHash(hash);
    } catch (error) {
        console.error("An error occurred during the generation process: ", error);
        alert('Failed to generate golem. Please try again.');
    }
}



async function handleDownloadButtonClick() {
    await downloadGolem();
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function pickRandomTraits() {
    return {
        background: getRandomItem(backgrounds),
        body: getRandomItem(bodies),
        rune: getRandomItem(runes),
        hat: getRandomItem(hats)
    };
}

function isValidTraits(traits) {
    for (const key in traits) {
        if (traits[key] === undefined) {
            return false;
        }
    }
    return true;
}



function decodeHashToTraits(hash) {
    const num = base26ToInt(hash);
    const hatIndex = Math.floor(num / 240);
    const remainderAfterHat = num % 240;
    const runeIndex = Math.floor(remainderAfterHat / 20);
    const remainderAfterRune = remainderAfterHat % 20;
    const backgroundIndex = Math.floor(remainderAfterRune / 4);
    const bodyIndex = remainderAfterRune % 4;
    
    return {
        background: backgrounds[backgroundIndex],
        body: bodies[bodyIndex],
        rune: runes[runeIndex],
        hat: hats[hatIndex]
    };
}

function base26ToInt(hash) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = 0;
    for (let i = 0; i < hash.length; i++) {
        result = result * 26 + characters.indexOf(hash[i]);
    }
    return result;
}

async function setGolemFromHash(hash) {
    const traits = decodeHashToTraits(hash);
    displayGolem(traits);
    
    await generateAndSaveCompositeImage(traits);
    await downloadGolem();
}



function displayGolem(traits) {
    document.getElementById('golemBackground').src = traits.background;
    document.getElementById('golemBody').src = traits.body;
    document.getElementById('golemRune').src = traits.rune;
    document.getElementById('golemHat').src = traits.hat;
}


async function generateAndSaveCompositeImage(traits) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 18;  // Default size for display
    canvas.height = 18;

    const imagesToLoad = [
        document.getElementById('golemBackground').src,
        document.getElementById('golemBody').src,
        document.getElementById('golemRune').src,
        document.getElementById('golemHat').src
    ];

    try {
        const images = await Promise.all(imagesToLoad.map(loadImage));
        images.forEach(img => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
        const dataUrl = canvas.toDataURL('image/png');
        localStorage.setItem('lastGolemImage', dataUrl); // Store only one image
    } catch (error) {
        console.error("Failed to load one or more images: ", error);
    }
}



async function downloadGolem() {
    // Retrieve the last saved download image URL from localStorage
    const dataUrl = localStorage.getItem('lastGolemImage');
    if (!dataUrl) {
        console.error("No saved golem image available for download.");
        return;
    }

    // Optionally fetch the hash if it needs to be part of the file name
    const hash = localStorage.getItem('lastGolemHash');
    if (!hash) {
        console.error("No saved golem hash available for naming the file.");
        return;
    }

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.download = `rune•golem•${hash}.png`;
    link.href = dataUrl;
    link.click();
}


function getTraitIndex(trait, array) {
    return array.indexOf(trait);
}

async function generateAlphaHash(traits) {
    const backgroundIndex = getTraitIndex(traits.background, backgrounds);
    const bodyIndex = getTraitIndex(traits.body, bodies);
    const hatIndex = getTraitIndex(traits.hat, hats);
    const runeIndex = getTraitIndex(traits.rune, runes);

    const encodedNum = bodyIndex + backgroundIndex * 4 + runeIndex * 20 + hatIndex * 240;
    const hash = intToBase26(encodedNum);
    return hash;
}

function intToBase26(num) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    while (num > 0) {
        const remainder = num % 26;
        result = characters[remainder] + result;
        num = Math.floor(num / 26);
    }
    return result.padStart(4, 'A');
}


function updateDisplayHash(hash) {
    let hashDisplay = document.getElementById('hashDisplay');
    if (!hashDisplay) {
        hashDisplay = document.createElement('div');
        hashDisplay.id = 'hashDisplay';
        document.body.appendChild(hashDisplay);
    }
    // Store the last golem hash in localStorage
    localStorage.setItem('lastGolemHash', hash);

    // Update content with new hash information
    hashDisplay.innerHTML = `
        <h>Unique ID: ${hash}</h>
        <a href="/guide" style="display: block; margin-top: 10px;">Go to Etching Guide Page</a>
    `;
}


function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image from source: ${src}`));
        img.src = src;
    });
}
