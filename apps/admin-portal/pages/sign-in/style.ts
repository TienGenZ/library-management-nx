export const wrapper = {
  width: '100vw',
  height: '100vh',
  position: '',
  // backgroundColor: 'red',
};
export const signIn = {};

export const form = {};

export const partRight = {};

export const partLeft = {};

export const submitButton = {
  background: 'rgb(90, 34, 139)',
  fontWeight: '500',
  '&:hover': {
    background: 'rgb(241, 231, 254);',
    color: 'rgb(90, 34, 139)',
  },
};

export const rememberCheckbox = {
  color: 'rgb(90, 34, 139)',
  '&.Mui-checked': {
    color: 'rgb(90, 34, 139)',
  },
};

export const inputPassword = {
  fontFamily: 'Montserrat',
  fontWeight: '500',
  '& ::placeholder': {
    color: '#000',
    fontFamily: "'Montserrat','Helvetica','Arial',sans-serif",
    fontWeight: '500',
  },
  border: '1px solid rgb(90, 34, 139)',
  '& fieldset': { border: 'none' },
};

export const inputUsername = {
  fontFamily: 'Montserrat !important',
  '& ::placeholder': {
    fontFamily: "'Montserrat','Helvetica','Arial',sans-serif",
    color: '#000 !important',
  },
  fontWeight: '500',
};
