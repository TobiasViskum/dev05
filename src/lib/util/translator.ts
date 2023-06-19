let language: string = "";

export const setProfileData_Utilites = (profileData: ProfileData) => {
  language = profileData.language;
};

export const translator = (sentence: string) => {
  const isDanish = language == "danish" ? true : false;

  const findTranslationArray: { [key: string]: string } = {
    "Select an option": isDanish ? "Vælg en mulighed" : "Select an option",

    "Adding exercise": isDanish ? "Tilføjer øvelse" : "Adding exercise",

    "No date set": isDanish ? "Ingen dato sat" : "No date set",

    "Search": isDanish ? "Søg" : "Search",

    "Ungrouped": isDanish ? "Ugrupperet" : "Ungrouped",

    "Exercise already exists": isDanish ? "Øvelse eksisterer allerede" : "Exercise already exists",

    "Maximum length": isDanish ? "Maksimal længde" : "Maximum length",

    "Already exists": isDanish ? "Eksisterer allerede" : "Already exists",

    "Fitness Exercise": isDanish ? "Styrkeøvelse" : "Fitness Exercise",

    "Create": isDanish ? "Lav" : "Create",

    "New": isDanish ? "Ny" : "New",

    "General": isDanish ? "Generalt" : "General",

    "Settings": isDanish ? "Indstillinger" : "Settings",

    "Center note text": isDanish ? "Centrer notetekst" : "Center note text",

    "Language": isDanish ? "Sprog" : "Language",

    "Yes": isDanish ? "Ja" : "Yes",

    "No": isDanish ? "Nej" : "No",

    "Fitness": isDanish ? "Styrke" : "Fitness",

    "Default": isDanish ? "Standard" : "Default",

    "Reps": isDanish ? "Gentagelser" : "Reps",

    "Max": isDanish ? "Maks" : "Max",

    "reps": isDanish ? "gentagelser" : "reps",

    "max": isDanish ? "maks" : "max",

    "Show Pain Score (VAS)": isDanish ? "Vis Smertevurdering (VAS)" : "Show Pain Score (VAS)",

    "Pain Score (VAS)": isDanish ? "Smertevurdering (VAS)" : "Pain Score (VAS)",

    "Cardio": isDanish ? "Kondition" : "Cardio",

    "It looks quite empty": isDanish ? "Det ser rimelig tomt ud" : "It looks quite empty",

    "Work harder": isDanish ? "Arbejd hårdere" : "Work harder",

    "New Exercise": isDanish ? "Ny Øvelse" : "New Exercise",

    "Add Exercise": isDanish ? "Tilføj Øvelse" : "Add Exercise",

    "Name": isDanish ? "Navn" : "Name",

    "Running": isDanish ? "Løb" : "Running",

    "Swimming": isDanish ? "Svømning" : "Swimming",

    "Cycling": isDanish ? "Cykling" : "Cycling",

    "Home": isDanish ? "Hjem" : "Home",

    "Are you sure": isDanish ? "Er du sikker" : "Are you sure",

    "Updating": isDanish ? "Opdaterer" : "Updating",

    "Bar Graph": isDanish ? "Søjlediagram" : "Bar Graph",

    "Line Graph": isDanish ? "Kurve" : "Line Graph",

    "Date": isDanish ? "Dato" : "Date",

    "Delete": isDanish ? "Slet" : "Delete",

    "Group": isDanish ? "Gruppe" : "Group",

    "Unit": isDanish ? "Enhed" : "Unit",

    "Rep range": isDanish ? "Gentagelse intervaller" : "Rep range",

    "Compete": isDanish ? "Konkurrer" : "Compete",

    "Notes": isDanish ? "Noter" : "Notes",

    "km/h": isDanish ? "km/t" : "km/h",

    "Hours": isDanish ? "Timer" : "Hours",

    "Minutes": isDanish ? "Minutter" : "Minutes",

    "Seconds": isDanish ? "Sekunder" : "Seconds",

    "Average Speed": isDanish ? "Gennemsnitlig fart" : "Average Speed",

    "All": isDanish ? "Alle" : "All",

    "Please select a valid discipline": isDanish
      ? "Vælg en gyldig disciplin"
      : "Please select a valid discipline",

    "You have currently selected": isDanish
      ? "Lige nu har du valgt"
      : "You have currently selected",

    "Filters": isDanish ? "Filtre" : "Filters",

    "Select swimming stroke": isDanish ? "Vælg stilart" : "Select swimming stroke",

    "Medley": isDanish ? "Medley" : "Medley",

    "Crawl": isDanish ? "Crawl" : "Crawl",

    "Breaststroke": isDanish ? "Brystsvømning" : "Breaststroke",

    "Butterfly": isDanish ? "Butterfly" : "Butterfly",

    "Backstroke": isDanish ? "Rygcrawl" : "Backstroke",

    "Profile Name": isDanish ? "Profilnavn" : "Profile Name",

    "Family": isDanish ? "Familien" : "Family",

    "Filter by": isDanish ? "Filtrér på" : "Filter by",

    "Sports": isDanish ? "Sport" : "Sports",

    "Outdoor": isDanish ? "Udendørs" : "Outdoor",

    "Social": isDanish ? "Hygge" : "Social",

    "Profiles": isDanish ? "Profiler" : "Profiles",

    "New Name": isDanish ? "Nyt Navn" : "New Name",
  };

  return findTranslationArray[sentence];
};
