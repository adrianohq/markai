window.addEventListener('load', function () {
    var photoInput = document.getElementById('photoInput');
    var photoInput2 = document.getElementById('photoInput2');
    var downloadButton1 = document.getElementById('downloadButton1');
    var downloadButton2 = document.getElementById('downloadButton2');
    var resetButton = document.getElementById('resetButton');
    var ctx = resultCanvas.getContext('2d');
    var ctx2 = resultCanvas2.getContext('2d');
    var maskImage = new Image();
    var maskImage2 = new Image();
    maskImage.src = 'mask.png';
    maskImage2.src = 'mask2.png';

    resetButton.addEventListener('click', function () {
        // Limpar os campos e ocultar os botões de download
        resultCanvas.style.display = 'none';
        resultCanvas2.style.display = 'none';
        downloadButton1.style.display = 'none';
        downloadButton2.style.display = 'none';
        photoInput.value = ''; // Limpar o input de arquivo
        photoInput2.value = ''; // Limpar o segundo input de arquivo
    });

    function applyMask(image, canvas, mask) {
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.style.display = 'block';

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        context.globalAlpha = 1;
        context.drawImage(mask, 0, 0, canvas.width, canvas.height);
    }

    photoInput.addEventListener('change', function (e) {
        var file = e.target.files[0];
        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var photoImage = new Image();
                photoImage.src = e.target.result;

                photoImage.onload = function () {
                    applyMask(photoImage, resultCanvas, maskImage);
                    downloadButton1.style.display = 'block';
                };
            };

            reader.readAsDataURL(file);
        }
    });

    photoInput2.addEventListener('change', function (e) {
        var file = e.target.files[0];
        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var photoImage = new Image();
                photoImage.src = e.target.result;

                photoImage.onload = function () {
                    applyMask(photoImage, resultCanvas2, maskImage2);
                    downloadButton2.style.display = 'block';
                };
            };

            reader.readAsDataURL(file);
        }
    });

    downloadButton1.addEventListener('click', function () {
        var pdf = new jsPDF();
        var width = 210;
        var scaleFactor = width / resultCanvas.width;
        var height = resultCanvas.height * scaleFactor;
        pdf.addImage(resultCanvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, width, height);
        pdf.save('05-Notificação.pdf');
    });

    downloadButton2.addEventListener('click', function () {
        var pdf = new jsPDF();
        var width = 210;
        var scaleFactor = width / resultCanvas2.width;
        var height = resultCanvas2.height * scaleFactor;
        pdf.addImage(resultCanvas2.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, width, height);
        pdf.save('03-Notificação.pdf');
    });
});
