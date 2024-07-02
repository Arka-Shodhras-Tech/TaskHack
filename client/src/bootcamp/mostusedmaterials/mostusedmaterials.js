import React from 'react';
import './mostusedmaterials.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
export const MostusedMaterials = () => {
    const materials = ['React', 'Css', 'Js', 'HTML', 'NODE'];
    return (
        <>
            <div>
                <div className="materials-sections">
                    <h2 style={{ color: "gray",marginLeft:'40%' }}>Most used Materials</h2>
                    <div className="cards-containers">
                        {materials.map((material, index) => (
                            <Card className='card-style'style={{ width: '18rem' }} key={index}>
                                <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/like.png`} alt={material} />
                                <Card.Body>
                                    <Card.Title>{material}</Card.Title>
                                    <Card.Text>
                                    </Card.Text>
                                    <Button className='hover hvr-buzz-out card-color' variant="primary">View</Button>
                                    <Button style={{ marginLeft: '2%'}} className='hover hvr-buzz-out card-color' variant="primary">Download</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
