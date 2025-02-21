// Fake API call to summarize text for demo purposes
export const summarizeText = async (text) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("This is a summary of the text.");
    }, 1000);
  });
};
