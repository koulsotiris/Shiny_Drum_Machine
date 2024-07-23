document.addEventListener("DOMContentLoaded", function() {
    // Create an audio context
    var audioContext = new AudioContext();
    
    // List wih the available drumkits
    var drumKits = {
        'Kit8': {
            'Tom1': 'samples/Kit8/tom1.wav',
            'Tom2': 'samples/Kit8/tom2.wav',
            'Tom3': 'samples/Kit8/tom3.wav',
            'HiHat': 'samples/Kit8/hihat.wav',
            'Snare': 'samples/Kit8/snare.wav',
            'Kick': 'samples/Kit8/kick.wav'
        },
        'Bongos': {
            'Tom1': 'samples/Bongos/kick.wav',
            'Tom2': 'samples/Bongos/tom2.wav',
            'Tom3': 'samples/Bongos/tom3.wav',
            'HiHat': 'samples/Bongos/hihat.wav',
            'Snare': 'samples/Bongos/snare.wav',
            'Kick': 'samples/Bongos/tom1.wav'
        },
        'Acoustic': {
            'Tom1': 'samples/Acoustic/kick.wav',
            'Tom2': 'samples/Acoustic/tom2.wav',
            'Tom3': 'samples/Acoustic/tom3.wav',
            'HiHat': 'samples/Acoustic/hihat.wav',
            'Snare': 'samples/Acoustic/snare.wav',
            'Kick': 'samples/Acoustic/tom1.wav'
        },
        'Stark': {
            'Tom1': 'samples/Stark/kick.wav',
            'Tom2': 'samples/Stark/tom2.wav',
            'Tom3': 'samples/Stark/tom3.wav',
            'HiHat': 'samples/Stark/hihat.wav',
            'Snare': 'samples/Stark/snare.wav',
            'Kick': 'samples/Stark/tom1.wav'
        },
        'Techno': {
            'Tom1': 'samples/Techno/kick.wav',
            'Tom2': 'samples/Techno/tom2.wav',
            'Tom3': 'samples/Techno/tom3.wav',
            'HiHat': 'samples/Techno/hihat.wav',
            'Snare': 'samples/Techno/snare.wav',
            'Kick': 'samples/Techno/tom1.wav'
        }
    };
    
    //List with the available effects
    var effectsList = [ 'effects/0-ps.wav','effects/1-backslap1.wav','effects/2-wildecho.wav','effects/3-comb-saw1.wav','effects/4-bright-hall.wav',
                        'effects/5-chorus-feedback.wav','effects/6-comb-square1.wav','effects/7-cosmic-ping-long.wav',
                        'effects/8-crackle.wav','effects/9-diffusor1.wav','effects/10-filter-rhythm1.wav','effects/11-medium-room1.wav'
    ];
          
    var selectedKit = 'Kit8'; // Default kit
    var soundPaths = drumKits[selectedKit];


    //List with the default parameters for drums
    var drumBeatParameters = {
        'Tom1': { pan: 0.0, pitch: 1.0, volume: 0.75 },
        'Tom2': { pan: 0.0, pitch: 1.0, volume: 0.75 },
        'Tom3': { pan: 0.0, pitch: 1.0, volume: 0.75 },
        'HiHat': { pan: 0.0, pitch: 1.0, volume: 0.75 },
        'Snare': { pan: 0.0, pitch: 1.0, volume: 0.75 },
        'Kick': { pan: 0.0, pitch: 1.0, volume: 0.75 }
    };

    //Dropdown menu for kits
    
    var comboContainer = document.querySelector('.combo');
    var comboText = document.getElementById('comboText');
    var comboList = document.querySelector('.combolist');

    comboContainer.addEventListener('click', function (event) {
        // Stop the click event from propagating to the window
        event.stopPropagation();
        comboList.style.display = 'block';
    });
    comboList.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            var SelectedOption = event.target.dataset.option;
            comboText.textContent = SelectedOption;
            soundPaths = drumKits[SelectedOption]; //the option selected is used in order to change the kit from drumkits
            comboList.style.display = 'none';
            loadSounds();//reload the sounds
            event.stopPropagation(); //the above listener was interfering with this one so stoppropagation was necessary
        }
    });
    // Close the combo list if the user clicks outside of it
    window.addEventListener('click', function () {
        comboList.style.display = 'none';
    });

    


    //Dropdown menu for effects

    var effectList = document.getElementById('effectlist');
    var effectName = document.getElementById('effectname');
    var effectcombo_container = document.getElementById("effectcombo_container");
    //Effect that has been selected
    var effect = null; 

    effectList.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            effect = event.target.dataset.option;
            //to do not display the number
            effectName.textContent = effect.substring(2,);
            effectList.style.display = 'none';
            event.stopPropagation();
        }
    }); 
    effectcombo_container.addEventListener('click', function (event) {
        // Stop the click event from propagating to the window
        event.stopPropagation();
        effectList.style.display = 'block';
    });
    window.addEventListener('click', function () {
        effectList.style.display = 'none';
    });





    //Dropdown menu for slidebar control
    
    var slideContainer = document.querySelector('.slidedrop');
    var slideText = document.getElementById('slidebars_text');
    var slideList = document.querySelector('.slidelist');

    slideContainer.addEventListener('click', function (event) {
        // Stop the click event from propagating to the window
        event.stopPropagation();
        slideList.style.display = 'block';
    });

    slideList.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            var selectedOption = event.target.dataset.option;
            slideText.textContent = selectedOption;
            slideList.style.display = 'none';
            UpdateSliders(selectedOption) ;
            event.stopPropagation(); //the above listener was interfering with this one so stoppropagation was necessary
        }
    });

    // Close the combo list if the user clicks outside of it
    window.addEventListener('click', function () {
        slideList.style.display = 'none';
    });

    //function to update sliders when the user changes his sliderbar control option 
    function UpdateSliders(selectedOption) {
        // Iterate through each slider and update its value based on the selected option
        sliders.forEach(function (slider, index) {
            // Adjust index to start from 1 instead of 0
            if (index - 1 >= Object.keys(soundPaths).length){ return;} // Prevent out-of-bounds access
            
            var valueLabel = document.getElementById('value' + padNumber(index + 1));
            var key = Object.keys(soundPaths)[index-1];
            var parameterValue;

              // Log the key and corresponding drumBeatParameters entry
            console.log(`Index: ${index}`);
            console.log(`Key: ${key}`);
            console.log(`drumBeatParameters[${key}]:`, drumBeatParameters[key]);
    
            if (!drumBeatParameters[key]) {
                console.error(`Key ${key} is not found in drumBeatParameters`);
                // Provide default values or handle the error appropriately
                drumBeatParameters[key] = { volume: 0.75, pitch: 1.0, pan: 0.0 }; // This prevents the error 
            }
            
            switch (selectedOption) {
                case 'Volume':
                    parameterValue = drumBeatParameters[key].volume * 100;
                    slider.max = 100;
                    break;
                case 'Pitch':
                    parameterValue = drumBeatParameters[key].pitch * 100;
                    slider.max=200;
                    break;
                case 'Pan':
                    // Assuming pan values are between -1 and 1, mapping to 0-100 for sliders
                    parameterValue = (drumBeatParameters[key].pan + 1) * 50;
                    slider.max=100 ;
                    break;
            }
    
            // Update the slider value and corresponding label
            slider.value = parameterValue;
            valueLabel.textContent = parameterValue;
        });
    }

    // Get all elements with the class 'btn' and 'sliderWidget'
    var buttons = document.querySelectorAll('.btn');
    var sliders = document.querySelectorAll('.sliderWidget input[type="range"]');

    // Load sounds asynchronously
    var sounds = {};
    var gainNodes = {};
    var panNodes = {};
    var effectsNodes = {};
    var effects = {}; 

    var loadSounds = function() {
        Object.keys(soundPaths).forEach(function(key) {
            var soundPath = soundPaths[key];
            var request = new XMLHttpRequest();
            request.open('GET', soundPath, true);
            request.responseType = 'arraybuffer';
    
            request.onload = function() {
                audioContext.decodeAudioData(request.response, function(buffer) {
                    sounds[key] = buffer;
    
                    // Create a gain node for each sound
                    gainNodes[key] = audioContext.createGain();
                    gainNodes[key].connect(audioContext.destination);
    
                    // Create a StereoPannerNode for each sound
                    panNodes[key] = audioContext.createStereoPanner();
                    panNodes[key].connect(gainNodes[key]); // Connect the pan node to the corresponding gain node
    
                    // Optionally, set the pan to a default value (e.g., center)
                    panNodes[key].pan.value = 0;
                });
            };
    
            request.send();
        });
        
        Object.keys(effectsList).forEach(function(key) {
            var effectPath = effectsList[key];
            var request = new XMLHttpRequest();
            request.open('GET', effectPath, true);
            request.responseType = 'arraybuffer';

            request.onload = function() {
                audioContext.decodeAudioData(request.response, function(buffer) {
                    effects[key] = buffer;
                    effectsNodes[key] = audioContext.createGain();
                    effectsNodes[key].connect(audioContext.destination);
                });
            };
            request.send();
        });
    };

    // Call the loadSounds function to load sounds
    loadSounds();

    // Add event listeners to each slider
    const choiceMappings = {
        'Volume': { parameter: 'volume', defaultValue: 75 },
        'Pitch': { parameter: 'pitch', defaultValue: 1.0 },
        'Pan': { parameter: 'pan', defaultValue: 0 },
    };
    
    var slideText = document.getElementById('slidebars_text');
    
    //function for sliders control over the volume , pitch and pan parameters
    sliders.forEach(function (slider, index) {
        var valueLabel = document.getElementById('value' + padNumber(index + 1));
    
        slider.addEventListener('input', function () {
            var selectedChoice = slideText.textContent || 'Volume'; // Default to 'Volume' if no choice is selected
            var mapping = choiceMappings[selectedChoice];
            var audioParameter = mapping.parameter;
            var source = audioContext.createBufferSource();

            if (audioParameter) {
                var key = Object.keys(soundPaths)[index];
                var gainNode = gainNodes[key]; // gainNodes for each sound
                var panNode = panNodes[key]; // panNodes for each sound
    
                if (gainNode) {
                    var parameterValue = slider.value / 100;
                    // Use the default value if the slider value is not set 
                    var defaultValue = mapping.defaultValue / 100;
                    parameterValue = typeof parameterValue !== 'undefined' ? parameterValue : defaultValue;
    
                    // Check if an AudioBufferSourceNode already exists
                    if (!gainNode.sourceNode) {
                        // Create an AudioBufferSourceNode and connect it to the gain node
                        gainNode.sourceNode = audioContext.createBufferSource();
                        gainNode.sourceNode.buffer = sounds[key]; // Assuming sounds is your AudioBuffer
                        gainNode.sourceNode.connect(gainNode);
                    }

                    if (audioParameter === 'volume') {
                        gainNode.gain.setValueAtTime(parameterValue, audioContext.currentTime);
                        drumBeatParameters[key].volume = parameterValue; // Update the dictionary
                    } else if (audioParameter === 'pitch') {
                        gainNode.sourceNode.playbackRate.setValueAtTime(parameterValue, audioContext.currentTime);
                        drumBeatParameters[key].pitch = parameterValue; // Update the dictionary
                    } else if (audioParameter === 'pan') {
                        //due to an error we had to connect everything again here 
                        //seems like its working fine now
                        if (panNode instanceof StereoPannerNode) {
                            panNode.pan.setValueAtTime(parameterValue, audioContext.currentTime);
                            source.connect(panNode);
                            panNode.connect(gainNode);
                            source.connect(panNode);
                            panNode.connect(gainNode);
                            drumBeatParameters[key].pan = parameterValue; // Update the dictionary
                        } 
                    }
                    valueLabel.textContent = slider.value;
                }
            }
        });
    });

    // Add event listeners to each button
    buttons.forEach(function(button) {
        // Toggle between yellow.png and red.png on click
        button.addEventListener('click', function() {
            if (button.src.includes('red.png')) {
                button.src = 'images/grey.png';
            } else {
                button.src = 'images/red.png';
                var drumType = button.id.split('_')[0];

            // Check if the drumType exists in drumBeatParameters
            if (drumBeatParameters[drumType]) {
                // Retrieve pan, pitch, and volume values from drumBeatParameters
                var panValue = drumBeatParameters[drumType].pan;
                var pitchValue = drumBeatParameters[drumType].pitch;
                var volumeValue = drumBeatParameters[drumType].volume;

                // Call playDrumSound with the retrieved values
                playDrumSoundSample(button.id, panValue, pitchValue, volumeValue);
            }
            }
        });

        // Change image to yellow.png on hover when button is not red.png (not selected already)
        button.addEventListener('mouseover', function() {
            if (!button.src.includes('red.png')) {
                button.src = 'images/yellow.png';
            }
        });

        // Change image back to grey.png when mouse leaves and button is not red.png (not selected already)
        button.addEventListener('mouseout', function() {
            if (!button.src.includes('red.png')) {
                button.src = 'images/grey.png'; 
            }
        });
    });

    // Get the reset button
    document.getElementById('reset').addEventListener('click', function() {
        location.reload();
    });    

    function playDrumSoundSample(buttonId, panValue, pitchValue) {
        // Extract row from the button ID (assuming the format is 'RowName_Index')
        var row = buttonId.split('_')[0];
    
        // Check if the sound is loaded
        if (!sounds[row]) {
            console.error('Sound not loaded for ' + row);
            return;
        }
    
        // Get the sound buffer for the corresponding row
        var soundBuffer = sounds[row];
    
        // Create a new audio source
        var source = audioContext.createBufferSource();
        source.buffer = soundBuffer;
    
        // Create a panner node for stereo positioning (pan)
        var panNode = audioContext.createStereoPanner();
        panNode.pan.value = panValue; // Set pan value between -1 (left) and 1 (right)
    
        // Create a gain node for volume control (you may already have this in your gainNodes array)
        var gainNode = audioContext.createGain();
    
        // Connect the source to the pan node, then connect the pan node to the gain node
        source.connect(panNode);
        panNode.connect(gainNode);
    
        // Connect the gain node to the corresponding gain node for the row
        gainNode.connect(gainNodes[row]);
    
        // Set pitch by adjusting the playback rate
        source.playbackRate.value = pitchValue; // Set pitch value, 1.0 is normal speed
    
        // Start playing the sound
        source.start();
    }

    // Function to play drum sound based on row
    function playDrumSound(buttonId, time, panValue, pitchValue) {
        // Extract row from the button ID (assuming the format is 'RowName_Index')
        var row = buttonId.split('_')[0];
    
        // Check if the sound is loaded
        if (!sounds[row]) {
            console.error('Sound not loaded for ' + row);
            return;
        }
    
        // Get the sound buffer for the corresponding row
        var soundBuffer = sounds[row];
    
        // Create a new audio source
        var source = audioContext.createBufferSource();
        source.buffer = soundBuffer;
    
        // Create a panner node for stereo positioning (pan)
        var panNode = audioContext.createStereoPanner();
        panNode.pan.value = panValue; // Set pan value between -1 (left) and 1 (right)
    
        // Create a gain node for volume control (you may already have this in your gainNodes array)
        var gainNode = audioContext.createGain();
    
        // Connect the source to the pan node, then connect the pan node to the gain node
        source.connect(panNode);
        panNode.connect(gainNode);
    
        // Connect the gain node to the corresponding gain node for the row
        gainNode.connect(gainNodes[row]);
    
        // Set pitch by adjusting the playback rate
        source.playbackRate.value = pitchValue; // Set pitch value, 1.0 is normal speed
    
        // Start playing the sound
        source.start(time);
    }

    //Get the effect volume range
    //0.05 to be the same as the default range (effectSlider) value
    var effectLevel = parseFloat(0.05, 10);
    document.getElementById("effectSlider").addEventListener(
        "input",
        (ev) => {
            effectLevel = parseFloat(ev.target.value, 10);
            document.getElementById("effectValue").innerHTML = parseInt(effectLevel*100); 
        },
        false,
    );

    //Function that is playing the effect
    function playEffect(time,name) {
        
        id = parseInt(name.substring(0,2));
        var soundBuffer = effects[id];
        var source = audioContext.createBufferSource();
        effectsNodes[id].gain.value = effectLevel;
        source.buffer = soundBuffer;
        source.connect(effectsNodes[id]);
        source.start(time);
    }

    let tempo = 100.0;
    const bpmControl = document.querySelector("#tempo");
    bpmControl.addEventListener(
        "input",
        (ev) => {
          tempo = parseInt(ev.target.value, 10);
          document.querySelector("#tvalue").innerHTML = bpmControl.value;
        },
        false,
    );

    const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
    const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)

    let currentNote = 0;
    let nextNoteTime = 0.0; // when the next note is due.

    function nextNote() {
        
        secondsPerBeat = 60.0 / tempo;
        nextNoteTime += secondsPerBeat; // Add beat length to last beat time

        // Advance the beat number, wrap to zero when reaching 16
        currentNote = (currentNote + 1) % 16;
    }

    const notesInQueue = [];
    var pre = -1;

    function scheduleNote(beatNumber, time) {
        // Push the note on the queue, even if we're not playing.
        notesInQueue.push({ note: beatNumber, time });

        const trackHeader = document.getElementById("trackHeader");
        const steps = trackHeader.children;

        // Reset the color of the previous column
        if (pre !== -1) {
            steps[pre].style.backgroundColor = "";
        }

        pre = beatNumber;

        // Change the color of the track header to yellow
        steps[beatNumber].style.backgroundColor = "yellow";

        buttons.forEach(function (button) {
            // Check if the button has a red image source and its beatNumber matches
            if (button.src.includes('red.png') && beatNumber === Number(button.id.split('_')[1])) {
                // Extract drum type from button's id
                var drumType = button.id.split('_')[0];

                // Check if the drumType exists in drumBeatParameters
                if (drumBeatParameters[drumType]) {
                    // Retrieve pan, pitch, and volume values from drumBeatParameters
                    var panValue = drumBeatParameters[drumType].pan;
                    var pitchValue = drumBeatParameters[drumType].pitch;
                    var volumeValue = drumBeatParameters[drumType].volume;

                    // Call playDrumSound with the retrieved values
                    playDrumSound(button.id, time, panValue, pitchValue, volumeValue);
                    //effect
                    if (effect != null){
                        //effect gets value in anonther line
                        playEffect(time,effect); 
                    }
                }
            }
        });
    }

    let timerID;
    function scheduler() {
        // While there are notes that will need to play before the next interval,
        // schedule them and advance the pointer.
        while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
            scheduleNote(currentNote, nextNoteTime);
            nextNote();
        }
        timerID = setTimeout(scheduler, lookahead);
    }

    let isPlaying = false;
    var playButton = document.querySelector("#tpl");
    playButton.addEventListener("click", (ev) => {
        document.querySelector("#beatlabel").innerHTML = "Stop";
        const playButtonImage = document.getElementById("tpl");
        playButtonImage.src = 'images/stop.png';
        
        // Toggle the play state
        isPlaying = !isPlaying;
    
        if (isPlaying) {
            if (audioContext.state === "suspended") {
                audioContext.resume();
            }
    
            currentNote = 0;
            nextNoteTime = audioContext.currentTime;
            scheduler(); // kick off scheduling
            ev.target.dataset.playing = "true";
            //playButtonImage.src = 'images/stop.png';
        } else {
            // Stop playing
            clearTimeout(timerID);
            ev.target.dataset.playing = "false";
            document.querySelector("#beatlabel").innerHTML = "Play";
    
            // Reset the color of the track header
            const trackHeader = document.getElementById("trackHeader");
            const steps = trackHeader.children;
            if (pre !== -1) {
                steps[pre].style.backgroundColor = "";
                pre = -1;
            }
            playButtonImage.src = 'images/play.png';
        }
    });
    // Function to generate pad number with leading zeros (e.g., padNumber(1) => '01')
    function padNumber(number) {
        return ('0' + number).slice(-2);
    }

    var buttons = document.querySelectorAll('.btn');
    var saveButton = document.getElementById('save');
    var loadButton = document.getElementById('load');

    // Save button click handler
    saveButton.addEventListener('click', function () {
        // Create an object to store button states
        var savedData = {};

        // Iterate through each button and save its state
        buttons.forEach(function (button) {
            var buttonId = button.id;
            savedData[buttonId] = button.src;
        });

        // Convert the object to a JSON string
        var jsonString = JSON.stringify(savedData);

        // Create a Blob containing the JSON data
        var blob = new Blob([jsonString], { type: 'application/json' });

        // Create a download link
        var downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = 'savedData.json'; // Set the desired filename

        // Append the link to the document and trigger a click event to download the file
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Remove the link from the document
        document.body.removeChild(downloadLink); 
    });

    // Load button click handler
    loadButton.addEventListener('click', function () {
        // Create an input element for file selection
        var fileInput = document.createElement('input');
        fileInput.type = 'file';

        // Trigger a click event to open the file selection dialog
        fileInput.click();

        // Event handler for when the user selects a file
        fileInput.addEventListener('change', function (event) {
            var file = event.target.files[0];

            if (file) {
                // Read the content of the file
                var reader = new FileReader();
                reader.onload = function (e) {
                    var fileContent = e.target.result;

                    // Parse the JSON content
                    try {
                        var savedData = JSON.parse(fileContent);

                        // Update buttons based on the loaded data
                        buttons.forEach(function (button) {
                            var buttonId = button.id;
                            if (savedData[buttonId] !== undefined) {
                                button.src = savedData[buttonId];
                            }
                        });
                    } catch (error) {
                        console.error('Error parsing file content:', error);
                    }
                };
                // Read the file as text
                reader.readAsText(file);
            }
        });
    });
});
