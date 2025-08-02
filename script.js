const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const speakBtn = document.getElementById("speak");
const copyBtn = document.getElementById("copy");
const tweetBtn = document.getElementById("tweet");

// ✅ Custom quote list
const customQuotes = [
  { content: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { content: "Success doesn’t just find you. You have to go out and get it.", author: "Unknown" },
  { content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { content: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Anonymous" },
  { content: "Dream it. Wish it. Do it.", author: "Unknown" }
];

async function fetchFromAPI() {
  try {
    quoteText.textContent = "Loading...";
    authorText.textContent = "";
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    quoteText.textContent = `"${data.content}"`;
    authorText.textContent = `- ${data.author}`;
  } catch (error) {
    quoteText.textContent = "Failed to fetch quote from API.";
    authorText.textContent = "";
  }
}

function fetchFromCustom() {
  const randomIndex = Math.floor(Math.random() * customQuotes.length);
  const data = customQuotes[randomIndex];
  quoteText.textContent = `"${data.content}"`;
  authorText.textContent = `- ${data.author}`;
}

function getQuote() {
  const useCustom = Math.random() < 0.5; // 50% chance
  if (useCustom) {
    fetchFromCustom();
  } else {
    fetchFromAPI();
  }
}

newQuoteBtn.addEventListener("click", getQuote);

speakBtn.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(quoteText.textContent);
  speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`${quoteText.textContent} ${authorText.textContent}`);
  alert("Quote copied to clipboard!");
});

tweetBtn.addEventListener("click", () => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quoteText.textContent + " " + authorText.textContent
  )}`;
  window.open(tweetUrl, "_blank");
});

getQuote();
