(function (global) {
  "use strict";
  const dictionaries = global.ForgottenFootprintsLocales || {};
  const supported = new Set(["en", "ar"]);
  const storageKey = "forgotten-footprints-language";
  let language = "en";

  function getSavedLanguage() {
    try {
      const stored = global.localStorage.getItem(storageKey);
      if (supported.has(stored)) return stored;
    } catch { /* file origins and private modes may disable storage */ }
    return global.navigator.language && global.navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";
  }

  function translate(key) {
    return (dictionaries[language] && dictionaries[language][key]) || (dictionaries.en && dictionaries.en[key]) || key;
  }

  function apply(nextLanguage) {
    language = supported.has(nextLanguage) ? nextLanguage : "en";
    const dictionary = dictionaries[language] || dictionaries.en || {};
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.classList.toggle("is-arabic", language === "ar");
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const value = dictionary[element.dataset.i18n];
      if (value !== undefined) element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
      const value = dictionary[element.dataset.i18nAria];
      if (value !== undefined) element.setAttribute("aria-label", value);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      const value = dictionary[element.dataset.i18nPlaceholder];
      if (value !== undefined) element.setAttribute("placeholder", value);
    });
    const pageTitleKey = document.body && document.body.dataset.titleKey;
    if (pageTitleKey && dictionary[pageTitleKey]) document.title = "Forgotten Footprints — " + dictionary[pageTitleKey];
    document.querySelectorAll("[data-language-label]").forEach(function (element) {
      element.textContent = language === "en" ? "العربية" : "English";
    });
    try { global.localStorage.setItem(storageKey, language); } catch { /* language stays active for this page session */ }
    document.dispatchEvent(new CustomEvent("languagechange", { detail: { language: language } }));
  }

  global.ForgottenFootprints = {
    get language() { return language; },
    t: translate,
    setLanguage: apply,
    toggleLanguage: function () { apply(language === "en" ? "ar" : "en"); }
  };
  apply(getSavedLanguage());
}(window));
