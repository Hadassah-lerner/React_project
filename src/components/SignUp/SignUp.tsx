import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currUser } from '../../redux/slices/userSlice';
import { addUser } from '../../apis/apis';
import './SignUp.scss';
import { UserModel } from '../../models/UserModel';

// טיפוס המשתמש שה־Redux מצפה לו
/*interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}*/

const SignUp: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');

  const validationSchema = yup.object({
    name: yup.string()
      .required('יש להזין שם')
      .min(2, 'השם חייב להיות לפחות 2 תווים')
      .matches(/^[^0-9]+$/, 'אותיות בלבד'),
    email: yup.string().required('יש להזין מייל').email('כתובת לא תקינה'),
    password: yup.string()
      .required('יש להזין סיסמה')
      .min(8, 'הסיסמה חייבת להיות לפחות 8 תווים')
      .matches(/[A-Z]/, 'חובה אות גדולה')
      .matches(/[a-z]/, 'חובה אות קטנה')
      .matches(/\d/, 'חובה ספרה')
      .matches(/[@$!%*?&]/, 'חובה תו מיוחד'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'הסיסמאות אינן תואמות')
      .required('יש לאמת סיסמה'),
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
 /*       const createdUserFromApi = await addUser({
          name: values.name,
          email: values.email,
          password: values.password,
          role: 'customer',
        });*/
        const createdUser = new UserModel(
  createdUserFromApi.id.toString(),
  createdUserFromApi.name,
  createdUserFromApi.email,
  createdUserFromApi.password,
  createdUserFromApi.role ?? 'customer'
);


       onSubmit: async (values) => {
  try {
    const createdUserFromApi = await addUser({
      name: values.name,
      email: values.email,
      password: values.password,
      role: 'customer',
    });

    const createdUser = new UserModel(
      createdUserFromApi.id.toString(),
      createdUserFromApi.name,
      createdUserFromApi.email,
      createdUserFromApi.password,
      createdUserFromApi.role ?? 'customer'
    );

    dispatch(currUser(createdUser));
    sessionStorage.setItem('my-token', 'smile');
    navigate('/home');

  } catch (err) {
    console.error(err);
    setError("אירעה שגיאה בהרשמה, נסה שוב");
  }
}

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={formik.handleSubmit}>
          <h1>Sign Up</h1>

          <label>שם</label>
          <input {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}

          <label>מייל</label>
          <input {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}

          <label>סיסמה</label>
          <input type="password" {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}

          <label>אימות סיסמה</label>
          <input type="password" {...formik.getFieldProps('confirmPassword')} />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="text-danger">{formik.errors.confirmPassword}</div>}

          <input type="submit" value="Sign Up" />
          {error && <div className="text-danger">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
