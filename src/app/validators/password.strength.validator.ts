import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    
    if (!password) return null; // Si no hay contraseña, no validamos

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    if (strength < 3) {
      return { passwordStrength: 'weak' };  
    } else if (strength === 3 || strength === 4) {
      return { passwordStrength: 'medium' }; 
    } 

    return null;

    
    
  };
}