/* eslint-disable */
import React, { useState } from 'react';
import http from '../http';

export default function NumberPicker() {
  const [areaCode, setAreaCode] = useState('');
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');
  const [helpText, setHelpText] = useState(null)

  const fetchAvailableNumbers = async (event) => {
    event.preventDefault();

    try {
      setHelpText("Fetching available numbers...")
      const res = await http.post('/twilio/available-phone-numbers', {
        areaCode,
      });

      if (res.data.length !== 0) {
        setAvailableNumbers(res.data);
        setHelpText(null)
        return;
      }

      setHelpText("No phone numbers found for that area code =(")
    } catch (err) {
      console.log(err);
    } finally {
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
          {helpText && (<small className="form-text text-muted">{helpText}</small>)}
        </div>

        <div className="col-6">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            id="phone_number"
            name="phone_number"
            className="form-control"
            placeholder=""
            autoComplete="off"
            onChange={(e) => { }}
            value={selectedPhoneNumber}
            required
          />
        </div>
      </div>

      <div className="col-6">
        <ul className="list-group pt-1 shadow-lg">
          {availableNumbers &&
            availableNumbers.map((number) => (
              <li
                onClick={(e) => selectNumber(number)}
                className="list-group-item list-group-item-action text-center"
                key={number.phoneNumber}
              >
                <span>
                  {number.friendlyName}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
