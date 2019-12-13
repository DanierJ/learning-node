/*eslint-disable*/
import axios from 'axios';
import { showAlert } from "./alerts";


const redirect = (page) => {
  setTimeout(() => {
    location.assign(page);
  }, 1500)
};

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
      redirect('/')
    }

  } catch(err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3216/api/v1/users/logout'
    });

    if (res.data.status === 'success') location.reload(true)

  } catch (err) {
    showAlert('error', 'Error logging out. Try again')
  }
};


