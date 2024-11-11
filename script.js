function createValidation() {
  const fileInput = document.getElementById('reverseImage');
  const message = document.getElementById('floatingMessage');
  const progressBar = document.getElementById('progressBar');
  const progress = document.getElementById('progress');
  const successMessage = document.getElementById('successMessage');
  const validateButton = document.getElementById('validateButton');
  const removeButton = document.getElementById('removeFile');

  if (!fileInput.files.length) {
      message.classList.add('show');
      setTimeout(() => {
          message.classList.remove('show');
      }, 4000);
  } else {
      progressBar.classList.remove('hidden');
      progress.style.width = '0';
      validateButton.disabled = true;
      removeButton.disabled = true;

      // Simular carga de archivo
      let progressValue = 0;
      const interval = setInterval(() => {
          if (progressValue < 100) {
              progressValue += 10;
              progress.style.width = progressValue + '%';
          } else {
              clearInterval(interval);
              progressBar.classList.add('hidden');
              successMessage.classList.add('show');
              setTimeout(() => {
                  successMessage.classList.remove('show');
              }, 4000);
              validateButton.disabled = false;
              removeButton.disabled = false;
          }
      }, 300); // Simula un tiempo de carga
  }
}

function toggleRemoveButton() {
    const fileInput = document.getElementById('reverseImage');
    const removeButton = document.getElementById('removeFile');
    
    if (fileInput.files && fileInput.files.length > 0) {
        removeButton.disabled = false;
    } else {
        removeButton.disabled = true;
    }
}

function removeFile() {
    const fileInput = document.getElementById('reverseImage');
    const removeButton = document.getElementById('removeFile');
    const fileInfo = document.getElementById('fileInfo');
    const floatingMessage = document.getElementById('floatingMessage');
    
    // Limpia el input
    fileInput.value = '';
    
    // Oculta la información del archivo
    fileInfo.classList.remove('show');
    setTimeout(() => {
        fileInfo.classList.add('hidden');
    }, 300);
    
    // Deshabilita el botón
    removeButton.disabled = true;
    
    // Muestra mensaje de eliminación
    floatingMessage.textContent = 'Documento eliminado correctamente';
    floatingMessage.classList.add('delete-message', 'show');
    
    // Oculta el mensaje después de 3 segundos
    setTimeout(() => {
        floatingMessage.classList.remove('show', 'delete-message');
    }, 3000);
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    const fileInfo = document.getElementById('fileInfo');
    const fileName = fileInfo.querySelector('.file-name');
    const fileSize = fileInfo.querySelector('.file-size');
    
    if (file) {
        // Mostrar información del archivo
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        fileInfo.classList.remove('hidden');
        fileInfo.classList.add('show');
        
        // Habilitar botón de eliminar
        toggleRemoveButton();
    } else {
        fileInfo.classList.remove('show');
        setTimeout(() => {
            fileInfo.classList.add('hidden');
        }, 300);
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}