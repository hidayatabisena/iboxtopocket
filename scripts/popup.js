/**
* @file popup.js
* @description Popup script that handles the button click to convert prices on the active tab.
*/

/**
* Adds an event listener to the "convert-prices" button.
* When clicked, it executes a script on the active tab to convert prices.
*/

document.getElementById('convert-prices').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].id) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          /**
          * Converts a price into a daily savings amount over 100 days.
          * @param {number} price - The price to convert.
          * @returns {string} The daily savings amount formatted as Indonesian Rupiah (IDR).
          */
          function convertToDailySavings(price) {
            const dailySavings = price / 100;
            return dailySavings.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
          }
          
          /**
          * Converts prices on the page to daily savings amounts and updates the DOM.
          */
          function convertPricesOnPage() {
            const priceRegex = /Rp\s*(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/g;
            
            /**
            * Processes a single text node to find prices and convert them.
            * @param {Node} node - The text node to process.
            */
            function processTextNode(node) {
              const text = node.nodeValue;
              const matches = text.match(priceRegex);

              if (matches) {
                let newText = text;
                let dailySavings = null; 

                matches.forEach(match => {
                  const price = parseFloat(match.replace(/[^0-9,-]+/g, '').replace(',', '.'));
                  dailySavings = convertToDailySavings(price); 
                  const replacementText = `${match} (Nabung ${dailySavings} setiap hari selama 100 hari).`;
                  newText = newText.replace(match, replacementText);
                });

                const newSpan = document.createElement('span');
                newSpan.innerHTML = newText;
                newSpan.style.color = 'green';
                newSpan.style.cursor = 'pointer';
                newSpan.title = `Nabung ${dailySavings} setiap hari selama 100 hari`; 
                if (node.parentNode) {
                  node.parentNode.replaceChild(newSpan, node);
                }
              }
            }
            
            /**
            * Recursively traverses the DOM tree and processes text nodes to convert prices.
            * @param {Node} node - The current node in the DOM tree.
            */
            function walkDOM(node) {
              if (node.nodeType === 3) { 
                // Text node
                processTextNode(node);
              } else if (node.nodeType === 1 && node.tagName.toLowerCase() !== 'script') { 
                // Element node, exclude <script> tags
                Array.from(node.childNodes).forEach(walkDOM);
              }
            }

            walkDOM(document.body);
          }

          convertPricesOnPage();
        }
      });
    } else {
      console.error("No active tab found.");
    }
  });
});
