import {motion} from 'framer-motion'
import Footer from '../Footer/Footer'
import './Home.css'
import Categorie from '../Categories/Categorie'

const Home = () => {

    

    return (
        <>
            <main id="screen-anim">
                {/* screen 1  */}
                <motion.div
                initial = {{opacity: 0 , display: 'none'}}
                animate = {{opacity: 1, display: 'block'}}
                transition={{
                    delay:4,
                    duration :1,
                    repeatDelay: 5,
                    repeat:Infinity,
                    repeatType:'reverse'
                    
                }}
                className="photo">
                    <div className="screen-des ms-10">
                        <h1 className='title'>Noise Cancelling <span>Headphone</span></h1>
                        <p className='mt-6'>Boso Over-Ear Headphone , Wifi, Voice Assistant,Low latency game mde.</p>
                        <button className='mt-10'> Shop Now</button>  
                    </div>
                </motion.div>
                {/* screen 2  */}
                <motion.div
                initial = {{opacity: 0 , display: 'none'}}
                animate = {{opacity: 1 , display: 'block'}}
                transition={{
                    delay: 2,
                    duration :1,
                    repeatDelay: 3,
                    repeat:Infinity,
                    repeatType:'reverse'
                    
                }}
                className="photo2">
                    <div className="screen-des ms-10">
                        <h1 className='title'>EKO 40 Android TV</h1>
                        <p className='mt-6'>Smart Full HD Android TV with Google Assistant.</p>
                        <button className='mt-10'> Shop Now</button>  
                    </div>
                </motion.div>
                {/* screen 3  */}
                <motion.div
                initial = {{opacity: 1,display:'block'}}
                animate = {{opacity: 0,display: 'none'}}
                
                transition={{
                    duration :2,
                    repeatDelay: 10,
                    repeat:Infinity,
                    repeatType:'reverse'
                }}
                className="photo3">
                    <div className="screen-des ms-11">
                        <motion.h1
                        initial={{scale:1.4}}
                        animate={{fontSize:0}}
                        transition={{
                            duration:2,
                            repeatDelay: 10,
                            repeat:Infinity,
                            repeatType:'reverse'
                        }}
                        className='title title3'>iPad mini <span>2022</span></motion.h1>
                        <p >Mega Power in mini size</p>
                        <button className='mt-10'> Shop Now</button>  
                    </div>
                </motion.div>
            </main>
            <Categorie />
            <Footer />
        </>
    )
}

export default Home

