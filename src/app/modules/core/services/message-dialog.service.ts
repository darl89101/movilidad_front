import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessageDialogService {
  constructor() {}

  showSuccess(html: string) {
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: '¡Correcto!',
      html: html,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  showError(html: string) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      html: html,
      showConfirmButton: true,
    });
  }

  showQuestion(text: string) {
    const swal = Swal.fire({
      title: '¿Estás seguro?',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3699FF',
      cancelButtonColor: '#F64E60',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    });
    swal.then((res) => {
      if (res.isConfirmed) {
        Swal.showLoading();
      }
    });

    return swal;
  }
}
