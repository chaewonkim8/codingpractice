import React, { useState } from 'react';

function App() {
  const [sentence, setSentence] = useState('');
  const [improvements, setImprovements] = useState('');

  const handleSentenceChange = (event) => {
    setSentence(event.target.value);
  };

  const handleCheckGrammar = () => {
    // Here you would typically make an API call to a grammar checking service
    // and retrieve the improvements for the given sentence.
    // For simplicity, let's assume you have a function called `checkGrammar`
    // that returns the improvements as a string.
    const improvements = checkGrammar(sentence);
    setImprovements(improvements);
  };

  return (
    <div>
      <h1>Grammar Checker</h1>
      <textarea
        rows="4"
        cols="50"
        value={sentence}
        onChange={handleSentenceChange}
      ></textarea>
      <br />
      <button onClick={handleCheckGrammar}>Check Grammar</button>
      <br />
      <div>
        <h2>Improvements:</h2>
        <p>{improvements}</p>
      </div>
    </div>
  );
}

export default App;

