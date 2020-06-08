import React, { useState, useEffect } from 'react';
import { Button } from 'react-bulma-components';
import { API_URI } from 'src/store/utils'
import axios from 'axios';

const EmailConfirm = () => {
  const path = window.location.pathname;
  const pathArray = path.split(new RegExp('/'));
  const pseudo = pathArray[3];

  const [activation, setActivation] = useState(false);


  const getActivation = () => {
    axios.get(`${API_URI}/activation/user/${pseudo}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getActivation, [activation]);

  return (
    <h1>Confirmation</h1>
  );
};

export default EmailConfirm;
