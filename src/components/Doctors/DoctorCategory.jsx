import React from 'react';
import './doctorCategory.css';

const DoctorCategory = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="select-container">
      <select value={selectedCategory} onChange={onChange}>
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DoctorCategory;
