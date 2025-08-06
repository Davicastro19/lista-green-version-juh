

const localUrl = 'https://www.listagreen.com.br';
export function shareOnWhatsApp(url: string) {
  const urlFormat = `${localUrl}/${url}`;
  const message = encodeURIComponent(`Confira este link: ${urlFormat}`);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
  window.open(whatsappUrl, '_blank');
}

export function shareOnFacebook(url: string) {
  const urlFormat = `${localUrl}/${url}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${urlFormat}`;
  window.open(facebookUrl, '_blank');
}

export function shareOnTelegram(url: string) {
  const urlFormat = `${localUrl}/${url}`;
  const telegramUrl = `https://t.me/share/url?url=${urlFormat}&text=Confira este link!`;
  window.open(telegramUrl, '_blank');
}
export function navigateWhatsapp(phoneNumber: string) {
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=55${phoneNumber.replace(/\)/g, '').replace(/\(/g, '').replace(/-/g, '').replace(" ", "")}&text=Encontrei+o+seu+neg%C3%B3cio+na+Listagreen.com.br.+Gostaria+de+saber+mais+sobre+...&type=phone_number&app_absent=0`;
  window.open(whatsappUrl, "_blank");
}
export function copyLink(url: string) {
  navigator.clipboard.writeText(`${localUrl}/${url}`)
    .then(() => {
      //toast.success("Copiado")
    })
    .catch((error) => {
      console.error('Erro ao copiar o link:', error);
    });
}




export function createSlug(name: string): string {
  return name?.normalize("NFD")
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim();
}

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};


export function imageReplace(area: string): string {

  if (!area) return "/images/logo/logo-lista-dark.svg";
  else if (area.toLowerCase().includes('consciente')) {
    return "/images/design-consciente.png";
  } else if (area.toLowerCase().includes("estar")) {
    return "/images/saude-e-bem-estar.png";
  } else if (area.toLowerCase().includes('terra')) {
    return "/images/producao-da-terra.png";
  } else if (area.toLowerCase().includes('cuidado')) {
    return "/images/cuidado-e-preservacao.png";
  } else if (area.toLowerCase().includes('construção')) {
    return "/images/construcao-sustentavel.png";

  } else return "/images/construcao-sustentavel.png";
};


export function formatListName(slug: string): string {
  return slug
    .split("-")
    //.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
