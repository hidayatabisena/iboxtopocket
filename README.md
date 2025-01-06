# iBoxToPocket

![App Screenshot](https://res.cloudinary.com/moyadev/image/upload/v1736133842/sena/iboxToPocket_ubftqh.png)

## Description
iBoxToPocket is a Chrome extension that helps users convert product prices into daily savings amounts over a 100-day period. When users visit the iBox website, the extension automatically displays how much they need to save each day to afford a product.

## Features
- Displays the daily savings amount in a user-friendly format.
- Simple and intuitive user interface.

## Installation
1. **Clone the repository**:
```bash
git clone https://github.com/hidayatabisena/iBoxToPocket.git
cd iBoxToPocket
```
2. **Load the extension in Chrome**:
- Open Chrome and navigate to chrome://extensions/.
- Enable Developer mode in the top right corner.
- Click on Load unpacked and select the directory where the extension files are located.

## Usage
- Navigate to the iBox website (e.g., https://ibox.co.id/catalog/iphone-15-816?device=iphone).
- Click the extension icon to view the popup and manually trigger the conversion if needed.

## Files
- `manifest.json`: The configuration file for the Chrome extension.
- `content.js`: The content script that scan iBox website to convert prices into daily savings amount.
- `popup.js`: The script that handles the popup functionality.
- `popup.html`: The HTML for the extension's popup action.
- `styles.css`: Styles for the popup.
- `images/`: Contains images used in the extension (e.g., logos).
- `icons/`: Contains icons for the extension.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## Acknowledgments

Powered by [MAIA](https://maia.id/) - Mayar AI Assistant.