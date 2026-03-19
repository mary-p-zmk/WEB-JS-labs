(function () {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  console.log("--- Standard Logic (Task 1.2.2) ---");
  for (var i = 0; i < names.length; i++) {
    
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]); 
    }
  }

  
  console.log("\n--- Custom Logic: Selection by name length (Task 1.2.3) ---");
  console.log("Annotation: Names with more than 4 letters get a special mention.");
  
  for (var i = 0; i < names.length; i++) {
    if (names[i].length > 4) {
      console.log("Long name detected: " + names[i]);
    }
  }
})();
