import React, { FC, useState } from 'react';
import './PersonalInfo.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { currUser } from '../../redux/slices/userSlice';

interface PersonalInfoProps {}

const PersonalInfo: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const user = useSelector((state: any) => state.user.userState);

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
    enableReinitialize: true,
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: user?.password || '',
      confirmPassword: user?.password || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const newCustomer = {
          id: user?.id || 0,
          name: values.name,
          email: values.email,
          password: values.password,
          role: user?.role || 'customer',
        };

        const response = await fetch(`http://localhost:3000/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCustomer),
        });

        if (!response.ok) {
          throw new Error("נכשלה ההרשמה");
        }

        sessionStorage.setItem('my-token', 'smile');
        navigate('/home');
        dispatch(currUser(newCustomer));

      } catch (err) {
        setError("אירעה שגיאה בהרשמה, נסה שוב");
      }
    }
  });

  return (
    <div className="personal-info-wrapper">
      <div className="personal-info-form-box">
        <form onSubmit={formik.handleSubmit}>
          <h1>פרטים אישיים</h1>

          <label htmlFor="name">שם</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger">{formik.errors.name as string}</div>
          )}

          <label htmlFor="email">כתובת מייל</label>
          <input
            id="email"
            name="email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email as string}</div>
          )}

          <label htmlFor="password">סיסמה</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger">{formik.errors.password as string}</div>
          )}
          <label htmlFor="confirmPassword">אימות סיסמה</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-danger">{formik.errors.confirmPassword as string}</div>
          )}
          <input type="submit" value="עדכן" />
          {error && <div className="text-danger">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
function deleteUser(newCustomer: { id: any; name: any; email: any; password: any; role: any; }): any {
  throw new Error('Function not implemented.');
}

