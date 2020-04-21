/* eslint-disable */
import React, { useState } from 'react';
import http from '../http';

export default function NumberPicker() {
  const [areaCode, setAreaCode] = useState('');
  const [availableNumbers, setAvailableNumbers] = useState(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');

  const fetchAvailableNumbers = async (event) => {
    event.preventDefault();

    try {
      const res = await http.post('/twilio/available-phone-numbers', {
        areaCode,
      });
      setAvailableNumbers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const selectNumber = (number) => {
    setSelectedPhoneNumber(number.phoneNumber);
  };

  return (
    <>
      <div className="form-row">
        <div className="col-6">
          <label htmlFor="area_code">Desired Area Code</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <button
                onClick={fetchAvailableNumbers}
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
              >
                Search
              </button>
            </div>
            <input
              id="area_code"
              placeholder="(XXX)"
              type="search"
              onChange={(e) => setAreaCode(e.target.value)}
              value={areaCode}
              className="form-control"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="phone_number"> Phone Number </label>
          <input
            id="phone_number"
            className="form-control"
            placeholder=""
            autoComplete="off"
            onChange={() => {}}
            value={selectedPhoneNumber}
            required
          />
        </div>
      </div>

      <div className="col-6">
        <ul className="list-group">
          {availableNumbers &&
            availableNumbers.map((number) => (
              <li
                className="list-group-item list-group-item-action"
                key={number.phoneNumber}
              >
                <span onClick={(e) => selectNumber(number)}>
                  {number.friendlyName}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
