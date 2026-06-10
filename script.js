const SECRET_PASSWORD = "amor";

const screens = document.querySelectorAll(".screen");
const statusPill = document.querySelector("#systemStatus");
const passwordForm = document.querySelector("#passwordForm");
const passwordInput = document.querySelector("#passwordInput");
const passwordMessage = document.querySelector("#passwordMessage");
const starMessage = document.querySelector("#starMessage");
const messageButton = document.querySelector("#messageButton");
const loveMessage = document.querySelector("#loveMessage");

const transmissions = [
  "Você é meu acaso favorito virando destino todos os dias.",
  "Se eu pudesse morar em um lugar, escolheria o instante em que você sorri.",
  "Nosso amor é meu fenômeno celeste preferido: raro, bonito e impossível de ignorar.",
  "Mesmo quando o céu escurece, pensar em você acende uma constelação inteira.",
  "Eu te escolheria em qualquer versão do universo."
];

function showScreen(targetId) {
  const targetScreen = document.getElementById(targetId);

  if (!targetScreen) {
    return;
  }

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen === targetScreen);
  });

  const screenLabel = targetScreen.dataset.screen || "Sistema";
  statusPill.textContent = targetId === "entrada" ? "Acesso bloqueado" : `Módulo ativo: ${screenLabel}`;

  if (targetId !== "entrada") {
    statusPill.classList.add("unlocked");
  } else {
    statusPill.classList.remove("unlocked");
  }
}

function validatePassword(event) {
  event.preventDefault();

  const typedPassword = passwordInput.value.trim().toLowerCase();

  if (typedPassword === SECRET_PASSWORD) {
    passwordMessage.textContent = "Senha aceita. Abrindo rota segura...";
    passwordMessage.classList.add("ok");
    passwordInput.value = "";
    window.setTimeout(() => showScreen("senha-correta"), 650);
    return;
  }

  passwordMessage.textContent = "Senha incorreta. Tente a palavra que resume nós dois.";
  passwordMessage.classList.remove("ok");
  passwordInput.select();
}

function revealStarMessage(event) {
  const note = event.currentTarget.dataset.note;
  starMessage.textContent = note;
  starMessage.animate(
    [
      { opacity: 0, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    { duration: 420, easing: "ease-out" }
  );
}

function generateTransmission() {
  const currentMessage = loveMessage.textContent;
  const availableMessages = transmissions.filter((message) => message !== currentMessage);
  const nextMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];

  loveMessage.textContent = nextMessage;
  loveMessage.animate(
    [
      { opacity: 0, transform: "scale(0.97)" },
      { opacity: 1, transform: "scale(1)" }
    ],
    { duration: 460, easing: "ease-out" }
  );
}

document.querySelectorAll("[data-target]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.target));
});

document.querySelectorAll(".star-node").forEach((star) => {
  star.addEventListener("click", revealStarMessage);
});

passwordForm.addEventListener("submit", validatePassword);
messageButton.addEventListener("click", generateTransmission);
