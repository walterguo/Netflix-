import React from 'react';
import { Card, CardImg, CardBody,CardTitle,CardFooter, Button } from 'reactstrap';
import './list.css'

const List = (props) => {
     return (
         

        //  <div className="singleCard">
        //     <Card className="single">
        //         <CardImg className="movieimg" top src={props.movie['img']} />
        //         <div className="moviebody">
        //             <CardTitle>{props.movie['title']}</CardTitle>
        //         </div>
        //         <CardFooter className="footer"><Button className="controlButton" onClick={() => props.manipulate(props.movie['id'])}>{props.type}</Button></CardFooter>
        //     </Card>
        //  </div>

    <div class="singleCard">
           <CardImg className="movieimg" src={props.movie['img']} top alt="Avatar" />
           <div class="moviebody">
                 <p>{props.movie['title']}</p> 
           </div>
          <div className="footer">
               <Button className="controlButton" onClick={() => props.manipulate(props.movie['id'])}>{props.type}</Button>
          </div>
    </div>


     )
};

export default List;