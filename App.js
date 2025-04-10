import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [holiday, setHoliday] = useState('Diwali');
  const [culture, setCulture] = useState('Indian');
  const [tone, setTone] = useState('joyful');
  const [language, setLanguage] = useState('en');
  const [greeting, setGreeting] = useState('');

  const generateGreeting = async () => {
    const res = await axios.post('http://localhost:8000/generate-greeting/', {
      name,
      holiday,
      culture,
      tone,
      language
    });
    setGreeting(res.data.message);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Personalized Greeting Generator</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Holiday" value={holiday} onChange={e => setHoliday(e.target.value)} />
      <input placeholder="Culture" value={culture} onChange={e => setCulture(e.target.value)} />
      <input placeholder="Tone" value={tone} onChange={e => setTone(e.target.value)} />
      <input placeholder="Language" value={language} onChange={e => setLanguage(e.target.value)} />
      <button onClick={generateGreeting}>Generate</button>
      <p><strong>Greeting:</strong> {greeting}</p>
    </div>
  );
}

export default App;