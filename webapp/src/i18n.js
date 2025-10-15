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

      "f_lower": "lowers",
      "f_higher": "increases",
      "f_saves": "saves",
      "f_costs": "costs",
      "f_budget-neutral": "is budget-neutral on",
      "f_expands": "increases",
      "f_restricts": "restricts",
      "f_neutral": "is neutral to",
      "f_not-participated": "didn't participate in voting on",
      "f_improves": "improves",
      "f_worsens": "worsens",
      "f_n/a": "doesn't affect",
      "unclear": "is unclear whether affects",

      'Votes': 'Votes',
      'Votes (%)': 'Votes (%)',
      "All topics": "All topics",
      "Decisions": "Decisions",
      "Impacts": "Impacts",

      "1+ <PARTY>-vote that <IMPACT> <AREA>": "with <PARTY>-votes that <IMPACT> <AREA>",
      
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

      "f_economic_cost_impact": "de economie",
      "f_environment_impact": "klimaat en milieu",
      "f_fiscal_tag": "belastingen",
      "f_healthcare_impact": "de gezondheidszorg",
      "f_rights_impact": "mensenrechten",
      "f_security_impact": "de veiligheid",
      "f_social_security_impact": "sociale zekerheden",

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

      "f_lower": "verlaagt",
      "f_higher": "verhoogt",
      "f_saves": "bespaart",
      "f_costs": "kost",
      "f_budget-neutral": "budget-neutraal is",
      "f_expands": "vergroot",
      "f_restricts": "beperkt",
      "f_neutral": "neutraal",
      "f_not-participated": "niet gestemd",
      "f_improves": "verbeteren",
      "f_worsens": "verslechteren",
      "f_n/a": "niet beinvloeren",
      "unclear": "onduidelijk beinvloeden",


      'Votes': 'Stemmen',
      'Votes (%)': 'Stemmen (%)',
      "Decisions": "Besluiten",
      "Impacts": "Impacts",

      "1+ <PARTY>-vote that <IMPACT> <AREA>": "met <PARTY>-stemmen die <AREA> <IMPACT>",
    }
  }
};

i18n.use(initReactI18next).init({resources, lng: "nl", interpolation: { escapeValue: false}});

export default i18n;
