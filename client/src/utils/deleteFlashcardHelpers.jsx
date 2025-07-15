export function shortenedText(fullText, charLimit) { 
  if (fullText.length > charLimit) {
    return `${fullText.slice(0, charLimit - 1)} ...`;
  } else { 
    return fullText;
  }
}