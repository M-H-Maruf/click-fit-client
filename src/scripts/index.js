$(document).ready(() => {
    // preloader appearance disappearance
    $('#preloader').delay(1000).slideUp(500, function () {
        // Slide up the preloader, then fadeIn the content
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

                // clear image preview
                $('#image-preview').empty();

                // clear selected files from the input
                $('#file-input').val('');

                // show bootstrap Toast
                showToast('Images uploaded successfully!');
            },
            error: (error) => {
                console.error('Error uploading images:', error);

                // show bootstrap toast for error
                showToast('Error uploading images. Please try again.', 'error');
            }
        });

        const showToast = (message, type = 'success') => {
            const toast = $('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">');
            toast.addClass(`toast-${type}`);
            toast.text(message);
            toast.attr('style', `padding:20px; text-align: center; z-index: 1000;`);

            // apply inline styles based on toast type
            if (type === 'success') {
                toast.attr('style', `background-color: #28a745; color: #fff; ${toast.attr('style')}`);
            } else if (type === 'error') {
                toast.attr('style', `background-color: #dc3545; color: #fff; ${toast.attr('style')}`);
            }

            $('.toast-container').append(toast);

            // initialize and show the toast
            $('.toast').toast('show');

            // remove the toast element after it is hidden
            toast.on('hidden.bs.toast', function () {
                $(this).remove();
            });
        };
    };
});