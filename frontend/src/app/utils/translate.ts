declare global {
  interface Window {
    googleTranslateElementInit: any;
    google: any;
  }
}

export const changeLanguage = (lang: string) => {
  const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;

  if (!select) {
    console.warn("Google Translate not initialized yet");
    return;
  }

  select.value = lang;
  select.dispatchEvent(new Event("change"));
};