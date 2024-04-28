import React, { useEffect, useState, useMemo } from 'react';
import './doctorItem.css';
import { ref, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../../form/Config';
import defaultImg from '../../../assest/data/images/default.jpg';
import { Link } from 'react-router-dom';

export const DoctorItem = (props) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getDownloadURL(
          ref(imageDb, `files/ProPics/${props.image}`)
        );
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  });

  const memoizedImageUrl = useMemo(() => imageUrl, [imageUrl]);

  return (
    <div className="item-doc">
      <img src={memoizedImageUrl || defaultImg} alt="" />
      <p>{props.name}</p>
      <p>{props.category}</p>
      <p>{props.gender}</p>
      <p style={{ color: 'red' }}>{props.city}</p>
      <Link to={`/doctor-details/${props.id}`}>Show Profile</Link>
    </div>
  );
};
