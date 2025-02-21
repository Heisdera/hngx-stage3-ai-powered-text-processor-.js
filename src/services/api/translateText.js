// Fake API call to translate text for demo purposes
export const translateText = async (text, targetLanguage) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Translated text in ${targetLanguage}`);
    }, 1000);
  });
};
