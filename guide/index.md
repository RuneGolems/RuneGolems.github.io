---
layout: default
title: Golem Etching Guide
---
# Golem Etching Guide

### Auto-fill:

Follow these steps to automatically generate all rune details:

1. **Auto-fill:** Click the link below the table to automatically generate all rune details.
2. **Logo:** Upload the golem you downloaded (can also click the image within the below table to save).
3. **Submit Etch:** Once you have double-checked all details are correct, proceed to submit your etch.

### Manual:

If you prefer to manually enter the details, follow these steps:

1. **Visit the Minting Page:** Head over to [Luminex](https://luminex.io/runes/mint){:target="_blank"}.
2. **Etch Your Golem:** Once there, click on the **Etch** button to start the etching process.
3. **Enter the Details:**
   - **Icon/Logo:** Upload the golem you downloaded (can also click the image within the below table to save).
   - **Rune Ticker:** Find the Rune Ticker from the table below and click to copy it to your clipboard.
   - **Symbol:** Similarly, copy the emoji by clicking on the image.
   - **Ensure all other details from the table are correctly entered.**
4. **Submit Etch:** Once you have double-checked all details are correct, proceed to submit your etch.
   <!-- - *Once etching has been submitted, it will take 6 blocks to confirm & appear in your wallet.* -->

<div class="info-table">
    <table>
        <tr>
            <th>LOGO</th>
            <td><img id="lastGolemImage" src="" alt="Last Generated Golem"></td>
        </tr>
        <tr>
            <th>RUNE TICKER</th>
            <td id="runeTicker" onclick="copyToClipboard()" style="cursor: pointer;">
                RUNE•GOLEM•XXXX
                <span class="tooltip">Click to copy</span>
                <span class="copy-confirm">Copied!</span>
            </td>
        </tr>
        <tr>
            <th>DECIMALS</th>
            <td>0</td>
        </tr>
        <tr>
            <th>SYMBOL</th>
            <td>
                <div class="emoji-container" onclick="copyEmoji()">
                    <img src="/assets/rock.png" alt="Rock" class="rock-icon">
                    <span id="hiddenEmoji" style="display:none;">🪨</span>
                    <span class="tooltip">Click to copy emoji</span>
                    <span id="copyConfirm" class="copy-confirm">Copied!</span>
                </div>
            </td>
        </tr>
        <tr>
            <th>MAX SUPPLY</th>
            <td>1</td>
        </tr>
        <tr>
            <th>LIMIT PER MINT</th>
            <td>1</td>
        </tr>
        <tr>
            <th>RESERVE SUPPLY</th>
            <td><span style="color: green;">✔ (set to 1)</span></td>
        </tr>
    </table>
</div>

<div class="link-container">
    <a href="#" id="generate-link" class="back-link">Auto-fill details for Etching</a>
</div>

To generate another Golem, click the link below to return to the generator.

<div class="link-container">
    <a href="/golems" class="back-link">Back to Generator</a>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const lastGolemImage = localStorage.getItem('lastGolemImage');
    const lastGolemHash = localStorage.getItem('lastGolemHash') || 'RUNE•GOLEM•XXXX';

    if (lastGolemImage && document.getElementById('lastGolemImage')) {
        document.getElementById('lastGolemImage').src = lastGolemImage;
        document.getElementById('lastGolemImage').addEventListener('click', function() {
            const link = document.createElement('a');
            link.href = lastGolemImage;
            link.download = `rune•golem•${lastGolemHash}.png`;
            link.click();
        });
    }

    if (lastGolemHash && document.getElementById('runeTicker')) {
        document.getElementById('runeTicker').textContent = `RUNE•GOLEM•${lastGolemHash}`;
        // Initialize custom tooltip for runeTicker
        const runeTicker = document.getElementById('runeTicker');
        runeTicker.addEventListener('mouseover', () => showTooltip(runeTicker, 'Click to copy'));
        runeTicker.addEventListener('mouseout', () => hideTooltip(runeTicker));
        runeTicker.addEventListener('click', () => {
            // After a short delay, revert to the "Click to copy" message
            setTimeout(() => showTooltip(runeTicker, 'Click to copy'), 2000);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const generateLink = document.getElementById('generate-link');
    generateLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the link
        const lastGolemHash = localStorage.getItem('lastGolemHash') || 'XXXX'; // Get the last generated Golem hash
        const link = `https://luminex.io/runes/mint?tab=Etch&ticker=RUNE•GOLEM•${lastGolemHash}&decimals=0&symbol=%F0%9F%AA%A8&maxSupply=1&limitPerMint=1&premine=1`;
        window.open(link, '_blank'); // Open the generated link in a new tab
    });
});

function showTooltip(target, message, customClass = 'tooltip') {
    let tooltip = target.querySelector(`.${customClass}`);
    if (!tooltip) {
        tooltip = document.createElement('span');
        tooltip.className = customClass;
        target.appendChild(tooltip);
    }
    tooltip.textContent = message;
    tooltip.style.display = 'block';
}

function hideTooltip(target, customClass = 'tooltip') {
    let tooltip = target.querySelector(`.${customClass}`);
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

function showCopyConfirm(target, message) {
    showTooltip(target, message, 'copy-confirm');
    setTimeout(() => {
        hideTooltip(target, 'copy-confirm');
    }, 2000);
}

function copyEmoji() {
    const emojiContainer = document.querySelector('.emoji-container');
    const emoji = document.getElementById('hiddenEmoji').textContent;
    navigator.clipboard.writeText(emoji).then(() => {
        showCopyConfirm(emojiContainer, 'Copied!');
    }).catch(err => {
        console.error('Failed to copy emoji to clipboard', err);
    });
}

function copyToClipboard() {
    const runeTicker = document.getElementById('runeTicker');
    const runeTickerText = runeTicker.childNodes[0].nodeValue.trim();
    navigator.clipboard.writeText(runeTickerText).then(() => {
        showCopyConfirm(runeTicker, 'Copied!');
    }).catch(err => {
        console.error('Failed to copy text to clipboard', err);
        alert('Failed to copy text. Please try again.');
    });
}
</script>
