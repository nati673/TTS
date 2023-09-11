const inputText = document.getElementById("input-text");
const input = document.getElementById("input-text").value.trim();
const speakButton = document.getElementById("speak-button");
const stopButton = document.getElementById("stop-button");
const audio = document.getElementById("audio");

const synth = window.speechSynthesis;

let currentUtterance = null;

speakButton.addEventListener("click", () => {
  if (synth.speaking) {
    synth.cancel(); // Cancel the current speech if it's speaking
  }

  const text = inputText.value.trim();
  if (text) {
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance;

    utterance.onend = () => {
      currentUtterance = null;
    };

      synth.speak(utterance);
      inputText.style.borderColor = "";
      inputText.style.backgroundColor = "";
    } else  {
     inputText.style.borderColor = "red";
     inputText.style.backgroundColor = "#f7a3b7";
}
});

stopButton.addEventListener("click", () => {
  if (currentUtterance) {
    synth.cancel();
    currentUtterance = null;
  }
});

synth.addEventListener("end", () => {
  audio.src = URL.createObjectURL(
    new Blob([inputText.value], { type: "audio/wav" })
  );
  audio.style.display = "block";
});


