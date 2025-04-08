import React, { useState } from 'react';
import './styles.css';

function Tag({value = [], onChange, error}) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue('');
    }

    if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleDelete = (name) => {
    onChange(value.filter((r) => r !== name));
  };


  return (
    <div className={`responsible-wrapper ${error ? 'input-error' : ''}`}>
      {value.map((name, idx) => (
        <span
          key={idx}
          className="responsible-tag"
        >
          {name}
          <button
            onClick={() => handleDelete(name)}
            className="responsible-remove"
          >
            ✕
          </button>
        </span>
      ))}
      <input
        type="text"
        className="responsible-input"
        placeholder="Digite um nome e pressione Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Tag;