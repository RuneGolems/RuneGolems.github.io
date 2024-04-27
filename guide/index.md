---
layout: default
title: Golem Etching Guide
---

# Golem Etching Guide

Welcome to the Golem Etching Guide! This page provides detailed instructions on how to etch your golem onto Bitcoin.


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
    <a href="/golems" class="back-link">Back to Generator</a>
</div>


<script>
document.addEventListener('DOMContentLoaded', function() {
    const lastGolemImageDisplay = localStorage.getItem('lastGolemImageDisplay');
    const lastGolemImageDownload = localStorage.getItem('lastGolemImageDownload');
    const lastGolemHash = localStorage.getItem('lastGolemHash') || 'RUNE•GOLEM•XXXX';

    if (lastGolemImageDisplay && document.getElementById('lastGolemImage')) {
        document.getElementById('lastGolemImage').src = lastGolemImageDisplay;
    }
    document.getElementById('lastGolemImage').addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = lastGolemImageDownload;
        link.download = `rune•golem•${lastGolemHash}.png`;
        link.click();
    });
    if (lastGolemHash && document.getElementById('runeTicker')) {
        document.getElementById('runeTicker').textContent = `RUNE•GOLEM•${lastGolemHash}`;
    }
    // Initialize custom tooltip for runeTicker
    const runeTicker = document.getElementById('runeTicker');
    runeTicker.addEventListener('mouseover', () => showTooltip(runeTicker, 'Click to copy'));
    runeTicker.addEventListener('mouseout', () => hideTooltip(runeTicker));
    runeTicker.addEventListener('click', () => {
        // After a short delay, revert to the "Click to copy" message
        setTimeout(() => showTooltip(runeTicker, 'Click to copy'), 2000);
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

// Specialized function to show the copy confirmation tooltip
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
        // Use the specific copy confirm tooltip function for the emoji
        showCopyConfirm(emojiContainer, 'Copied!');
    }).catch(err => {
        console.error('Failed to copy emoji to clipboard', err);
    });
}

function copyToClipboard() {
    const runeTicker = document.getElementById('runeTicker');
    const runeTickerText = runeTicker.childNodes[0].nodeValue.trim();
    navigator.clipboard.writeText(runeTickerText).then(() => {
        // Use the specific copy confirm tooltip function for the rune ticker
        showCopyConfirm(runeTicker, 'Copied!');
    }).catch(err => {
        console.error('Failed to copy text to clipboard', err);
        alert('Failed to copy text. Please try again.');
    });
}


</script>
