import React, { FC, useState } from 'react';
import './LogIn.scss';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { UserModel } from '../../models/UserModel';
import { currUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

const LogIn: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('יש להזין כתובת מייל')
      .email('כתובת מייל לא תקינה'),
    password: yup
      .string()
      .required('יש להזין סיסמה')
      .min(6, 'הסיסמה צריכה להיות לפחות 6 תווים'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
      const response = await fetch(`http://localhost:3000/users?email=${values.email}`);
const users = await response.json();

if (users.length == 0) {
  setError("...המשתמש לא קיים במערכת, יש להרשם ");
  setTimeout(() => navigate('/sign_up'), 2000);
} else {
  const user = users[0];
  if (user.password !== values.password) {
    setError("הסיסמה שגויה");
  } else {
    sessionStorage.setItem('my-token', 'smile');
    navigate('/home');
    dispatch(currUser(user))
  }
}

      } catch (err) {
        setError("שגיאה בחיבור לשרת");
      }
    },
  });

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={formik.handleSubmit}>
          <h1>Login</h1>

          <label htmlFor="email">כתובת מייל</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}

          <label htmlFor="password">סיסמה</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger">{formik.errors.password}</div>
          )}

          <input type="submit" value="Login" />

          {error && <div className="text-danger">{error}</div>}

          <label id="forgotpwd">
            לא רשום?
            <a onClick={() => navigate('/sign_up')}> הרשמה</a>
          </label>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
