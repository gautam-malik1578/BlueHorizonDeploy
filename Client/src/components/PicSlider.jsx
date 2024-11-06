import React, { useState, useEffect } from "react";
import styles from "./PicSlider.module.css";

const PicSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsSliding(true); // Start the sliding animation

      // Wait for the slide animation (500ms), then change the image
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentImage(images[nextIndex]); // Update the image after the animation completes
        setCurrentIndex(nextIndex); // Update the index
        setIsSliding(false); // Reset sliding state for next transition
      }, 500); // Time should match the CSS transition duration
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [currentIndex, images]);

  return (
    <div className={styles.slidercontainer}>
      <img
        src={currentImage}
        alt={`Slide ${currentIndex + 1}`}
        className={`${styles.sliderimage} ${
          isSliding ? styles.slideout : styles.slidein
        }`}
      />
    </div>
  );
};

export default PicSlider;
