import React,{useContext,useState,useEffect} from 'react'

import {Card} from 'react-bootstrap'

const Assignment = ()=>{

    //console.log('test')
    return(
        <div>
            <Card bg='light' text='dark' style={{ width: '18rem' }} className="mb-2">
                <Card.Header>Assignments</Card.Header>
                <Card.Body>
                <Card.Title>Assignment 1</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Assignment