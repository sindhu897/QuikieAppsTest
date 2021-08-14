import React,{Component} from 'react'
import '../css/home.css'
import '../css/view.css'
import { withRouter } from 'react-router'

class SavedData extends Component{

constructor(props){
    super(props);
    this.state={
        data:[],
    }
}
    componentDidMount(){
        
        this.savedData();
    
    }

    savedData=()=>{
        fetch("http://localhost:3001/savedData")
        .then(data => data.json())
        .then(data => {
            // console.log(data);
            this.setState({ data: data });
        });
    }

    back=()=>{
        this.props.history.push('/home')
    }

    delete=(name)=>{
        console.log(name)
        fetch("http://localhost:3001/deletedata",{
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name })
            }).then(data => data.json())
                .then(data => {
                    // console.log(data);
                    this.savedData();
                    
                });
    }

    render(){

        return(
            <div className="table-container">
                <div className="view-header">
                    <p className="font-style view-table">Saved Data Table</p>
                </div>
                <table className="table table-responsive text-center">
                    <thead className="table-height">
                        <tr className="table-head font-style">
                            <th className="border-0">CRYPTO NAME</th>
                            <th className="border-0">SYMBOL</th>
                            {/* <th className="border-0">MARKET CAP</th> */}
                            <th className="border-0"></th>
                            <th className="border-0 left">CURRENT PRICE</th>
                        </tr>
                    </thead>
                    <tbody style={{maxHeight: '250px',overflowY:'auto'}}>
                        
                        {this.state.data.length>0 ? this.state.data.map(data=>(
                            <tr className="table-body font-style">
                            <td className="body-row">{data.name}</td>
                            <td className="body-row"><span className="symbol-color"><span className='ellipse'>&#9642;</span>&nbsp;{data.symbol}</span></td>
                            {/* <td className="body-row">{data.market_cap}</td> */}
                            <td className="body-row">
                                <button className="btn button-color text-white btn-text" onClick={(e)=>this.delete(data.cu_id)}>DELETE</button>
                            </td>
                            <td className="body-row left">
                                <p className="m-0 mb-1">$ {data.price}</p>
                                <p className="m-0" style={{color: "#6E6893"}}>USD</p></td>
                            </tr>
                        )) : <tr className="table-body font-style">
                            <td className="body-row no-data" colSpan="4">No Saved Records</td></tr>}
                        
                    </tbody>
                </table>
                <div className="pagin font-style text-center back-btn">
                <button className="btn button-color text-white btn-text" onClick={()=>this.back()}>BACK</button>
                </div>
            </div>
        )
    }
}

export default withRouter(SavedData);