import React, { useState, useEffect, useRef } from 'react';

const words = [
  "The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog", "in",
  "the", "park", "under", "the", "blue", "sky", "amidst", "the", "green", "trees",
  "beside", "the", "rippling", "stream", "flowing", "gently", "through", "the",
  "meadow", "underneath", "the", "golden", "sunlight", "shining", "brightly", "on",
  "the", "world", "full", "of", "wonders", "and", "endless", "possibilities", "waiting",
  "to", "be", "explored", "by", "curious", "minds", "and", "adventurous", "spirits",
  "forever", "seeking", "knowledge", "and", "wisdom", "in", "the", "journey", "of", 
  "life", "itself", "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", 
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", 
  "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", 
  "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", 
  "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", 
  "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", 
  "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", 
  "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", 
  "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", 
  "give", "day", "most", "us", "make", "very", "great", "since", "through", "much", 
  "same", "own", "before", "found", "live", "world", "here", "where", "after", 
  "back", "little", "only", "round", "man", "year", "came", "show", "every", 
  "good", "me", "give", "our", "under", "name", "very", "line", "just", "before", 
  "away", "old", "need", "both", "big", "high", "though", "thought", "against", 
  "few", "while", "along", "might", "just", "must", "went", "place", "word", 
  "answer", "school", "read", "point", "high", "how", "kind", "again", "each", 
  "they", "found", "spell", "add", "even", "land", "here", "must", "big", "such", 
  "follow", "act", "why", "ask", "men", "change", "went", "light", "kind", "off", 
  "need", "house", "picture", "try", "us", "again", "animal", "point", "mother", 
  "world", "near", "build", "self", "earth", "father", "head", "stand", "own", 
  "page", "should", "country", "found", "answer", "school", "grow", "study", 
  "still", "learn", "plant", "cover", "food", "sun", "four", "between", "state", 
  "keep", "eye", "never", "last"
];

const TypingTest = () => {
  const [timer, setTimer] = useState(15);
  const [wordsList, setWordsList] = useState([]);
  const [typedText, setTypedText] = useState("");
  const [correctWords, setCorrectWords] = useState(0);
  const [totalWordsTyped, setTotalWordsTyped] = useState(0);
  const [status, setStatus] = useState("Not Started");
  const textBoxRef = useRef(null);

  useEffect(() => {
    generateWords();
  }, []);

  useEffect(() => {
    if (status === "On going" && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      calculateResults();
    }
  }, [status, timer]);

  const generateWords = () => {
    const newWords = Array.from({ length: 5 }, () => words[Math.floor(Math.random() * words.length)]);
    setWordsList(newWords);
    setTimer(15);
    setTypedText("");
    setCorrectWords(0);
    setTotalWordsTyped(0);
    setStatus("Not Started");
  };

  const startTest = () => {
    textBoxRef.current.focus();
    setStatus("On going");
  };

  const calculateResults = () => {
    const wpm = totalWordsTyped / (15 / 60);
    const accuracy = (correctWords / totalWordsTyped) * 100;
    setStatus(`Ended - WPM: ${isNaN(wpm) ? 0 : Math.round(wpm)}, Accuracy: ${isNaN(accuracy) ? 0 : Math.round(accuracy)}%`);
  };
  

  const handleInputChange = (e) => {
    const { value } = e.target;
    setTypedText(value);

    if (status === "Not Started") startTest();

    if (value.endsWith(" ")) {
      const word = value.trim();
      setTotalWordsTyped(totalWordsTyped + 1);

      if (word === wordsList[0]) setCorrectWords(correctWords + 1);

      const newWordsList = wordsList.slice(1).concat(words[Math.floor(Math.random() * words.length)]);
      setWordsList(newWordsList);
      setTypedText("");
    }
  };

  return (
    <div>
      <div>
        {wordsList.map((word, index) => (
          <span key={index} style={{ marginRight: "10px", textDecoration: typedText === word ? "none" : "line-through", color: typedText === word ? "black" : "crimson" }}>
            {word}
          </span>
        ))}
      </div>
      <input ref={textBoxRef} type="text" value={typedText} onChange={handleInputChange} />
      <div>Time: {timer}</div>
      <div>Status: {status}</div>
      <button onClick={generateWords}>Reset</button>
    </div>
  );
};

export default TypingTest;