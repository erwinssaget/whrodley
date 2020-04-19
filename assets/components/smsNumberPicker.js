/* eslint-disable */
import React, { useState } from 'react';
import { Dialog } from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import '@reach/dialog/styles.css';

export default function smsNumberPicker() {
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [showDialog, setShowDialog] = React.useState(false);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const fetchAvailableNumbers = async (event) => {
    event.preventDefault();
    try {
      const res = await fc.service('phone-numbers').find({
        query: {
          areaCode: areaCode.value,
        },
      });

      setAvailableNumbers(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <label
          htmlFor="phone_number"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Phone Number
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <select
              aria-label="Country"
              className="form-select h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm sm:leading-5"
            >
              <option>US</option>
              <option>CA</option>
              <option>EU</option>
            </select>
          </div>
          <input
            id="phone_number"
            className="form-input block w-full pl-16 sm:text-sm sm:leading-5"
            placeholder="+1 (555) 987-6543"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="area-code"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Area Code
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            id="area-code"
            className="form-input block w-full sm:text-sm sm:leading-5"
          />
        </div>
      </div>
    </div>
  );
}
