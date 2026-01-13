import React, { FC, useState } from 'react';
import './LogIn.scss';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { currUser } from '../../redux/slices/userSlice';
import { getUserByEmail } from '../../apis/users.api';

const LogIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 💡 schema של yup
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
      setError('');
      setLoading(true);
      try {
        const user = await getUserByEmail(values.email);
        if (!user) {
          setError('...המשתמש לא קיים במערכת, יש להרשם');
          setTimeout(() => navigate('/sign_up'), 2000);
          setLoading(false);
          return;
        }

        if (user.password !== values.password) {
          setError('הסיסמה שגויה');
          setLoading(false);
          return;
        }

        // התחברות מוצלחת
        sessionStorage.setItem('my-token', 'smile');
        dispatch(currUser(user));
        navigate('/home');
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'שגיאה בחיבור לשרת');
      } finally {
        setLoading(false);
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

          <button type="submit" disabled={loading}>
            {loading ? 'טוען...' : 'Login'}
          </button>

          {error && <div className="text-danger">{error}</div>}

          <label id="forgotpwd">
            לא רשום? <a onClick={() => navigate('/sign_up')}>הרשמה</a>
          </label>
        </form>
      </div>
    </div>
  );
};

export default LogIn;