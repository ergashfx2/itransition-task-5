import { useState } from 'react';
import './header.css';

function Header({ selectedNat, handleSelectChange, updateErrors }) {
  const [errorsNumber, setErrorsNumber] = useState(0);
  const [seed, setSeed] = useState(0);

  const handleErrorsChange = (event) => {
    let errors = parseInt(event.target.value);
    errors = Math.min(errors, 1000);
    setErrorsNumber(errors);
    updateErrors(errors);
    generateSeed(errors);
  };

  const generateSeed = (errors) => {
    const timestamp = new Date().getTime();
    const seedString = `${errors}${timestamp}`;
    const newSeed = Math.abs(hashString(seedString));
    setSeed(newSeed);
  };
  

  const hashString = (str) => {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; 
    }
    return hash;
  };

  const handleSeedChange = (event) => {
    let newSeed = parseInt(event.target.value);
    newSeed = Math.abs(newSeed); 
    setSeed(newSeed);
  };  

  return (
    <div className="mt-4">
      <div className='row'>
        <div className='col mt-3'>
          <label className='form-label d-inline'><strong> Region : </strong></label>
          <select value={selectedNat} onChange={handleSelectChange} className='form-select d-inline w-25 mx-3 mt-3'>
            <option value="us">United States</option>
            <option value="in">India</option>
            <option value="tr">Turkey</option>
          </select>
          <label className='form-label d-inline'><strong>Errors :</strong> </label>
          <input
            type='range'
            max={10}
            onChange={handleErrorsChange}
            value={errorsNumber}
            className='form-range d-inline w-25 mx-3 pt-3'
          />
          <input
            id='errors-value'
            type='number'
            name='errors-number'
            value={errorsNumber}
            maxLength={`1000`}
            min={0}
            className='form-control d-inline'
            onChange={handleErrorsChange} 
          />
          <label className='form- d-inline mx-3'><strong>Seed :</strong></label>
          <input
            id='seed-number'
            type='number'
            onChange={handleSeedChange}
            name='seed'
            min="0"
            value={seed}
            className='form-control d-inline mx-3'
          />
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Header;
