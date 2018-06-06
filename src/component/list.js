import React from 'react';
import {  CardImg, Button } from 'reactstrap';
import './list.css'

const List = (props) => {

     let colorType = props.type==='Add'? 'primary':'danger';

     return (     
        <div class="singleCard">
           <CardImg className="movieimg" src={props.movie['img']} top alt="Avatar" />
           <div class="moviebody">
                 <p>{props.movie['title']}</p> 
           </div>
          <div className="footer">
               <Button color={colorType} className="controlButton" onClick={() => props.manipulate(props.movie['id'])}>{props.type}</Button>
          </div>
       </div>


     )
};

export default List;