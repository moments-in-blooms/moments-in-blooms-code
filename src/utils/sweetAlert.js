import Swal from 'sweetalert2'

const baseConfig = {
  customClass: {
    popup: 'mib-swal-popup',
    title: 'mib-swal-title',
    htmlContainer: 'mib-swal-text',
    confirmButton: 'mib-swal-confirm',
    cancelButton: 'mib-swal-cancel',
  },
  buttonsStyling: false,
  heightAuto: false,
}

export const showSuccess = (title = 'Success', text) =>
  Swal.fire({
    ...baseConfig,
    position: 'center',
    icon: 'success',
    title,
    text,
    timer: 2200,
    showConfirmButton: false,
    timerProgressBar: true,
  })

export const showError = (title = 'Error', text) =>
  Swal.fire({
    ...baseConfig,
    icon: 'error',
    title,
    text,
    confirmButtonText: 'OK',
  })

export const showInfo = (title, text) =>
  Swal.fire({
    ...baseConfig,
    icon: 'info',
    title,
    text,
    timer: 2200,
    showConfirmButton: false,
    timerProgressBar: true,
  })

export const showConfirm = (title, text, confirmText = 'Confirm', cancelText = 'Cancel') =>
  Swal.fire({
    ...baseConfig,
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  })

export default Swal
