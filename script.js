const bundles = [
  {
    tema: "Pag-ibig",
    talinghaga: [
      "Pusong papel", 
      "Bulong ng damdamin", 
      "Apoy na walang abo"
    ],
    saknong: "5 saknong, 5 taludtod bawat isa",
    tugma: "Tugmaang Ganap",
    color: "#ff6b6b"
  },
  {
    tema: "Kalikasan",
    talinghaga: [
      "Mata ng bagyo", 
      "Liwanag sa ulan", 
      "Halakhak ng hangin"
    ],
    saknong: "4 saknong, 5 taludtod bawat isa",
    tugma: "Tugmaang Di-Ganap",
    color: "#4ecdc4"
  },
  {
    tema: "Bayan / Pagkamakabayan",
    talinghaga: [
      "Dugo't pawis ng bayan", 
      "Kamay na bakal", 
      "Bilog ang mundo"
    ],
    saknong: "6 saknong, 3 taludtod bawat isa",
    tugma: "Tugmaang Ganap",
    color: "#45b7d1"
  },
  {
    tema: "Kabataan / Pangarap",
    talinghaga: [
      "Gulong ng buhay", 
      "Mga bituin sa dilim", 
      "Isang hakbang sa ulap"
    ],
    saknong: "5 saknong, 4 taludtod bawat isa",
    tugma: "Tugmaang Ganap",
    color: "#f9ca24"
  },
  {
    tema: "Pamilya / Sakripisyo",
    talinghaga: [
      "Haligi ng tahanan", 
      "Tinik sa dibdib", 
      "Tangan ang ilaw ng pag-asa"
    ],
    saknong: "4 saknong, 6 taludtod bawat isa",
    tugma: "Tugmaang Di-Ganap",
    color: "#6c5ce7"
  },
  {
    tema: "Kamatayan / Pag-aalala",
    talinghaga: [
      "Huling hininga ng araw", 
      "Mga luha ng ulap", 
      "Tulay na naputol"
    ],
    saknong: "5 saknong, 4 taludtod bawat isa",
    tugma: "Tugmaang Ganap",
    color: "#fd79a8"
  },
  {
    tema: "Pakikipagkaibigan",
    talinghaga: [
      "Mga kamay na nagtutulungan", 
      "Ilaw sa kadiliman", 
      "Tulay ng pagmamahalan"
    ],
    saknong: "6 saknong, 4 taludtod bawat isa",
    tugma: "Tugmaang Di-Ganap",
    color: "#00b894"
  },
  {
    tema: "Edukasyon / Karunungan",
    talinghaga: [
      "Susi ng kinabukasan", 
      "Punong walang katapusan", 
      "Liwanag sa isipan"
    ],
    saknong: "5 saknong, 5 taludtod bawat isa",
    tugma: "Tugmaang Di-Ganap",
    color: "#e17055"
  }
];

let audioContext;
try {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
} catch (e) {
  console.log('Web Audio API not supported');
}

function createSparkles(element) {
  if (!element) return;
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    element.appendChild(sparkle);
    setTimeout(() => {
      if (sparkle && sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 1000);
  }
}

function drawGumball() {
  const button = document.querySelector('.draw-button');
  const gumball = document.getElementById('gumball');
  const result = document.getElementById('result');
  if (!button || !gumball || !result) return;

  button.classList.add('spinning');
  button.textContent = '🎲 Drawing...';

  result.style.display = 'none';
  result.classList.remove('show');
  gumball.style.display = 'none';

  setTimeout(() => {
    const pick = bundles[Math.floor(Math.random() * bundles.length)];
    gumball.style.display = 'block';
    gumball.style.background = `radial-gradient(circle at 30% 30%, ${pick.color}, ${pick.color}dd)`;
    gumball.classList.add('gumball-bounce');
    createSparkles(gumball);

    const temaEl = document.getElementById("tema");
    const talinghagaEl = document.getElementById("talinghaga");
    const saknongEl = document.getElementById("saknong");
    const tugmaEl = document.getElementById("tugma");

    if (temaEl) temaEl.textContent = pick.tema;
    if (talinghagaEl) {
      talinghagaEl.innerHTML = pick.talinghaga.map(item => `<li>${item}</li>`).join('');
    }
    if (saknongEl) saknongEl.textContent = pick.saknong;
    if (tugmaEl) tugmaEl.textContent = pick.tugma;

    setTimeout(() => {
      result.style.display = "block";
      setTimeout(() => result.classList.add('show'), 50);
      button.classList.remove('spinning');
      button.textContent = 'Click to Draw';
      const resetBtn = document.getElementById('resetBtn');
      if (resetBtn) resetBtn.style.display = 'inline-block';
    }, 500);

    setTimeout(() => {
      gumball.classList.remove('gumball-bounce');
    }, 1000);

  }, 800);
}

function resetMachine() {
  const gumball = document.getElementById('gumball');
  const result = document.getElementById('result');
  const resetBtn = document.getElementById('resetBtn');
  if (gumball) gumball.style.display = 'none';
  if (result) {
    result.style.display = 'none';
    result.classList.remove('show');
  }
  if (resetBtn) resetBtn.style.display = 'none';
}

function playClickSound() {
  if (!audioContext) return;
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.log('Error playing sound:', e);
  }
}

// ✅ Final DOM Ready Handler with Music Play
document.addEventListener('DOMContentLoaded', () => {
  const drawButton = document.querySelector('.draw-button');
  const resetButton = document.getElementById('resetBtn');

  if (drawButton) {
    drawButton.addEventListener('click', () => {
      const bgMusic = document.getElementById('bg-music');
      if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(e => console.log("Autoplay blocked:", e));
      }

      playClickSound();
      drawGumball();
    });
  }

  if (resetButton) {
    resetButton.addEventListener('click', resetMachine);
  }
});
