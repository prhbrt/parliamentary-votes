import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Read more": "Read more",
      "Loading ...": "Loading ...",
      
      "Dutch": "Dutch (Nederlands)",
      "English": "English",
      "Language": "Language",
      "Parliamentary votes": "Parliamentary votes",
      
      "founded in 1614 - top 100 university": "founded in 1614 - top 100 university",
    }
  },
  nl: {
    translation: {
      "Read more": "Meer lezen",
      "Loading ...": "Laden ...",

      "Dutch": "Nederlands",
      "English": "Engels (English)",
      "Language": "Taal",
      "Parliamentary votes": "Parlementaire stemmen",
      "founded in 1614 - top 100 university": "opgericht in 1614 - top 100 universiteit",
    }
  }
};

i18n.use(initReactI18next).init({resources, lng: "nl", interpolation: { escapeValue: false}});

export default i18n;