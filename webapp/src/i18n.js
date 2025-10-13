import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Letter template
      "Dear Sir or Madam,": "Dear Sir or Madam,",
      "You are receiving a personal letter with information about digital care. This information is based on the answers you have given.": "You are receiving a personal letter with information about digital care. This information is based on the answers you have given.",
      "We hope this letter has informed you well about digital care. In the UK, you can contact the following for digital support: xxxxx. For more information or comments, you can send an email to:": "We hope this letter has informed you well about digital care. In the UK, you can contact the following for digital support: xxxxx. For more information or comments, you can send an email to:",
      "Kind regards,": "Kind regards,",
      "Researcher, UMCG": "Researcher, UMCG",

      "Please finish all the questions before downloading the letter. Thank you!": "Please finish all the questions before downloading the letter. Thank you!",

      "Read more": "Read more",
      "Loading ...": "Loading ...",
      "Download advice": "Download advice",
      "Show video": "Show video",
      "Read advice": "Read advice",
      "Close advice": "Close advice",
      "Show advice": "Show advice",
      "Advice Letter and video": "Advice Letter and video",
      "Advice video": "Advice video",
      "Advice Letter": "Advice Letter",

      "Dutch": "Dutch (Nederlands)",
      "English": "English",
      "German": "German (Deutsch)",
      "Start with the questions": "Start with the questions",

      "Explanation of project": "Text with explanation about the tool and how to use it",
      "About this project": "About this project",
      "Contact": "Contact",
      "Activities and outreach": "Activities and outreach",
      "Your video": "Your video",
      "Download video": "Download video",
      "Your letter": "Your letter",
      "Yes": "Yes",
      "No": "No",
      "Start again": "Start again with questionnaire",
      "Language": "Language",

      "founded in 1614 - top 100 university": "founded in 1614 - top 100 university",
      "Questionnaire": "Questionnaire",
      "Great!": "Great!",
      "Go to Esther Mettings page!": "Go to Esther Mettings page!",
      'Share via Email': 'Share via Email',
      'Share via Whatsapp': 'Share via WhatsApp',

      "Print letter": "Print Letter",

      // Introduction:
      "Answer 10 short questions": "Answer 10 short questions and discover how digital health can support you in your health or illness. You will receive personal advice in a letter and a video. The letter and video will appear directly on this page. We do not store any information. If you want, you can share the letter and video via WhatsApp or email.",
      "Digital health can help you take care of your health.": "Digital health can help you take care of your health. We also call this e-health. For example: a video call with your GP using your laptop, tablet, or phone. Or a smart app that helps you improve your fitness or keep track of your blood sugar. Digital tools that help you live at home longer are also part of e-health. (Source: Dutch Patients Federation)",
      "Examples of digital health are:": "Examples of digital health are:",
      "an appointment with your doctor via video: e-consult": "an appointment with your doctor via video: e-consult",
      "therapy with a psychologist in a secure online environment": "therapy with a psychologist in a secure online environment",
      "a doctor who monitors you from a distance: home monitoring": "a doctor who monitors you from a distance: home monitoring",
      "measuring devices such as a blood pressure monitor with an app, sending results directly to your doctor": "measuring devices such as a blood pressure monitor with an app, sending results directly to your doctor",


    }
  },
  nl: {
    translation: {
      // Letter template
      "Dear Sir or Madam,": "Geachte heer, mevrouw,",
      "You are receiving a personal letter with information about digital care. This information is based on the answers you have given.": "Hierbij ontvangt u een persoonlijke brief met informatie over digitale zorg. Deze informatie is gebaseerd op de antwoorden die u hebt gegeven.",
      "We hope this letter has informed you well about digital care. In the UK, you can contact the following for digital support: xxxxx. For more information or comments, you can send an email to:": "Hopelijk heeft deze brief u voldoende geïnformeerd over digitale zorg. In Nederland kunt u hier terecht voor digitale ondersteuning: xxxxx. Voor meer informatie of opmerkingen kunt u een mail sturen naar:",
      "Kind regards,": "Hartelijke groeten,",
      "Researcher, UMCG": "Onderzoeker UMCG",

      "Please finish all the questions before downloading the letter. Thank you!": "Beantwoord alle vragen voordat u de brief opvraagt. Alvast bedankt!",

      "Read more": "Meer lezen",
      "Loading ...": "Laden ...",
      "Download advice": "Advies downloaden",
      "Show video": "Laat video zien",
      "Read advice": "Advies lezen",
      "Close advice": "Advies sluiten",
      "Show advice": "Advies tonen",
      "Advice Letter and video": "Adviesbrief en -video",
      "Advice video": "Adviesvideo",
      "Advice Letter": "Adviesbrief",

      "Dutch": "Nederlands",
      "English": "Engels (English)",
      "German": "Duits (Deutsch)",

      "Start with the questions": "Begin met de vragen",

      "Explanation of project": "Tekst en uitleg over de tool en hoe hem te gebruiken",
      "About this project": "Over dit project",
      "Contact": "Contact",
      "Activities and outreach": "Activiteiten en outreach",
      "Your video": "Jouw video",
      "Download video": "Download video",
      "Your letter": "Youw brief",
      "Yes": "Ja",
      "No": "Nee",
      "Start again": "Start opnieuw met de vragen",
      "Language": "Taal",
      "founded in 1614 - top 100 university": "opgericht in 1614 - top 100 universiteit",
      "Questionnaire": "Questionnaire",
      "Great!": "Fantastisch!",
      "Go to Esther Mettings page!": "Ga naar de pagina van Esther Metting!",
      'Share via Email': 'Delen via Email',
      'Share via Whatsapp': 'Delen via WhatsApp',
      "Print letter": "Brief afdrukken",

      // Introduction:
      "Answer 10 short questions": "Beantwoord 10 korte vragen en ontdek hoe digitale zorg u kan helpen bij uw gezondheid of ziekte. U ontvangt persoonlijk advies in een brief en een filmpje. De brief en het filmpje verschijnen direct op deze pagina. Wij slaan geen informatie op. U kunt de brief en het filmpje wel delen via WhatsApp of e-mail als u dat wilt.",
      "Digital health can help you take care of your health.": "Digitale zorg kan je ondersteunen bij je gezondheid. We noemen dit ook wel e-health. Een voorbeeld hiervan is een beeldbelafspraak met je huisarts via je laptop, tablet of mobiel. Of een slimme app om je conditie te verbeteren of je bloedglucose bij te houden. Maar ook digitale hulpmiddelen waardoor je langer thuis kunt wonen vallen onder e-health (bron: patientenfederatie Nederland).",
      "Examples of digital health are:": "Voorbeelden van digitale zorg zijn:",
      "an appointment with your doctor via video: e-consult": "een afspraak met je arts via beeldbellen: e-consult;",
      "therapy with a psychologist in a secure online environment": "therapie bij de psycholoog via een beveiligde omgeving op internet;",
      "a doctor who monitors you from a distance: home monitoring": "de arts die je volgt op afstand: thuismonitoring;",
      "measuring devices such as a blood pressure monitor with an app, sending results directly to your doctor": "meetapparatuur zoals een bloeddrukmeter met een bijbehorende app. De meetresultaten stuur je direct door naar je arts.",

    }
  },
  de: {
    translation: {
      // Letter template
      "Dear Sir or Madam,": "Sehr geehrte Damen und Herren,",
      "You are receiving a personal letter with information about digital care. This information is based on the answers you have given.": "Sie erhalten hiermit ein persönliches Schreiben mit Informationen über digitale Gesundheit. Diese Informationen basieren auf den Antworten, die Sie gegeben haben.",
      "We hope this letter has informed you well about digital care. In the UK, you can contact the following for digital support: xxxxx. For more information or comments, you can send an email to:": "Wir hoffen, dass Sie mit diesem Schreiben ausreichend über digitale Gesundheit informiert wurden. In Deutschland erhalten Sie hier digitale Unterstützung: xxxxx. Für weitere Informationen oder Rückmeldungen können Sie eine E-Mail senden an:",
      "Kind regards,": "Mit freundlichen Grüßen,",
      "Researcher, UMCG": "Forscherin, UMCG",
      

      "Please finish all the questions before downloading the letter. Thank you!": "Bitte beantworten Sie alle Fragen, bevor Sie den Brief herunterladen. Vielen Dank!",

      "Read more": "Mehr lesen",
      "Loading ...": "Laden ...",
      "Download advice": "Ratschlag herunterladen",
      "Show video": "Video anzeigen",
      "Read advice": "Ratschlag lesen",
      "Close advice": "Ratschlag schließen",
      "Show advice": "Beratung anzeigen",
      "Advice Letter and video": "Beratungsschreiben und Video",
      "Advice video": "Beratungsvideo",
      "Advice Letter": "Beratungsschreiben",


      "Dutch": "Niederländisch (Nederlands)",
      "English": "Englisch (English)",
      "German": "Deutsch",

      "Start with the questions": "Mit den Fragen beginnen",
      
      "Explanation of project": "Text mit Erklärung über das Tool und wie man es benutzt",
      "About this project": "Über dieses Projekt",
      "Contact": "Kontakt",
      "Activities and outreach": "Aktivitäten und Öffentlichkeitsarbeit",
      "Your video": "Dein Video",
      "Download video": "Video herunterladen",
      "Your letter": "Dein Brief",
      "Yes": "Ja",
      "No": "Nein",
      "Start again": "Fragebogen neu starten",
      "Language": "Sprache",

      "founded in 1614 - top 100 university": "gegründet 1614 - Top-100-Universität",
      "Questionnaire": "Fragebogen",
      "Great!": "Großartig!",
      "Go to Esther Mettings page!": "Gehe zur Seite von Esther Metting!",
      "Share via Email": "Per E-Mail teilen",
      "Share via Whatsapp": "Per WhatsApp teilen",
      "Print letter": "Brief drucken",

      // Introduction:
      "Answer 10 short questions": "Beantworten Sie 10 kurze Fragen und erfahren Sie, wie digitale Gesundheit Sie bei Ihrer Gesundheit oder Krankheit unterstützen kann. Sie erhalten eine persönliche Empfehlung in einem Brief und in einem Video. Der Brief und das Video erscheinen direkt auf dieser Seite. Wir speichern keine Informationen. Wenn Sie möchten, können Sie den Brief und das Video per WhatsApp oder E-Mail weiterleiten.",
      "Digital health can help you take care of your health.": "Digitale Gesundheit kann Ihnen helfen, besser auf Ihre Gesundheit zu achten. Wir nennen das auch E-Health. Ein Beispiel ist ein Videotermin mit Ihrem Hausarzt über Laptop, Tablet oder Handy. Oder eine App, die Ihnen hilft, Ihre Fitness zu verbessern oder Ihren Blutzucker zu kontrollieren. Auch digitale Hilfsmittel, die es ermöglichen, länger zu Hause zu wohnen, gehören zu E-Health. (Quelle: Patientenfederatie Niederlande)",
      "Examples of digital health are:": "Beispiele für digitale Gesundheit:",
      "an appointment with your doctor via video: e-consult": "ein Termin mit Ihrem Arzt per Videogespräch: E-Consult",
      "therapy with a psychologist in a secure online environment": "Therapie bei einem Psychologen über eine geschützte Online-Umgebung",
      "a doctor who monitors you from a distance: home monitoring": "der Arzt, der Sie aus der Ferne betreut: Telemonitoring",
      "measuring devices such as a blood pressure monitor with an app, sending results directly to your doctor": "Messgeräte wie ein Blutdruckmessgerät mit App, die Ihre Ergebnisse direkt an den Arzt schickt",
    }
  }
};

i18n.use(initReactI18next).init({resources, lng: "nl", interpolation: { escapeValue: false}});

export default i18n;