const SECRET_PASSWORD = "311225";
const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/playlist/37i9dQZF1DX50QitC6Oqtn?utm_source=generator";

const screens = document.querySelectorAll(".screen");
const passwordForm = document.querySelector("#passwordForm");
const passwordInput = document.querySelector("#passwordInput");
const passwordMessage = document.querySelector("#passwordMessage");
const connectionForm = document.querySelector("#connectionForm");
const connectionResult = document.querySelector("#connectionResult strong");
const spotifyButton = document.querySelector("#spotifyButton");
const spotifyFrame = document.querySelector("#spotifyFrame");
const letterButton = document.querySelector("#letterButton");
const letterCopy = document.querySelector("#letterCopy");
const silenceButton = document.querySelector("#silenceButton");

let currentScreen = document.querySelector(".screen.active");
let isTransitioning = false;

const symbolicResults = [
  "Conexão inevitável",
  "Vocês se reconhecem em silêncio",
  "Almas que já se entendem",
  "Um reencontro que ainda respira",
  "Sentimento que atravessa o tempo"
];

function showScreen(targetId) {
  const nextScreen = document.getElementById(targetId);

  if (!nextScreen || nextScreen === currentScreen || isTransitioning) {
    return;
  }

  isTransitioning = true;
  document.body.classList.remove("silence-mode");
  currentScreen.classList.add("exiting");

  window.setTimeout(() => {
    currentScreen.classList.remove("active", "exiting");
    nextScreen.classList.add("active");
    currentScreen = nextScreen;
    isTransitioning = false;
  }, 620);
}

function validatePassword(event) {
  event.preventDefault();

  const typedPassword = passwordInput.value.trim();

  if (typedPassword === SECRET_PASSWORD) {
    passwordMessage.textContent = "Chave reconhecida. Atravessando...";
    passwordMessage.classList.add("ok");
    passwordInput.value = "";
    window.setTimeout(() => showScreen("travessia"), 500);
    return;
  }

  passwordMessage.textContent = "A chave ainda não abriu. Tente novamente com calma.";
  passwordMessage.classList.remove("ok");
  passwordInput.select();
}

function revealConnection(event) {
  event.preventDefault();

  const formData = new FormData(connectionForm);
  const signature = [...formData.values()].join("");
  const charTotal = [...signature].reduce((total, character) => total + character.charCodeAt(0), 0);
  const result = symbolicResults[charTotal % symbolicResults.length];

  connectionResult.textContent = result;
  connectionResult.animate(
    [
      { opacity: 0, transform: "translateY(10px) scale(0.98)" },
      { opacity: 1, transform: "translateY(0) scale(1)" }
    ],
    { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
  );
}

function loadSpotifyPlayer() {
  if (!spotifyFrame.querySelector("iframe")) {
    const iframe = document.createElement("iframe");
    iframe.title = "Player do Spotify do Refúgio";
    iframe.src = SPOTIFY_EMBED_URL;
    iframe.width = "100%";
    iframe.height = "152";
    iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
    iframe.loading = "lazy";
    spotifyFrame.appendChild(iframe);
  }

  spotifyFrame.classList.remove("hidden");
  spotifyButton.textContent = "som do Refúgio aberto";
}

function unlockLetter() {
  letterCopy.classList.remove("hidden");
  letterButton.textContent = "carta desbloqueada";
}

function toggleSilenceMode() {
  document.body.classList.toggle("silence-mode");
  silenceButton.textContent = document.body.classList.contains("silence-mode") ? "voltar palavras" : "modo silêncio";
}

document.querySelectorAll("[data-target]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.target));
});

passwordForm.addEventListener("submit", validatePassword);
connectionForm.addEventListener("submit", revealConnection);
spotifyButton.addEventListener("click", loadSpotifyPlayer);
letterButton.addEventListener("click", unlockLetter);
silenceButton.addEventListener("click", toggleSilenceMode);
