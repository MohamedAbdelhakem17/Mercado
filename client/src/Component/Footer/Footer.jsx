import {Container,Row,Col} from 'react-bootstrap'

import './Footer.css'
const Footer = () => {
    return (
        <footer>
            <Container>
                <Row style={{borderBottom: '2px solid #a8a8a8'}}>
                    <Col lg={3} md={6} sm={12}>
                        <div className="f-top d-flex">
                            <img src="Symboljj.png" alt="" />
                            <p>FREE SHIPPING OVER</p>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <div className="f-top d-flex">
                            <img src="Symboljjj.png" alt="" />
                            <p>30 DAYS MONEY BACK</p>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <div className="f-top d-flex">
                            <img src="Symbolkkkk.png" alt="" />
                            <p>100% SECURE PAYMENT</p>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <div className="f-top d-flex">
                            <img src="Symboll;.png" alt="" />
                            <p>24/7 DEDICATED SUPPORT</p>
                        </div>
                    </Col>
                </Row>
                <div className="f-middle mt-9">
                    <Row>
                        <Col lg={4} md={6} sm={12}>
                            <div className="f-left">
                                <div className="f-left-top d-flex">
                                    <img src="logo.png" alt="" />
                                    <h1 className='text-light'>Mercado - <span style={{color:'#939393'}}>Online Shopping</span></h1>
                                </div>
                                <p>Mercado: Your top choice for online shopping with great prices, fast delivery, and a secure experience!</p>
                            </div>
                        </Col>
                        <Col lg={2} md={6} sm={12}>
                        <div className="list me-2">
                            <h1 className='text-light'>Quick links</h1>
                            <ul className='ms-3 mt-3'>
                                <li>Home</li>
                                <li>Shop</li>
                                <li>Offers</li>
                                <li>Contact</li>
                                <li>About</li>
                            </ul>
                        </div>
                        </Col>
                        <Col lg={2} md={6} sm={12}>
                            <div className="con-us">
                                <h1>Contact US</h1>
                                <div className="cons d-flex mt-3">
                                    <i className="fa-solid fa-location-dot align-content-center me-2" style={{color: '#999999;'}}></i>
                                    <p className='text-light'>Cairo, Downtown Street</p>
                                </div>
                                <div className="cons d-flex mt-3">
                                    <i className="fa-brands fa-whatsapp align-content-center  me-2" style={{color: '#999999;'}}></i>
                                    <p className='text-light'>+20 115 013 0229</p>
                                </div>
                                <div className="cons d-flex mt-3">
                                    <i className="fa-solid fa-envelope align-content-center  me-2" style={{color: '#999999;'}}></i>
                                    <p className='text-light'>Sales@example.com</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <div className="upd">
                                <h1>For Every Update</h1>
                                <div className="inp mt-4">
                                    <input type="text" placeholder='Enter your Email' />
                                    <button>SUBSCRIE</button>
                                </div>
                                <div className="social d-flex mt-5">
                                    <a className="btn text-dark">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                        {/* <!-- Twitter --> */}
                                    <a className="btn text-dark">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                        {/* <!-- Instagram --> */}
                                    <a className="btn text-dark">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                        {/* <!-- Linkedin --> */}
                                    <a className="btn text-dark">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                        {/* <!-- pinterest --> */}
                                    <a className="btn text-dark">
                                        <i className="fa-brands fa-pinterest"></i>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <p className='text-center text-light' style={{marginTop:'5rem'}}>© Copyright 2021. All rights reserved.</p>
            </Container>
        </footer>
    )
}

export default Footer