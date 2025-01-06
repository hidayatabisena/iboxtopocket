/**
* @file content.js
* @description Content script that runs on all pages to convert prices into daily savings amounts.
*/

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
  const elements = document.body.getElementsByTagName('*');

  for (let element of elements) {
    if (element.childNodes.length > 0) {
      element.childNodes.forEach(node => {
        if (node.nodeType === 3) {
          const text = node.nodeValue;
          const matches = text.match(priceRegex);

          if (matches) {
            matches.forEach(match => {
              const price = parseFloat(match.replace(/[^0-9,-]+/g, '').replace(',', '.'));
              const dailySavings = convertToDailySavings(price);

              const newText = document.createElement('span');
              newText.innerHTML = `${match} (Nabung ${dailySavings} setiap hari selama 100 hari).`;
              newText.style.color = 'green';
              newText.style.cursor = 'pointer';
              newText.title = `Nabung ${dailySavings} setiap hari selama 100 hari.`;

              if (node.parentNode) {
                node.parentNode.replaceChild(newText, node);
              }
            });
          }
        }
      });
    }
  }
}

convertPricesOnPage();
