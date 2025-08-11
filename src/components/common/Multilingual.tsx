import { useEffect, useState } from "react";
import Dropdown from "../dropdown/dropdown";

// Declare global types
declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

function Multilingual() {
      const [selectedLang, setSelectedLang] = useState("en");
  useEffect(() => {
    window.googleTranslateElementInit = function () {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,fr,ig,ha,yo",
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  const setLanguage = (langCode: string) => {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
      setSelectedLang(langCode);
    }
  };

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
    { code: "ig", label: "Igbo" },
    { code: "ha", label: "Hausa" },
    { code: "yo", label: "Yoruba" },
  ];
  return (
    <div>
      <div id="google_translate_element" className="hidden"/>
      <div>
   <Dropdown
        showArrow={true}
        style="!border-none"
        triggerLabel={languages.find(lang => lang.code === selectedLang)?.label || ""}
      >
        <ul className="space-y-2 text-sm ">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              {lang.label}
            </li>
          ))}
        </ul>
      </Dropdown>


      </div>
    </div>
  );
}

export default Multilingual;