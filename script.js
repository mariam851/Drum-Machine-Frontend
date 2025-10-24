import React from 'https://esm.sh/react@17.0.1';
import ReactDOM from 'https://esm.sh/react-dom@17.0.1';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      bank: "Heater Kit",
      volume: 50,
    };
    this.togglePower = this.togglePower.bind(this);
    this.toggleBank = this.toggleBank.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  togglePower() {
    this.setState({ power: !this.state.power });
  }

  toggleBank() {
    this.setState({ bank: this.state.bank === "Heater Kit" ? "Smooth Piano Kit" : "Heater Kit" });
  }

  handleVolumeChange(event) {
    const volume = event.target.value;
    this.setState({ volume });
    Howler.volume(volume / 100);
  }
  
  playSound(key) {
    if (!this.state.power) return;
    
    const sounds = {
      "Heater Kit": {
        Q: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
        W: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
        E: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
        A: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
        S: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
        D: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
        Z: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
        X: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
        C: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
      },
      "Smooth Piano Kit": {
        Q: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
        W: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
        E: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
        A: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
        S: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
        D: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
        Z: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
        X: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
        C: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
      }
    };

    const soundSrc = sounds[this.state.bank][key];
    if (soundSrc) {
      const sound = new Howl({ src: [soundSrc] });
      sound.play();
    }
  }

  render() {
    return (
      <div id="container">
        <h1 id="h1">Drum Machine</h1>
        <div id="display">
          <button id="power" onClick={this.togglePower}>
            Power {this.state.power ? "On" : "Off"}
          </button>
          <button id="bank" onClick={this.toggleBank}>
            Bank: {this.state.bank}
          </button>
          <div id="volume-control">
            <label htmlFor="volume">Volume: {this.state.volume}</label>
            <input
              type="range"
              id="volume"
              min="0"
              max="100"
              value={this.state.volume}
              onChange={this.handleVolumeChange}
              disabled={!this.state.power}
            />
          </div>
        </div>
        
        <div className="drum-buttons">
          {["Q", "W", "E", "A", "S", "D", "Z", "X", "C"].map((key) => (
            <button
              key={key}
              id={key}
              className="drum-pad"
              onClick={() => this.playSound(key)}
              disabled={!this.state.power}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
