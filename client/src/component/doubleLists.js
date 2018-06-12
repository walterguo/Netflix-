import React,{Component} from 'react';
import {  CardImg, Button} from 'reactstrap';
import {connect} from 'react-redux';
import './doubleLists.css'
import {getData, updateData} from '../action/action';

class DoubleLists extends Component {

   url='/api/bears';

   header= () => {
       return (
           <div className="appheader">
                <div className="headerLeft">
                    <h3>NetFlix</h3>
                </div>
            </div>
       )
   }

   myMovieList = () => {
     return this.props.myList.map((post) => {
        return <List movie={post} type="remove" id={this.props._id} url={this.url} manipulate={this.props.updateLists} key={post['id']} />
    })
    }

    recommendList = () => {
      return this.props.recommend.map((post) => {
        return <List movie={post} type="add" id={this.props._id} url={this.url} manipulate={this.props.updateLists} key={post['id']}/>
     })
    }

    componentDidMount() {
        this.props.getLists(this.url);
    }

    render(){
     return(  
               <div className="wholelist">
                   {this.header()}
                  <div className="List1">
                      <div className="listName">
                          <h4>MyList</h4>
                     </div>
                     <div className="List">
                         {this.myMovieList()}
                     </div>
                  </div>
                  <div className="List2">
                      <div className="listName">
                          <h4>Recommendations</h4>
                     </div>
                     <div className="List">
                          {this.recommendList()}
                    </div>
                  </div>
              </div>
     )
    }
}

let List = (props) => {

    let colorType = props.type==='add'? 'primary':'danger';  
    let obj={
        type:props.type,
        id:props.movie.id
    };
    return (     
       <div className="singleCard">
          <CardImg className="movieimg" src={props.movie['img']} top alt="Avatar" />
          <div className="moviebody">
                <p>{props.movie['title']}</p> 
          </div>
         <div className="footer">
              <Button color={colorType} className="controlButton" onClick={() => props.manipulate(props.url, props.id, obj)}>{props.type}</Button>
         </div>
      </div>
    )
};

const mapStateToProps = (state) => {
    return {
        _id:state._id,
        myList:state.movieLists.mylist,
        recommend:state.movieLists.recommendations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateLists: (url, id, obj) => dispatch(updateData(url, id, obj)),
        getLists:(url) => dispatch(getData(url))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DoubleLists);