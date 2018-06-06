import React,{Component} from 'react';
import List from '../component/list';
import {connect} from 'react-redux';
import './mylist.css'
class Recommendations extends Component {

    recommendList = () => {
         return this.props.recommend.map((post) => {
             return <List movie={post} type="Add" manipulate={this.props.add} key={post['id']}/>
         })
    }

     render(){
         return (
            this.props.recommend.length>0?
            <div className="List2">
                <div className="listName">
                     <h4>Recommendations</h4>
                </div>
                <div className="List">
                    {this.recommendList()}
                </div>
            </div>
            :null
         )
     }
}

const mapStateToProps = (state) => {
    return {
        recommend:state['recommendations']
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: (id) => dispatch({type:'add',id:id})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recommendations);