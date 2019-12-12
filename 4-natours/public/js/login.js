/*eslint-disable*/
import axios from 'axios';
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3216/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    console.log('HELLO');

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      setTimeout(() => {
        location.assign('/');
      }, 1500)
    }

  } catch(err) {
    showAlert('error', err.response.data.message);
  }
};


