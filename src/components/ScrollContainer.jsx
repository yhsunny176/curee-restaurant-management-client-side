/* eslint-disable no-unused-vars */
import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { useMotionValue, useSpring, motion } from 'motion/react';
import ResizeObserver from 'resize-observer-polyfill';

const ScrollContainer = ({ children }) => {
  const [contentHeight, setContentHeight] = useState(window.innerHeight);
  const scrollContainerRef = useRef(null);
  const scrollYmotionValue = useMotionValue(
    window.pageYOffset || window.scrollY 
  );
  const springPhysics = { damping: 15, stiffness: 100, mass: 0.27 };
  const scrollYtransition = useSpring(scrollYmotionValue, springPhysics);

  const getContentHeight = useCallback(entries => {
    for (let entry of entries) {
      const entryHeight = entry.contentRect.height;
      setContentHeight(entryHeight);
    }
  }, []);
  
  useLayoutEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    let resizeObserver = new ResizeObserver(entries => 
      getContentHeight(entries)
    );
    resizeObserver.observe(scrollContainer);
    return () => resizeObserver.disconnect();

  }, [getContentHeight]);
  
  useEffect(() => {
    const trackScroll = () => {
      scrollYmotionValue.set(-window.pageYOffset || -window.scrollY);
    };

    window.addEventListener("scroll", trackScroll);

    return () => window.removeEventListener("scroll", trackScroll);

  }, [scrollYmotionValue]);

  return (
    <>
      <motion.div 
        ref={scrollContainerRef}
        style={{ y: scrollYtransition }}
        className="scroll-container"
      >
        {children}
      </motion.div>
      <div style={{ height: contentHeight }}></div>
    </>
  );
};

export default ScrollContainer;
