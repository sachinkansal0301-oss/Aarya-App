document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("voiceBtn");

  // Check if browser supports speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (!recognition) {
    alert("Speech recognition is not supported in this browser. Aarya will be text-only for now.");
  } else {
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      button.innerText = "🎤 Listening...";
    };

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      button.innerText = "🎤 Tap to Speak";
      processCommand(command);
    };

    recognition.onerror = () => {
      button.innerText = "🎤 Tap to Speak";
      speak("I could not understand. Please try again.");
    };
  }

  button.addEventListener("click", () => {
    if (recognition) recognition.start();
    else speak("Voice system not available.");
  });

  function processCommand(command) {
    console.log("User said:", command);
    if (command.includes("hello") || command.includes("hi")) {
      speak("Hello! I am Aarya, your AI assistant. How can I help you?");
    } else if (command.includes("who are you")) {
      speak("I am Aarya, an AI SuperApp created to make apps, videos, cartoons, and much more by your command.");
    } else {
      speak("I heard you say " + command + ". I will learn to do this soon.");
    }
  }

  function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  }
});
