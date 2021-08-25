import React,{useContext,useState,useEffect} from 'react'

import {Card} from 'react-bootstrap'

const Assignment = ()=>{

    //console.log('test')
    return(
        <div>
            <Card bg='light' text='dark' style={{ width: '18rem' }} className="mb-2">
                <Card.Header></Card.Header>
                <Card.Body>
                <Card.Title>Assignment 1</Card.Title>

                </Card.Body>
            </Card>
        </div>
    )
}

export default Assignment