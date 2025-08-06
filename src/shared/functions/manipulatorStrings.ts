export function removeNonNumeric(str: string): string {
    return str.replace(/\D/g, "");
  }
  export function phoneMask(value: string) {
    if (!value) return "";

    // Remove qualquer caractere não numérico
    value = value.replace(/\D/g, "");

    // Limita o valor a no máximo 11 dígitos
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    // Aplica a máscara (XX) 99999-9999
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");

    return value;
  }
