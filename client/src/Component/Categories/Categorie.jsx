import {Container,Row,Col} from 'react-bootstrap'
import { useEffect } from 'react'
import useApi from '../../hooks/useApi'

import './Categorie.css'

const Categorie = () => {
    const [sendRequest , loading , error , response] = useApi('/category')

    useEffect(()=>{
        sendRequest()
    },[sendRequest])
    if(loading) return <h1>loading</h1>
    if(error) return <h1>{error}</h1>
    console.log(response?.data);
    return (
        <section id='cats'>
        <Container>
            <h1 className='text-center'> <span>Popular</span> Categories</h1>
            <Row className='justify-content-center'>
                {     response?.data?.map((item)=>(
                    <Col lg={4} md={6} sm={12} key={item._id}>
                    <div className="Categorie d-flex">
                        <img src={item.imageUrl} alt="" />
                        <p>{item.name}</p>
                    </div>
                    </Col>
                ))                   
                }
                {/* <Col lg={4} md={6} sm={12}>
                    <div className="Categorie d-flex">
                        <i className="fa-solid fa-shirt"></i>
                        <p>Women</p>
                    </div>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <div className="Categorie d-flex">
                        <i className="fa-solid fa-shirt"></i>
                        <p>Apple</p>
                    </div>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <div className="Categorie d-flex">
                        <i className="fa-solid fa-shirt"></i>
                        <p>Wristwatch</p>
                    </div>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <div className="Categorie d-flex">
                        <i className="fa-solid fa-shirt"></i>
                        <p>Parfum</p>
                    </div>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <div className="Categorie d-flex">
                        <i className="fa-solid fa-shirt"></i>
                        <p>Electronic</p>
                    </div>
                </Col> */}
            </Row>
        </Container>
    </section>
    )
}

export default Categorie