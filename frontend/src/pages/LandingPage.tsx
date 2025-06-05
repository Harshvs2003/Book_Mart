import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

interface SliderImage {
  url: string;
  title: string;
  subtitle: string;
}

const sliderImages: SliderImage[] = [
  {
    url: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    title: "A World of Stories",
    subtitle: "Every book opens a new universe.",
  },
  {
    url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    title: "Books That Inspire",
    subtitle: "Dive into tales that spark imagination.",
  },
  {
    url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    title: "For Every Reader",
    subtitle: "From fantasy to fact — curated just for you.",
  },
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSignIn = () => {
    navigate("/auth");
  };

  return (
    <div className="landing-container">
      {/* Hero/Slider Section */}
      <section className="hero-wrapper">
        <div className="brand-box">
          <h1 className="brand-name">Book Mart</h1>
        </div>

        <div className="hero">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${img.url})` }}
            >
              <div className="overlay">
                <h1 className="title">{img.title}</h1>
                <p className="subtitle">{img.subtitle}</p>
                <button className="cta-btn" onClick={handleSignIn}>
                  Explore Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2>Why You'll Love BookVerse</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/books.png" alt="Books icon" />
            <p>Diverse Genres</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/search.png" alt="Search icon" />
            <p>Smart Discovery</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/user.png" alt="User icon" />
            <p>Personal Profiles</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/sell.png" alt="Seller icon" />
            <p>Seller Friendly</p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="vision-content">
          <h2>Crafted by Passion, Fueled by Stories</h2>
          <p>
            BookVerse isn’t just a platform, it’s a movement to reconnect people with the
            magic of reading. Built by a reader for readers, our aim is to merge technology
            with timeless literature.
          </p>
          <button onClick={handleSignIn}>Join The Story</button>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="footer-cta">
        <button onClick={handleSignIn}>Sign In to Get Started</button>
      </footer>
    </div>
  );
};

export default LandingPage;
  