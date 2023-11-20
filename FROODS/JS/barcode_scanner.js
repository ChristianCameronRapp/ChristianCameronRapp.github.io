window.addEventListener('barcodeScanned', (event) => {
    const scannedBarcode = event.detail;
    console.log('Scanned Barcode:', scannedBarcode);
    // You can now do whatever you need with the scanned barcode
  });