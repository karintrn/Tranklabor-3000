// all functions
function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

function renderHand(container, hand) {
  container.innerHTML = "";
  hand.forEach((cardFilename, idx) => {
    const img = document.createElement("img");
    img.src = `allCards/${cardFilename}`;
    img.alt = cardFilename;
    img.dataset.index = idx;
    container.appendChild(img);
  });
}

// prepare game
function initialDeal() {
  player1 = [];
  player2 = [];
  middle = [];

  if (deck.length < HAND_SIZE * 2 + 3) {
    console.warn("Nicht genug Karten im Deck, mische neu.");
    deck = [...cards];
    shuffle(deck);
  }

  player1 = deck.splice(0, HAND_SIZE);
  player2 = deck.splice(0, HAND_SIZE);
  middle = deck.splice(0, 3);

  updateHUD();
  renderAll();
}

function updateHUD() {
  roundCounterEl.textContent = `Runde: ${roundNumber}`;
  deckCountEl.textContent = `Deck: ${deck.length}`;
  playerScoreEl.textContent = `P1: ${player1Points} | P2: ${player2Points}`;
}

function renderAll() {
  renderHand(player1Hand, player1);
  renderHand(player2Hand, player2);
  renderHand(middleCards, middle);
}

function refillHandsAndMiddle() {
  while (player1.length < HAND_SIZE && deck.length > 0) player1.push(deck.shift());
  while (player2.length < HAND_SIZE && deck.length > 0) player2.push(deck.shift());
  while (middle.length < 3 && deck.length > 0) middle.push(deck.shift());
  updateHUD();
  renderAll();
}

function calculatePotion(cards) {
  // values and colors
  const valueOf = (c) => {
    if (c.startsWith("ace")) return 1;
    if (c.startsWith("jack")) return 0;
    if (c.startsWith("queen")) return 0;
    if (c.startsWith("king")) return 0;
    return parseInt(c);
  };
  const suitOf = (c) => ["clubs", "diamonds", "hearts", "spades"].find(s => c.includes(s));

  const values = cards.map(valueOf);
  const suits = cards.map(suitOf);
  const sum = values.reduce((a, b) => a + b, 0);

  const has = (rank) => cards.some(c => c.startsWith(rank));
  const allEqual = values.every(v => v === values[0]);
  const allSameSuit = suits.every(s => s === suits[0]);

  // some values....
  let points = sum;
  let type = "Normaler Trank";
  let exploded = false;

  // special potions
  if (allEqual) {
    type = "Dreifachtrank";
    points = 10;
  } 
  else if (allSameSuit) {
    type = "Reiner Trank";
    points = sum + 3;
  } 
  else if (sum === 13) {
    type = "Perfekter Trank";
    points = 15;
  }

  if (has("jack")) points += 2 * cards.filter(c => c.startsWith("jack")).length;

  // check explosion
  const safeTrank = allEqual || allSameSuit || sum === 13;
  if (!safeTrank && sum > 13) {
    if (has("queen") || has("king") || has("ace")) {
      type = "Glückstrank";
      // points remain the same, explosion prevented
    } else {
      type = "Explosion";
      points = -3;
      exploded = true;
    }
  }

  return { type, points, sum, exploded };
}


////////////////////////////////////////////////////////////
// Card positions
let player1Hand = document.getElementById("player1-hand");
let player2Hand = document.getElementById("player2-hand");
let middleCards = document.getElementById("middle-cards");
let roundCounterEl = document.getElementById("round-counter");
let deckCountEl = document.getElementById("deck-count");
let endRoundBtn = document.getElementById("end-round-btn");
let brewBtn = document.getElementById("brew-btn");
let resultEl = document.getElementById("potion-result");
// let drawPile = document.getElementById("draw-pile");

// Scoreboard style
let playerScoreEl = document.createElement("div");
playerScoreEl.style.marginTop = "10px";
playerScoreEl.style.marginBottom = "10px";
playerScoreEl.style.color = "white";
playerScoreEl.style.fontSize = "20px";
document.body.appendChild(playerScoreEl);

resultEl.style.fontSize = "20px"


// All cards
const cards = [
  "2_of_clubs.png","2_of_diamonds.png","2_of_hearts.png","2_of_spades.png",
  "3_of_clubs.png","3_of_diamonds.png","3_of_hearts.png","3_of_spades.png",
  "4_of_clubs.png","4_of_diamonds.png","4_of_hearts.png","4_of_spades.png",
  "5_of_clubs.png","5_of_diamonds.png","5_of_hearts.png","5_of_spades.png",
  "6_of_clubs.png","6_of_diamonds.png","6_of_hearts.png","6_of_spades.png",
  "7_of_clubs.png","7_of_diamonds.png","7_of_hearts.png","7_of_spades.png",
  "8_of_clubs.png","8_of_diamonds.png","8_of_hearts.png","8_of_spades.png",
  "9_of_clubs.png","9_of_diamonds.png","9_of_hearts.png","9_of_spades.png",
  "10_of_clubs.png","10_of_diamonds.png","10_of_hearts.png","10_of_spades.png",
  "jack_of_clubs.png","jack_of_diamonds.png","jack_of_hearts.png","jack_of_spades.png",
  "queen_of_clubs.png","queen_of_diamonds.png","queen_of_hearts.png","queen_of_spades.png",
  "king_of_clubs.png","king_of_diamonds.png","king_of_hearts.png","king_of_spades.png",
  "ace_of_clubs.png","ace_of_diamonds.png","ace_of_hearts.png","ace_of_spades.png"
];

shuffle(cards);

// Game state
const HAND_SIZE = 3;
const MAX_ROUNDS = 5;
let deck = [...cards];
let player1 = [];
let player2 = [];
let middle = [];
let roundNumber = 1;
let currentPlayer = 1;
let player1Points = 0;
let player2Points = 0;
let selectedCards = [];
let needsRefill = false;

// Refill hands and middle for current player
function performRefillForCurrentPlayer() {
  if (currentPlayer === 1) {
    while (player1.length < HAND_SIZE && deck.length > 0) player1.push(deck.shift());
  } else {
    while (player2.length < HAND_SIZE && deck.length > 0) player2.push(deck.shift());
  }

  while (middle.length < 3 && deck.length > 0) middle.push(deck.shift());

  needsRefill = false;

  if (currentPlayer === 1) {
    currentPlayer = 2;
    resultEl.textContent = "Spieler 2 ist dran!";
    renderAll();
    updateHUD();
    return;
  }

  roundNumber++;
  refillHandsAndMiddle();
  updateHUD();
  if (roundNumber > MAX_ROUNDS) {
    let winner = player1Points > player2Points ? "Spieler 1 gewinnt!" :
                 player2Points > player1Points ? "Spieler 2 gewinnt!" : "Unentschieden!";
    alert(`Spiel vorbei! ${winner}`);
    brewBtn.disabled = true;
    return;
  }
  currentPlayer = 1;
  resultEl.textContent = `Neue Runde ${roundNumber} → Spieler 1 ist dran!`;
  renderAll();
}

// Draw pile click
endRoundBtn.addEventListener("click", () => {
  if (!needsRefill) return;
  performRefillForCurrentPlayer();
});

// End round button
endRoundBtn.addEventListener("click", () => {
  if (!needsRefill) {
    refillHandsAndMiddle();
    return;
  }
  performRefillForCurrentPlayer();
});

// Card selection
document.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") return;

  let handContainer = currentPlayer === 1 ? player1Hand : player2Hand;
  let isHandCard = e.target.closest(`#${handContainer.id}`);
  let isMiddleCard = e.target.closest("#middle-cards");

  if (!isHandCard && !isMiddleCard) return;

  const cardName = e.target.src.split("/").pop();
  let middleSelectedCount = selectedCards.filter(c => middle.includes(c)).length;

  if (isMiddleCard && !e.target.classList.contains("selected") && middleSelectedCount >= 1) return;
  if (!e.target.classList.contains("selected") && selectedCards.length >= 3) return;

  if (e.target.classList.contains("selected")) {
    e.target.classList.remove("selected");
    selectedCards = selectedCards.filter(c => c !== cardName);
  } else {
    e.target.classList.add("selected");
    selectedCards.push(cardName);
  }

  resultEl.textContent = `Spieler ${currentPlayer} ausgewählt: ${selectedCards.length} / 3 Karten`;
  brewBtn.disabled = selectedCards.length !== 3;
});

// remove used cards from middle when brewing
brewBtn.addEventListener("click", () => {
  if (selectedCards.length !== 3) return;

  const result = calculatePotion(selectedCards);

  if (currentPlayer === 1) {
    player1Points += result.points;
    player1 = player1.filter(c => !selectedCards.includes(c));
  } else {
    player2Points += result.points;
    player2 = player2.filter(c => !selectedCards.includes(c));
  }

  // update middle
  middle = middle.filter(c => !selectedCards.includes(c));

  selectedCards = [];
  brewBtn.disabled = true;
  resultEl.textContent = `Spieler ${currentPlayer} braute: ${result.type} (${result.sum} → ${result.points})`;
  updateHUD();
  renderAll();

  needsRefill = true;
});

// Start gane
initialDeal();
resultEl.textContent = "Spieler 1 ist dran!";
updateHUD();