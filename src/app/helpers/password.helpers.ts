export function hasCapitalLetter(password: string): boolean {
  return /[A-Z]/.test(password);
}

export function hasNumber(password: string): boolean {
  return /\d/.test(password);
}

export function hasNoSpaces(password: string): boolean {
  return !/\s/.test(password);
}

export function hasSpecialCharacter(password: string): boolean {
  return /[@$!%*?&]/.test(password); // Símbolos permitidos
}

export function isValidLength(password: string): boolean | string {
  return password && password.length >= 8 && password.length <= 20;
}
