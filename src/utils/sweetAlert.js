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

export default Swal
