const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://develooper.herokuapp.com"
    : "http://localhost:3000";

const compositionURL = `${baseURL}/compositions`;
const soundsURL = `${baseURL}/sounds`;

function saveComposition(composition, cb) {
  fetch(compositionURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ composition: composition }),
  })
    .then((resp) => resp.json())
    .then(cb);
}

function getUserCompositions(userId, cb) {
  fetch(compositionURL + "list/" + userId, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((resp) => resp.json())
    .then(cb);
}

//////////////////////////////////

function sequencer() {
  const kick = new Tone.Player(`${soundsURL}/Tr8 Kick 04`).toDestination();
  const snare = new Tone.Player(`${soundsURL}/snare1`).toDestination();
  const hiHat = new Tone.Player(`${soundsURL}/hi-hat1`).toDestination();
  const tom = new Tone.Player(`${soundsURL}/tom-analog`).toDestination();
  const ride = new Tone.Player(`${soundsURL}/ride-acoustic02`).toDestination();
  const crash = new Tone.Player(`${soundsURL}/crash-tape`).toDestination();

  let index = 0;

  Tone.Transport.scheduleRepeat(repeat, "16n");

  const startStopButton = document.querySelector("#startStop");

  startStopButton.addEventListener("click", () => {
    if (startStopButton.checked) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  });

  function repeat() {
    let step = index % 16;

    let kickInputs = document.querySelector(
      `.kick input:nth-child(${step + 1})`
    );
    if (kickInputs.checked) {
      kick.start();
    }

    let snareInputs = document.querySelector(
      `.snare input:nth-child(${step + 1})`
    );
    if (snareInputs.checked) {
      snare.start();
    }

    let rideInputs = document.querySelector(
      `.ride input:nth-child(${step + 1})`
    );
    if (rideInputs.checked) {
      ride.start();
    }

    let hiHatInputs = document.querySelector(
      `.hi-hat input:nth-child(${step + 1})`
    );
    if (hiHatInputs.checked) {
      hiHat.start();
    }

    let tomInputs = document.querySelector(`.tom input:nth-child(${step + 1})`);
    if (tomInputs.checked) {
      tom.start();
    }

    let crashInput = document.querySelector(
      `.crash input:nth-child(${step + 1})`
    );
    if (crashInput.checked) {
      crash.start();
    }

    index++;
  }
}
