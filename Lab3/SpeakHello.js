(function (window) {
  var helloSpeaker = {};
  var speakWord = "Hello"; 

  helloSpeaker.speak = function (name) {
    console.log(speakWord + " " + name);
  };

  window.helloSpeaker = helloSpeaker; // Експортуємо об'єкт у глобальну область [cite: 10]
})(window);
