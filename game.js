const levels = [
  [
    { word: "hundur", type: "nafnorð" },
    { word: "hlaupa", type: "sögn" },
    { word: "fallegur", type: "lýsingarorð" },
    { word: "snögglega", type: "atviksorð" }
  ],
  [
    { word: "stelpa", type: "nafnorð" },
    { word: "syngja", type: "sögn" },
    { word: "kaldur", type: "lýsingarorð" },
    { word: "vel", type: "atviksorð" }
  ],
  [
    { word: "bíll", type: "nafnorð" },
    { word: "lesa", type: "sögn" },
    { word: "rauður", type: "lýsingarorð" },
    { word: "núna", type: "atviksorð" }
  ],
  [
    { word: "skóli", type: "nafnorð" },
    { word: "skrifa", type: "sögn" },
    { word: "skemmtilegur", type: "lýsingarorð" },
    { word: "hér", type: "atviksorð" }
  ],
  [
    { word: "maður", type: "nafnorð" },
    { word: "borða", type: "sögn" },
    { word: "góður", type: "lýsingarorð" },
    { word: "oft", type: "atviksorð" }
  ],
  [
    { word: "bók", type: "nafnorð" },
    { word: "sofa", type: "sögn" },
    { word: "langur", type: "lýsingarorð" },
    { word: "seint", type: "atviksorð" }
  ]
];

const wordTypes = [
  "nafnorð",
  "sögn",
  "lýsingarorð",
  "atviksorð"
];

let currentLevel = 0;
let score = 0;
let completed = 0;
let draggedWord = null;
let gameFinished = false;

const wordsDiv = document.querySelector(".words");
const boxesDiv = document.querySelector(".boxes");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("nextButton");

const levelText = document.createElement("h2");
levelText.id = "level";
scoreText.before(levelText);

const feedback = document.createElement("p");
feedback.id = "feedback";
scoreText.after(feedback);

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadLevel() {
  wordsDiv.innerHTML = "";
  boxesDiv.innerHTML = "";
  feedback.textContent = "";
  completed = 0;
  draggedWord = null;

  levelText.textContent = "Verkefni " + (currentLevel + 1);
  nextButton.textContent = "Næsta verkefni";

  const shuffledWords = shuffle([...levels[currentLevel]]);
  const shuffledTypes = shuffle([...wordTypes]);

  shuffledWords.forEach(item => {
    const word = document.createElement("div");

    word.className = "word";
    word.draggable = true;
    word.textContent = item.word;
    word.dataset.type = item.type;

    word.addEventListener("dragstart", () => {
      draggedWord = word;
    });

    wordsDiv.appendChild(word);
  });

  shuffledTypes.forEach(type => {
    const box = document.createElement("div");

    box.className = "box";
    box.dataset.accept = type;
    box.innerHTML = `<strong>${type}</strong>`;

    box.addEventListener("dragover", event => {
      event.preventDefault();
    });

    box.addEventListener("drop", () => {
      if (!draggedWord) return;

      const wordType = draggedWord.dataset.type;
      const boxType = box.dataset.accept;

      if (wordType === boxType) {
        box.appendChild(draggedWord);

        draggedWord.draggable = false;
        draggedWord = null;

        score += 10;
        completed++;

        scoreText.textContent = "Stig: " + score;
        feedback.textContent = "✅ Rétt!";

        if (completed === levels[currentLevel].length) {
          feedback.textContent = "🎉 Vel gert! Þú kláraðir verkefnið. Ýttu á Næsta verkefni.";
        }

      } else {
        feedback.textContent = "❌ Rangt svar! Prófaðu aftur.";
      }
    });

    boxesDiv.appendChild(box);
  });
}

function nextLevel() {
  if (gameFinished) {
    restartGame();
    return;
  }

  currentLevel++;

  if (currentLevel >= levels.length) {
    wordsDiv.innerHTML = "";
    boxesDiv.innerHTML = "";

    levelText.textContent = "🏆 Leik lokið!";
    feedback.textContent = "Þú kláraðir öll verkefnin með " + score + " stig!";
    nextButton.textContent = "Byrja aftur";

    gameFinished = true;
    return;
  }

  loadLevel();
}

function restartGame() {
  currentLevel = 0;
  score = 0;
  completed = 0;
  draggedWord = null;
  gameFinished = false;

  scoreText.textContent = "Stig: 0";
  nextButton.textContent = "Næsta verkefni";

  loadLevel();
}

loadLevel();