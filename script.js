function generateQRCode() {
    const url = document.getElementById('url').value;
    const color = document.getElementById('color-picker').value;

    if (!url) {
        alert("Please enter a URL!");
        return;
    }

    const qrContainer = document.getElementById('qr-container');
    qrContainer.innerHTML = '';

    let qrStyle = {
        color: { dark: color, light: '#ffffff' },
        width: 256,  
        height: 256, 
        margin: 4    
    };

    QRCode.toCanvas(document.createElement('canvas'), url, qrStyle, function (error, canvas) {
        if (error) {
            console.error('QR Code generation failed:', error);
            alert("Failed to generate QR Code!");
            return;
        }

        qrContainer.appendChild(canvas);

        const downloadBtn = document.getElementById('download-btn');
        downloadBtn.style.display = 'inline-block';

        downloadBtn.onclick = function () {
            const highResCanvas = document.createElement('canvas');
            highResCanvas.width = 4096;  
            highResCanvas.height = 4096; 

            QRCode.toCanvas(highResCanvas, url, {
                color: { dark: color, light: '#ffffff' },
                width: 4096,  
                height: 4096, 
                margin: 4     
            }, function (error) {
                if (error) {
                    console.error('QR Code generation failed:', error);
                    alert("Failed to generate high-res QR Code!");
                    return;
                }

                const link = document.createElement('a');
                link.href = highResCanvas.toDataURL('image/png');
                link.download = 'qr-code-4k.png'; 
                link.click();
            });
        };
    });
}

document.getElementById('generate-btn').addEventListener('click', generateQRCode);
