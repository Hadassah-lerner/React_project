import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { currUser } from '../../redux/slices/userSlice';
import { api } from '../../api/apis';
import './PersonalInfo.scss';

const PersonalInfo: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = await api.updateUser(user.id, formData);
      dispatch(currUser(updatedUser));
      setEditable(false);
    } catch {
      setError('אירעה שגיאה בעדכון הנתונים');
    }
  };

  if (!user) return <div>אנא התחבר</div>;

  return (
    <div className="personal-info-page">
      <h1>פרטים אישיים</h1>
      {error && <div className="text-danger">{error}</div>}

      <div className="personal-info-field">
        <label>שם:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!editable}
        />
      </div>

      <div className="personal-info-field">
        <label>מייל:</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editable}
        />
      </div>

      {editable ? (
        <button onClick={handleSave}>שמור</button>
      ) : (
        <button onClick={() => setEditable(true)}>ערוך</button>
      )}
    </div>
  );
};

export default PersonalInfo;
