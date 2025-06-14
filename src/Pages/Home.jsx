import React, { useState, useEffect , useRef} from 'react';
import style from './homestyle.module.css';
import { IoIosArrowDown } from "react-icons/io";
import { FaStar  } from "react-icons/fa";



const Home = () => {
  const trackRef = useRef(null);       
const itemsRef = useRef([]);
const [activeMap, setActiveMap] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [scale, setScale] = useState(2); 
  const [scrolled, setScrolled] = useState(false);
  const [scrolled2, setScrolled2] = useState(false);
const [isMobile, setIsMobile] = useState(false);

  const images = [
   process.env.PUBLIC_URL +'/logo2.png',
   process.env.PUBLIC_URL +'/frame7.jfif',
   process.env.PUBLIC_URL +'/frame4.jfif',
   process.env.PUBLIC_URL +'/frame6.jfif',
   process.env.PUBLIC_URL +'/frame3.jfif',
   process.env.PUBLIC_URL +'/frame5.jfif',
   process.env.PUBLIC_URL +'/frame2.jfif',
   process.env.PUBLIC_URL +'/frame1.jfif',
   process.env.PUBLIC_URL +'/logo2.png',
 
];

useEffect(() => {
  let frameId;

  const updateActiveImages = () => {
    const track = trackRef.current;
    const screenCenter = window.innerWidth / 2;
    const transform = getComputedStyle(track).transform;

    let translateX = 0;
    if (transform && transform !== 'none') {
      const matrix = new DOMMatrixReadOnly(transform);
      translateX = matrix.m41;
    }

    const newMap = {};
    itemsRef.current.forEach((imgEl, index) => {
      if (!imgEl) return;

      const offsetLeft = imgEl.offsetLeft;
      const itemCenter = (offsetLeft + (imgEl.offsetWidth / 2)) +200+ translateX;

      const distance = Math.abs(screenCenter - itemCenter);
      newMap[index] = distance < 240;
    });

    setActiveMap(newMap);
    frameId = requestAnimationFrame(updateActiveImages);
  };

  frameId = requestAnimationFrame(updateActiveImages);
  return () => cancelAnimationFrame(frameId);
}, []);

useEffect(() => {
  const handleScroll = () => {    
    setScrolled(window.scrollY > 1000);
    
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
useEffect(() => {
  const handleScroll = () => {    
    setScrolled2(window.scrollY > 1844);
    
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  useEffect(() => {
  let animationId;

  const animate = () => {
    setScale(prev => {
      const target = isHovered ? 6 : 2; // ← هنا التعديل الصح
      const step = 0.3;
      if (Math.abs(prev - target) < step) return target;
      return prev + (isHovered ? step : -step);
    });
    animationId = requestAnimationFrame(animate);
  };

  animationId = requestAnimationFrame(animate); // ← هنا كمان
  return () => cancelAnimationFrame(animationId); // ← Clean-up تمام كده
}, [isHovered]);
useEffect(() => {
  if (isMobile) return;

  const elements = document.querySelectorAll('.parallax');
  let animationFrameId;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // نستخدم requestAnimationFrame للسلاسة
    animationFrameId = requestAnimationFrame(() => {
      elements.forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0.2;
        el.style.transform = `translateY(${-scrollY * speed}px)`;
      });
    });
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    cancelAnimationFrame(animationFrameId); // نوقف أي frame شغالة
  };
}, [isMobile]);

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth <= 768);
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);
  return (
    <>
    <div className={style.container}>
    <header className={style.herosection}>
      <div className={style.label}>
        <h1 className={`${style.yourhealth} parallax`} data-speed="-0.6">
          <span className={style.textwrapper}>Your Health </span>
          <span className={style.span}>Comes First</span>
        </h1>
        <p className={`${style.content} parallax`} data-speed="-0.6">
          <span className={style.span}>Aurum Clinic </span>
          <span className={style.textwrapper}>
            offer comprehensive medical services with top doctors and the latest
            technology to ensure better health for you and your family.
          </span>
        </p>

        <div className={`${style.btnWrapper} parallax`} data-speed="-0.6">
          <button
            className={style.btn}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <svg
              width="130"
              height="60"
              viewBox="0 0 161 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={style.svg}
            >
              <g opacity="0.51" filter="url(#filter0)">
                <rect x="0" y="2" width="157" height="62" rx="18" fill="#8ED6E1" />
              </g>
              <defs>
                <filter
                  id="filter0"
                  x="0"
                  y="0"
                  width="161"
                  height="66"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.05 0.05"
                    numOctaves="3"
                    seed="9080"
                  />
                  <feDisplacementMap
                    in="shape"
                    scale={scale} // ← ده اللي بيتغير تدريجيًا
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="displacedImage"
                  />
                  <feMerge>
                    <feMergeNode in="displacedImage" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
            <span className={style.btnText}>Book Now</span>
          </button>

          <button className={style.btn2} >contact us</button>
        </div>
      </div>
      <div className={style.doctorImage}>
        <img src={ process.env.PUBLIC_URL +'/DOC.png'}className="parallax" data-speed="-0.6" alt='doctor'  />
      </div>
      
    </header>
    <section className={style.slide}>
        <p>Trusted by <span className={style.span}>1K+</span> patients to feel better and live healthier</p>
        <div className={style.slider}>

        
                <div className={style.slidecontainer} ref={trackRef}>
             {images.map((src, index) => (
                <div
                  key={index}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className={`${style.imgcont} ${activeMap[index] ? style.active : ''}`}
                >
                  <img src={src} className={style.slideitem} />
                </div>
              ))}

            </div>
          </div>
         <div className={style.Departments}>
            <h2>Departments Built on Trust</h2>
            <p className={style.para}>From cardiology to dermatology, our expert teams deliver care that patients rely on — every day.</p>
            <section className={style.rate}>
            <div className={`${style.Depart} ${scrolled ? style.show : ''}`}> 
                
                <h5>
                    Pediatrics 
              <span className={style.arrow}><IoIosArrowDown size={27}/></span>      
                </h5><div className={style.line}>
                <img src={ process.env.PUBLIC_URL +'/1.png'} className={style.item}/>
                <img src={ process.env.PUBLIC_URL +'/2.png'} className={style.item}/>
                <img src={ process.env.PUBLIC_URL +'/3.png'}className={style.item}/>
                <img src={ process.env.PUBLIC_URL +'/4.png'}className={style.item}/>
                <img src={ process.env.PUBLIC_URL +'/5.png'}className={style.item}/>
                <img src={ process.env.PUBLIC_URL +'/6.png'}className={style.item}/>
                </div>
                 </div>
         
         <div className={`${style.ments} ${scrolled ? style.show2 : ''}`}>
            <div className={style.profile}> 
             <div className={style.imageWrapper}> 
                <span className={style.name}>
                    <img src={ process.env.PUBLIC_URL +"/femaledoc.jfif"} alt="Female Doctor" />
                <h3>Dr. Amal Mohamed
                <p>General Practitioner</p>
                </h3></span>
                <span className={style.rating}> 4.7 <FaStar color='ffd700'/></span></div>
                <p>Experienced general practitioner with a focus on holistic patient care.</p>
            </div>
            <hr/>
            <div className={style.profile}> 
               <div className={style.imageWrapper}>
                 <span className={style.name}><img src={ process.env.PUBLIC_URL +"/maledoc.jfif"} alt="Male Doctor" />
                <h3>Dr. Kareem Saleh
                <p>Pediatrics</p>
                </h3></span>
                <span className={style.rating}>4.5 <FaStar color='ffd700'/></span></div>
                <p>Dedicated pediatrician with a passion for child health and well-being.</p>

            </div>
            <hr/>
            <div className={style.profile}> 
              <div className={style.imageWrapper}>
            <span className={style.name}><img src={ process.env.PUBLIC_URL +"/maledoc2.jfif"} alt="Male Cardiologist" />
                <h3>Dr. John Doe
                <p>Cardiologist</p>
                </h3></span>
                <span className={style.rating}>5.0 <FaStar color='ffd700'/></span></div>
                <p>Over 10 years’ experience in cardiology. Cairo University graduate with a focus on heart health.</p>

            </div>
            <hr/>
            <div className={style.profile}> 
              <div className={style.imageWrapper}>
            <span className={style.name}><img src={ process.env.PUBLIC_URL +"/femaledoc2.jfif"} alt="Female Cardiologist" />
                <h3>Dr. Sara Smith
                <p>Dermatology</p>
                </h3></span>
                <span className={style.rating}>5.0 <FaStar color='ffd700'/></span></div>
                <p>Over 12 years’ experience in dermatology. Cairo University graduate with a focus on skin health.</p>

            </div>
            <hr/>
         </div>
          </section>
         </div>
    </section>
    <section className={style.about}>
        <h2>What Our Patients <span className={style.span}>Say</span></h2>
        <p className={style.para}>Real feedback from people we've had the honor to care for</p>
        <div className={style.sliderWrapper}>
<div className={style.card}>

          <div className={style.review}> 
              <div className={style.imageWrapper}>
            <span className={style.name}><img src={ process.env.PUBLIC_URL +"/femaledoc2.jfif"} alt="Female Cardiologist" />
                <h3>Dr. Sara Smith
                <p>Dermatology</p>
                </h3></span>
                <span className={style.rating}>{[...Array(5)].map((_, i) => (
                <FaStar key={i} color="#ffd700" />
                    ))}</span></div>
                <p>Over 12 years’ experience in dermatology. Cairo University graduate with a focus on skin health.</p>

            </div>
                      <div className={style.review}> 
              <div className={style.imageWrapper}>
            <span className={style.name}><img src={ process.env.PUBLIC_URL +"/femaledoc2.jfif"} alt="Female Cardiologist" />
                <h3>Dr. Sara Smith
                <p>Dermatology</p>
                </h3></span>
                <span className={style.rating}>{[...Array(5)].map((_, i) => (
                    <FaStar key={i} color="#ffd700" />
                ))}</span></div>
                <p>Over 12 years’ experience in dermatology. Cairo University graduate with a focus on skin health.</p>

            </div>         
             <div
              className={style.review}> 
              <div className={style.imageWrapper}>
            <span className={style.name}><img src={ process.env.PUBLIC_URL +"/femaledoc2.jfif"} alt="Female Cardiologist" />
                <h3>Dr. Sara Smith
                <p>Dermatology</p>
                </h3></span>
                <span className={style.rating}>{[...Array(5)].map((_, i) => (
                    <FaStar key={i} color="#ffd700" />
                ))}</span></div>
                <p>Over 12 years’ experience in dermatology. Cairo University graduate with a focus on skin health.</p>

            </div>
             <div
              className={style.review}> 
              <div className={style.imageWrapper}>
            <span className={style.name}><img src={ process.env.PUBLIC_URL +"/femaledoc2.jfif"} alt="Female Cardiologist" />
                <h3>Dr. Sara Smith
                <p>Dermatology</p>
                </h3></span>
                <span className={style.rating}>{[...Array(5)].map((_, i) => (
                    <FaStar key={i} color="#ffd700" />
                ))}</span></div>
                <p>Over 12 years’ experience in dermatology. Cairo University graduate with a focus on skin health.</p>

            </div>
             <div
              className={style.review}> 
              <div className={style.imageWrapper}>
            <span className={style.name}><img src={ process.env.PUBLIC_URL +"/femaledoc2.jfif"} alt="Female Cardiologist" />
                <h3>Dr. Sara Smith
                <p>Dermatology</p>
                </h3></span>
                <span className={style.rating}>{[...Array(5)].map((_, i) => (
                    <FaStar key={i} color="#ffd700" />
                ))}</span></div>
                <p>Over 12 years’ experience in dermatology. Cairo University graduate with a focus on skin health.</p>

            </div>

        </div>
<div className={style.card2}>

          <div className={style.review}> 
              <div className={style.imageWrapper}>
            <span className={style.name}><img src={ process.env.PUBLIC_URL +"/femaledoc2.jfif"} alt="Female Cardiologist" />
                <h3>Dr. Sara Smith
                <p>Dermatology</p>
                </h3></span>
                <span className={style.rating}>{[...Array(5)].map((_, i) => (
                <FaStar key={i} color="#ffd700" />
                    ))}</span></div>
                <p>Over 12 years’ experience in dermatology. Cairo University graduate with a focus on skin health.</p>

            </div>
                      <div className={style.review}> 
              <div className={style.imageWrapper}>
            <span className={style.name}><img src={ process.env.PUBLIC_URL +"/femaledoc2.jfif"} alt="Female Cardiologist" />
                <h3>Dr. Sara Smith
                <p>Dermatology</p>
                </h3></span>
                <span className={style.rating}>{[...Array(5)].map((_, i) => (
                    <FaStar key={i} color="#ffd700" />
                ))}</span></div>
                <p>Over 12 years’ experience in dermatology. Cairo University graduate with a focus on skin health.</p>

            </div>         
             <div
              className={style.review}> 
              <div className={style.imageWrapper}>
            <span className={style.name}><img src={ process.env.PUBLIC_URL +"/femaledoc2.jfif"} alt="Female Cardiologist" />
                <h3>Dr. Sara Smith
                <p>Dermatology</p>
                </h3></span>
                <span className={style.rating}>{[...Array(5)].map((_, i) => (
                    <FaStar key={i} color="#ffd700" />
                ))}</span></div>
                <p>Over 12 years’ experience in dermatology. Cairo University graduate with a focus on skin health.</p>

            </div>
             <div
              className={style.review}> 
              <div className={style.imageWrapper}>
            <span className={style.name}><img src={ process.env.PUBLIC_URL +"/femaledoc2.jfif"} alt="Female Cardiologist" />
                <h3>Dr. Sara Smith
                <p>Dermatology</p>
                </h3></span>
                <span className={style.rating}>{[...Array(5)].map((_, i) => (
                    <FaStar key={i} color="#ffd700" />
                ))}</span></div>
                <p>Over 12 years’ experience in dermatology. Cairo University graduate with a focus on skin health.</p>

            </div>
             <div
              className={style.review}> 
              <div className={style.imageWrapper}>
            <span className={style.name}><img src={ process.env.PUBLIC_URL +"/femaledoc2.jfif"} alt="Female Cardiologist" />
                <h3>Dr. Sara Smith
                <p>Dermatology</p>
                </h3></span>
                <span className={style.rating}>{[...Array(5)].map((_, i) => (
                    <FaStar key={i} color="#ffd700" />
                ))}</span></div>
                <p>Over 12 years’ experience in dermatology. Cairo University graduate with a focus on skin health.</p>

            </div>

        </div>
        </div>

        </section>
        <section className={style.choose}>
            <h2>Why Choose Aurum Clinic?</h2>
            <p className={style.para}>More than healthcare a complete, trusted experience.</p>
            <div className={style.why}>

                <div className={`${style.whyitem} ${scrolled2 ? style.whyshow : ''}`} style={{backgroundImage: `url(${process.env.PUBLIC_URL}/clinic.png)`}}>
                    <h3>Experienced Medical Team</h3>
                    <p>Certified doctors with years of hands-on experience.</p>
                </div>
                <div className={`${style.whyitem} ${scrolled2 ? style.whyshow : ''}`} style={{backgroundImage: `url(${process.env.PUBLIC_URL}/clinic-2.png)`}}>
                    <h3>Simple Booking & Follow Up</h3>
                    <p>Book your session or ask questions in just a few clicks.</p>
                </div>
                <div className={`${style.whyitem} ${scrolled2 ? style.whyshow : ''}`} style={{backgroundImage: `url(${process.env.PUBLIC_URL}/clinic-3.png)`}}>
                    <h3>Multiple Locations</h3>
                    <p>Easy access across several governorates.</p>
                </div>
                <div className={`${style.whyitem} ${scrolled2 ? style.whyshow : ''}`} style={{backgroundImage: `url(${process.env.PUBLIC_URL}/clinic-4.png)`}}>
                    <h3>Patient Centered Care</h3>
                    <p>We listen. We understand. We care. Your Health Comes First </p>
                </div>
            </div>
        </section>
<section className={style.contact}>
<h2>Contact Us</h2>
<p className={style.para}>5+ Locations Across <span className={style.span}>Egypt</span></p>
<div className={style.locations}>
  <div className={style.koko}><ul>
    <li>📍 Nasr City - Cairo</li>
    <li>📍 6th of October - Giza</li>
    <li>📍 Heliopolis - Cairo</li>
    <li>📍 Alexandria - Smouha</li>
    <li>📍 Mansoura - Dakahlia</li>
  </ul>
  <div>
       <button
className={style.btn3} > Book your nearest branch</button>
  </div>


  </div>
  
<div className={style.warr}>
<img src={ process.env.PUBLIC_URL +'/preview.png'} className={style.pere}/>
        </div>
            </div>
    </section>
          </div> 
       </>
  );
};
export default Home;