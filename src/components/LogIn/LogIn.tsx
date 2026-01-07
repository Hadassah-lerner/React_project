import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currUser } from '../../redux/slices/userSlice';
import { getUserByEmail } from '../../apis/apis';
import './LogIn.scss';

const LogIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');

  const validationSchema = yup.object({
    email: yup.string().required('יש להזין כתובת מייל').email('כתובת מייל לא תקינה'),
    password: yup.string().required('יש להזין סיסמה').min(6, 'הסיסמה צריכה להיות לפחות 6 תווים'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const users = await getUserByEmail(values.email);
        if (!users.length) {
          setError("המשתמש לא קיים במערכת, יש להרשם");
          setTimeout(() => navigate('/sign_up'), 2000);
          return;
        }
        const user = users[0];
        if (user.password !== values.password) {
          setError("הסיסמה שגויה");
          return;
        }
        sessionStorage.setItem('my-token', 'smile');
        dispatch(currUser(user));
        navigate('/home');
      } catch {
        setError("שגיאה בחיבור לשרת");
      }
    },
  });

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={formik.handleSubmit}>
          <h1>Login</h1>
          <label>כתובת מייל</label>
          <input {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}

          <label>סיסמה</label>
          <input type="password" {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}

          <input type="submit" value="Login" />
          {error && <div className="text-danger">{error}</div>}

          <label>
            לא רשום? <a onClick={() => navigate('/sign_up')}>הרשמה</a>
          </label>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
