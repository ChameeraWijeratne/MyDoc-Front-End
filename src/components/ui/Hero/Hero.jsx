import React from 'react';
import { Link } from 'react-router-dom';

import './hero.css';
//import heroImg1 from '../../../assest/data/images/hero-1.png';
import heroVid1 from '../../../assest/data/images/heroVid-1.mp4';

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        <div className="hero-left">
          <div className="hero-title">
            <h1>
              Expert Care,
              <br /> Booked Fast.
            </h1>
          </div>

          <div className="hero-des">
            <span>
              Welcome to MyDoc,
              <br /> Your premier destination for hassle-free online doctor
              booking.
            </span>
          </div>
          <div className="hero-btn">
            <Link to="/signup">
              <button className="regButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="regButton loginButton" Link="/login">
                Log In
              </button>
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="image-container">
            <video controls width="700" muted autoPlay loop>
              <source src={heroVid1} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
