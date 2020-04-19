/* eslint-disable */
import React, { useState } from 'react';
import http from '../http'

export default function smsNumberPicker() {
  const [areaCode, setAreaCode] = useState('')
  const [availableNumbers, setAvailableNumbers] = useState([]);

  const fetchAvailableNumbers = async (event) => {
    event.preventDefault();

    try {
      const res = await http.post('/twilio/available-phone-numbers', {
        areaCode: areaCode.value,
      })

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
          <input id="area-code" className="form-control" />
        </div>
      </div>
    </div>
  );
}
