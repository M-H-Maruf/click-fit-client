$(document).ready(() => {
    // preloader appearance disappearance
    $('#preloader').delay(1000).fadeOut(500, function () {
        $('#content').fadeIn(500);
    });

    // ajax call to numbers api
    $.ajax({
        url: 'http://numbersapi.com/1/30/date?json',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            $('#api-content').html(data.text).addClass('fade-in');
        },
        error: function (error) {
            console.log('Error fetching API data:', error);
        }
    });
    // drag and drop Image Handling
    const dropArea = document.getElementById('image-drop');

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('active');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('active');
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('active');

        const files = e.dataTransfer.files;
        showImagePreview(files);
    });

    // file input change handling
    $('#file-input').on('change', function () {
        const files = this.files;
        showImagePreview(files);
    });

    // upload button click handling
    $('#upload-button').on('click', () => {
        const files = $('#file-input').get(0).files;
        showImagePreview(files);
        uploadImages(files); 
    });

    const showImagePreview = (files) => {
        const imagePreview = document.getElementById('image-preview');
        imagePreview.innerHTML = '';

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '100%';
                imagePreview.appendChild(img);
            };
            reader.readAsDataURL(files[i]);
        }
    };

    const uploadImages = (files) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        // ajax call to upload images
        $.ajax({
            url: 'http://localhost:5000/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: (data) => {
                console.log('Images uploaded successfully:', data);
            },
            error: (error) => {
                console.error('Error uploading images:', error);
            }
        });
    };
});