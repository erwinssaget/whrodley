/* eslint-disable */
import React, { useState } from 'react';
import http from '../http'

export default function NumberPicker() {
  const [areaCode, setAreaCode] = useState('')
  const [availableNumbers, setAvailableNumbers] = useState([]);

  const fetchAvailableNumbers = async (event) => {
    event.preventDefault();

    try {
      const res = await http.post('/twilio/available-phone-numbers', {
        areaCode,
      })
      // comment
      console.log(res)
      // setAvailableNumbers(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="phone_number">
          Phone Number
        </label>
        <input
          id="phone_number"
          className="form-control"
          placeholder="+1 (555) 987-6543"
        />
      </div>

      <div>
        <label htmlFor="area-code">Area Code</label>
        <div className="form-group">
          <input id="area-code" onChange={(e) => setAreaCode(e.target.value)} value={areaCode} className="form-control" />
        </div>
        <button onClick={fetchAvailableNumbers}>View Possible Numbers</button>
      </div>
    </div>
  );
}
