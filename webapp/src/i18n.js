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
      "Couldn't get data": "Couldn't get data",
      "Loading data": "Loading data",
      'Political party': 'Political party',
      "economic_cost_impact": "Impact on economy",
      "environment_impact": "Impact on environment",
      "fiscal_tag": "Fiscal impact",
      "healthcare_impact": "impact on healthcare",
      "rights_impact": "Impact on human rights",
      "security_impact": "Impact on security",
      "social_security_impact": "Impact on social security",

      "lower": "lower",
      "higher": "higher",
      "saves": "saves",
      "costs": "costs",
      "budget-neutral": "budget-neutral",
      "expands": "expands",
      "restricts": "restricts",
      "neutral": "neutral",
      "not-participated": "not participated",
      "improves": "improves",
      "worsens": "worsens",
      "n/a": "not applicable",
      "unclear": "unclear",
      'Votes': 'Votes',
      'Votes (%)': 'Votes (%)',
      "All topics": "All topics",
      
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
      "Couldn't get data": "Kon geen data ophalen",
      "Loading data": "Data inladen",
      'Political party': 'Politieke partij',
      "economic_cost_impact": "Impact op de economie",
      "environment_impact": "Impact op het klimaat en milieu",
      "fiscal_tag": "Fiscale impact",
      "healthcare_impact": "impact op de gezondheidszorg",
      "rights_impact": "Impact op mensenrechten",
      "security_impact": "Impact on veiligheid",
      "social_security_impact": "Impact op sociale zekerheden",
      "founded in 1614 - top 100 university": "opgericht in 1614 - top 100 universiteit",

      "All topics": "Alle onderwerpen",
      "Two values": "Alle waarden",
      "Relative": "Relatief",
      "Absolute": "Absoluut",
      "Keywords": "Zoektermen",
      "decisions": "besluiten",

      "lower": "lager",
      "higher": "hoger",
      "saves": "bespaart",
      "costs": "kost",
      "budget-neutral": "budget-neutraal",
      "expands": "vergroot",
      "restricts": "beperkt",
      "neutral": "neutraal",
      "not-participated": "niet gestemd",
      "improves": "verbeterd",
      "worsens": "verslechterd",
      "n/a": "niet van toepassing",
      "unclear": "onduidelijk",
      'Votes': 'Stemmen',
      'Votes (%)': 'Stemmen (%)',

    }
  }
};

i18n.use(initReactI18next).init({resources, lng: "nl", interpolation: { escapeValue: false}});

export default i18n;
