import React,{Component} from 'react';
import List from '../component/list';
import {connect} from 'react-redux';
import './mylist.css'

class MyList extends Component {

    myMovieList = () => {
         return this.props.myList.map((post) => {
             return <List movie={post} type="Remove" manipulate={this.props.remove} key={post['id']} />
         })
    }

     render(){
         return (
             this.props.myList.length>0?
            <div className="List1">
                <div className="listName">
                     <p>MyList</p>
                </div>
                <div className="List">
                    {this.myMovieList()}
               </div>
            </div>
            :null
         )
     }
}

const mapStateToProps = (state) => {
    console.log(state['mylist'])
    return {
        myList:state['mylist']
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        remove: (id) => dispatch({type:'remove',id:id})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyList);