export const article = document.querySelector("article")

if (article) {
  const text:any = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words:string[]  = [...text.matchAll(wordMatchRegExp)];

  // matchAll returns an iterator, convert to array to get word count
  const wordCount = words.length;
  const readingTime: number = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date:any = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}