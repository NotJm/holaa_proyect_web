import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Verifica si localStorage está disponible
  isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Guarda un valor en localStorage (como string)
  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      try {
        localStorage.setItem(key, value); 
      } catch (error) {
        console.error('Error al guardar en localStorage:', error);
      }
    } else {
      console.warn('localStorage no está disponible');
    }
  }

  // Obtiene un valor de localStorage (como string)
  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      try {
        return localStorage.getItem(key); 
      } catch (error) {
        console.error('Error al leer de localStorage:', error);
        return null;
      }
    } else {
      console.warn('localStorage no está disponible');
      return null;
    }
  }

  // Elimina un ítem de localStorage
  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error al eliminar de localStorage:', error);
      }
    } else {
      console.warn('localStorage no está disponible');
    }
  }
}
