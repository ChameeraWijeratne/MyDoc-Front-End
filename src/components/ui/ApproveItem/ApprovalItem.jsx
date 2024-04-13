import React, { useEffect, useState, useMemo } from 'react';
import './approvalItem.css';
import { ref, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../../form/Config';
import defaultImg from '../../../assest/data/images/default.jpg';

export const ApprovalItem = (props) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [docUrl, setDocUrl] = useState(null);

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

  useEffect(() => {
    const fetchImage1 = async () => {
      try {
        const url = await getDownloadURL(
          ref(imageDb, `files/Certificates/${props.certificate}`)
        );
        setDocUrl(url);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchImage1();
  });

  const memoizedImageUrl = useMemo(() => imageUrl, [imageUrl]);
  const memoizedDocumentUrl = useMemo(() => docUrl, [docUrl]);

  return (
    <div className="approve-doc">
      <img src={memoizedImageUrl || defaultImg} alt="" />
      <p>{props.name}</p>
      <p>{props.category}</p>
      <p>{props.city}</p>
      <a href={memoizedDocumentUrl}>Go to Certificate</a>
    </div>
  );
};
