import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard.jsx';
import LogoLoop from '../components/LogoLoop.jsx';
import BounceCards from '../components/BounceCards.jsx';
import ShinyText from '../components/ShinyText.jsx';
import CircularText from '../components/CircularText.jsx';
import TextType from '../components/TextType';
import { courseBadges, courseList } from '../coursesData.js';
import { languages, frameworksFrontend, frameworksBackend, databases, operatingSystems, otherSoftware } from '../skillsData.jsx';
import miFoto from '../assets/profile-pic.png';

const pageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.0, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
};

export default function AboutPage() {
    const navigate = useNavigate();
    const goHome = () => {
        window.dispatchEvent(new Event('resetcursor'));
        setTimeout(() => {
            navigate('/inicio');
        }, 100); 
    };
    const handleNavigateToContact = () => {
        window.dispatchEvent(new Event('resetcursor'));
        setTimeout(() => {
            navigate('/contact');
        }, 100);
    };

    return (
        <>
            <div className="back-to-home-button cursor-target" onClick={goHome}>
                <CircularText
                    text="Back Back Back "
                    onHover="pause"
                    spinDuration={25}
                />
            </div>
            <motion.div variants={pageAnimation} initial="initial" animate="animate" exit="exit">
                
                {/* --- SECCIÓN 1: SOBRE MÍ--- */}
                <section className="about-section">
                    <ShinyText
                        text="About me" 
                        disabled={false} 
                        speed={3} 
                        className='section-title cursor-target'
                    />
                    <div className="about-content">
                        
                        <div className="about-column-left">
                            <ProfileCard
                                name="Christopher"
                                title="Systems Engineer"
                                handle="c.chr.dev"
                                avatarUrl={miFoto}
                                enableTilt={true}
                                showUserInfo={true}
                                enableMobileTilt={true}
                                showBehindGradient={true}
                                status={false}
                                onContactClick={handleNavigateToContact}
                                iconUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Cpath fill='rgba(255,255,255,0.06)' d='M250 0 C111.9 0 0 111.9 0 250 C0 388.1 111.9 500 250 500 C388.1 500 500 388.1 500 250 C500 111.9 388.1 0 250 0 Z M250 450 C139.6 450 50 360.4 50 250 C50 139.6 139.6 50 250 50 C360.4 50 450 139.6 450 250 C450 360.4 360.4 450 250 450 Z M275 125 C263.8 125 250 136.2 250 150 L250 350 C250 363.8 263.8 375 275 375 L375 375 C388.8 375 400 363.8 400 350 C400 336.2 388.8 325 375 325 L275 325 L275 125 Z'/%3E%3C/svg%3E"
                            />
                            
                            <TextType 
                                text={["I am a passionate developer who creates intelligent solutions by combining current backend, frontend, and artificial intelligence technologies."]}
                                typingSpeed={75}
                                pauseDuration={1500}
                                showCursor={true}
                                cursorCharacter="_"
                                className="hero-description cursor-target"
                                style={{textAlign: 'center', maxWidth: '400px'}}
                            />
                        </div>
                        
                        <div className="about-column-right">
                            <ShinyText
                                text="Certifications" 
                                disabled={false} 
                                speed={3} 
                                className='custom-class cursor-target' 
                            />
                            <BounceCards images={courseBadges} containerWidth={500} containerHeight={200} enableHover={true} />
                            <ul className="courses-list">
                                {courseList.map((course) => (
                                    <li key={course.name}>
                                        <a className='cursor-target' href={course.url} target="_blank" rel="noopener noreferrer">
                                            {course.name}
                                            <span>{course.issuer} - {course.date}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- SECCIÓN 2: HERRAMIENTAS --- */}
                <section className="tools-section ">
                    <ShinyText
                        text="Technologies and tools" 
                        disabled={false} 
                        speed={3} 
                        className='section-title cursor-target' 
                    />
                    {/* Loop 1: Lenguajes (Izquierda) */}
                    <h3 className='cursor-target'>Programming languages</h3>
                    <LogoLoop logos={languages} speed={100} direction="left" logoHeight={40} gap={40} pauseOnHover scaleOnHover fadeOut fadeOutColor="var(--color-background)" />
                    
                    {/* Loop 2: Frameworks Frontend (Derecha) */}
                    <h3 className='cursor-target'>Frameworks frontend</h3>
                    <LogoLoop logos={frameworksFrontend} speed={100} direction="right" logoHeight={40} gap={40} pauseOnHover scaleOnHover fadeOut fadeOutColor="var(--color-background)" />

                    {/* Loop 3: Frameworks Backend (Izquierda) */}
                    <h3 className='cursor-target'>Frameworks backend</h3>
                    <LogoLoop logos={frameworksBackend} speed={100} direction="left" logoHeight={40} gap={40} pauseOnHover scaleOnHover fadeOut fadeOutColor="var(--color-background)" />

                    {/* Loop 4: Bases de Datos (Derecha) */}
                    <h3 className='cursor-target'>Data bases</h3>
                    <LogoLoop logos={databases} speed={100} direction="right" logoHeight={40} gap={40} pauseOnHover scaleOnHover fadeOut fadeOutColor="var(--color-background)" />

                    {/* Loop 5: Sistemas Operativos (Izquierda) */}
                    <h3 className='cursor-target'>Operating systems </h3>
                    <LogoLoop logos={operatingSystems} speed={100} direction="left" logoHeight={40} gap={40} pauseOnHover scaleOnHover fadeOut fadeOutColor="var(--color-background)" />

                    {/* Loop 6: Otro Software (Derecha) */}
                    <h3 className='cursor-target'>Software and tools</h3>
                    <LogoLoop logos={otherSoftware} speed={100} direction="right" logoHeight={40} gap={40} pauseOnHover scaleOnHover fadeOut fadeOutColor="var(--color-background)" />
                
                </section>
                
            </motion.div>
        </>
    );
}