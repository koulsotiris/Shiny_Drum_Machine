document.addEventListener("DOMContentLoaded", function() {
    
    var buttons = document.querySelectorAll('.btn');
    //DEMO 1
    var demo1Button = document.getElementById("demo1");

    // Attach a click event listener to the demo1 button
    demo1Button.addEventListener("click", function() {
    // Reset all elements to "images/grey.png"
    buttons.forEach(function(button) {
        button.src = 'images/grey.png';
    });

    // Array of IDs to be changed to "images/red.png"
    var idsToChange = [
      'Tom1_0', 'Tom1_3', 'Tom1_7', 'Tom1_11', 'Tom1_15', 'Tom2_1' , 'Tom2_5','Tom2_9',
      'Tom2_15', 'HiHat_0','HiHat_2','HiHat_4','HiHat_6','HiHat_8','HiHat_10','HiHat_12'
      ,'HiHat_14' ,'Snare_3' ,'Snare_7' , 'Snare_11' , 'Snare_15' , 
      'Kick_1','Kick_2','Kick_3','Kick_6','Kick_7' , 'Kick_8', 'Kick_10', 'Kick_11', 'Kick_12',
      'Kick_14' ,'Kick_15'
    ];

    // Change the specified IDs to "images/red.png"
    idsToChange.forEach(function(id) {
      var element = document.getElementById(id);
      if (element) {
        // Check if the element with the given ID exists
        element.src = 'images/red.png';
      }
    });
  });
  
    //DEMO 2
    var demo2Button = document.getElementById("demo2");

    // Attach a click event listener to the demo1 button
    demo2Button.addEventListener("click", function() {

    // Reset all elements to "images/grey.png"
    buttons.forEach(function(button) {
        button.src = 'images/grey.png';
    });

    // Array of IDs to be changed to "images/red.png"
    var idsToChange = [
      'Tom1_0', 'Tom1_15', 'Tom2_1' , 'Tom2_5','Tom2_9',
      'Tom2_13', 'HiHat_0','HiHat_3','HiHat_8','HiHat_12','HiHat_14',
      'Snare_1' ,'Snare_5' , 'Snare_0' , 'Snare_13' , 
      'Kick_0','Kick_6','Kick_10','Kick_14'
    ];

    // Change the specified IDs to "images/red.png"
    idsToChange.forEach(function(id) {
      var element = document.getElementById(id);
      if (element) {
        // Check if the element with the given ID exists
        element.src = 'images/red.png';
      }
    });
  });

  //DEMO 3
  var demo3Button = document.getElementById("demo3");

  // Attach a click event listener to the demo1 button
  demo3Button.addEventListener("click", function() {

  // Reset all elements to "images/grey.png"
  buttons.forEach(function(button) {
      button.src = 'images/grey.png';
  });

  // Array of IDs to be changed to "images/red.png"
  var idsToChange = [
    'Tom1_0', 'Tom1_1','Tom1_4','Tom1_5', 'Tom2_8' ,'Tom2_9',
    'Tom3_11','Tom3_12', 'HiHat_2','HiHat_13',
    'Snare_6' ,'Snare_10' , 'Snare_14'  , 
    'Kick_3'
  ];

  // Change the specified IDs to "images/red.png"
  idsToChange.forEach(function(id) {
    var element = document.getElementById(id);
    if (element) {
      // Check if the element with the given ID exists
      element.src = 'images/red.png';
    }
  });
});
});