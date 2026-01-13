import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid">
      <figure className="effect-catagories" onClick={()=>navigate('/products')}>
        <img src="/images/image.png" alt="home_pic" />
        <figcaption>
          <h3>
            למוצרים שלנו
          </h3>
        </figcaption>
      </figure>
    </div>
  );
};

export default Home;
