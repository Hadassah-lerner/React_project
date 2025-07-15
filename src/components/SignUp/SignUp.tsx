import React, { FC, useState } from 'react';
import './SignUp.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currUser } from '../../redux/slices/userSlice';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('יש להזין שם')
      .min(2, 'השם צריך להכיל לפחות 2 אותיות')
      .matches(/^[^0-9]+$/, 'השם חייב להכיל אותיות בלבד'),
    email: yup
      .string()
      .required('יש להזין כתובת מייל')
      .email('כתובת מייל לא תקינה'),
    password: yup
      .string()
      .required('יש להזין סיסמה')
      .min(8, 'הסיסמה צריכה להכיל לפחות 8 תווים')
      .matches(/[A-Z]/, 'הסיסמה חייבת להכיל לפחות אות גדולה אחת')
      .matches(/[a-z]/, 'הסיסמה חייבת להכיל לפחות אות קטנה אחת')
      .matches(/\d/, 'הסיסמה חייבת להכיל לפחות ספרה אחת')
      .matches(/[@$!%*?&]/, 'הסיסמה חייבת להכיל תו מיוחד אחד לפחות'),
    confirmPassword: yup
      .string()
      .required('יש לאשר את הסיסמה')
      .oneOf([yup.ref('password')], 'הסיסמאות אינן תואמות'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const newCustomer = {
          name: values.name,
          email: values.email,
          password: values.password,
          role: "customer"
        };

        const response = await fetch(`http://localhost:3000/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCustomer),
        });

        if (!response.ok) {
          throw new Error("נכשלה ההרשמה");
        }

        // פה אנחנו מושכים את היוזר שנוצר מהשרת
        const createdUser = await response.json();

        // דוחפים לרידקס
        dispatch(currUser(createdUser));

        // עוברים לעמוד הראשי
        navigate('/');

      } catch (err) {
        setError("אירעה שגיאה בהרשמה, נסה שוב");
      }
    }
  });

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={formik.handleSubmit}>
          <h1>Sign Up</h1>

          <label htmlFor="name">שם</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger">{formik.errors.name}</div>
          )}

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

          <label htmlFor="confirmPassword">אימות סיסמה</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-danger">{formik.errors.confirmPassword}</div>
          )}

          <input type="submit" value="Sign Up" />

          <label id="forgotpwd">
            כבר רשום?
            <a onClick={() => navigate('/')}> התחבר</a>
          </label>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
