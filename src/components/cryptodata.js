import React,{Component} from 'react'
import '../css/home.css'
import left from '../Assets/Vector.png'
import right from '../Assets/VectorRight.png'
import { withRouter } from 'react-router'
import Spinner from 'react-bootstrap/Spinner';

class CryptoDetails extends Component{

constructor(props){
    super(props);
    this.state={
        data:[],
        page:1,
        total:null,
        start:1,
        end:5,
        search:'',
        savedid:[],
        load: true
    }
}
    componentDidMount(){
        var id = this.state.page

    // fetch total count
        require('axios')

        .get("https://api.nomics.com/v1/currencies/ticker?key=1c792932de8553c9119e1b983722f63e8d15939a")
        
        .then(response => {
            // console.log(response.data)
            let count = response.data.length
            
            console.log(count)

            this.setState({total: count})

                if(count<5){
                    this.setState({end: count})
                }
                else if(count==0){
                    this.setState({total: 0})
                }

            })

        // get crypto-currency data
            require('axios')

            .get("https://api.nomics.com/v1/currencies/ticker?key=1c792932de8553c9119e1b983722f63e8d15939a&attributes=id,name,symbol,price,logo_url&per-page=5&page="+id+"")
            
            .then(response => {
                // console.log(response.data)
                this.setState({data: response.data,load: false})
                
                if(response.data.length==0){
                    this.setState({start: 0,end: 0})
                }
            
                })
                    
    // get saved data 

        fetch("http://localhost:3001/getcurrency")
        .then(data => data.json())
        .then(data => {
            // console.log(data);
            this.setState({ savedid: data });
        });

    }

    handleRightClick=()=>{
        if(this.state.end!==this.state.total){
        this.setState({start: this.state.start+5,end: this.state.end+5,page: this.state.page+1})
        this.getData("forward");
        }
    }

    handleLeftClick=()=>{
        if(this.state.start!==1 && this.state.end!==5){
        this.setState({start: this.state.start-5,end: this.state.end-5,page: this.state.page-1})
        this.getData("back");
        }
    }

    getData=(val)=>{
        let value;
        if(val=="forward"){
            value = this.state.page+1
        }
        else if(val=="back"){
            value = this.state.page-1
        }
        require('axios')
        .get("https://api.nomics.com/v1/currencies/ticker?key=1c792932de8553c9119e1b983722f63e8d15939a&attributes=id,name,symbol,price&per-page=5&page="+value+"")
        .then(response => {
            // console.log(response.data)
            this.setState({data: response.data})
            if(this.state.data.length<5){
                this.setState({end: this.state.total})
            }
        }
  )
    }

    handlesearch(e){
        this.setState({search: e.target.value})
    }

    saveData=(e,data)=>{
        let saveid= {"id": data.id}
        // console.log(data)
        const det = {name: data.name,cu_id: data.id,symbol: data.symbol,price: data.price}
        // console.log(det)

        fetch("http://localhost:3001/savecurrency", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(det)
            }).then(response => response.json())
            .then((resdata) => {
            console.log(resdata)
            alert("Crypto Currency "+det.name+" is saved")

                fetch("http://localhost:3001/getcurrency")
            .then(data => data.json())
            .then(data => {
                // console.log(data);
                this.setState({ savedid: data });
                
            });
            });

            
    
        
    }
    render(){

        const cryptodata = this.state.data.filter(crypto =>{
            return crypto.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            
        })

        return(
            <div className="table-container">
                <div className="header">
                    <p className="font-style">Crypto Currency Table</p>
                    <div className="form-group table-search">
                        <span className="fa fa-search search-icon"></span>
                        <input type="text" className="form-control search-text" 
                        value={this.state.search} 
                        onChange={(e) => this.handlesearch(e)}
                        placeholder="Search By Crypto Name"/>
                    </div>
                </div>
                {this.state.load ?  
            <div className="m-auto mt-5"><center><Spinner animation="border" variant="primary"/></center></div>
            : 
            <React.Fragment>
                <table className="table table-responsive text-center">
                    <thead className="table-height">
                        <tr className="table-head font-style">
                            <th className="border-0">CRYPTO NAME</th>
                            <th className="border-0">SYMBOL</th>
                            {/* <th className="border-0">MARKET CAP</th> */}
                            <th className="border-0"></th>
                            <th className="border-0 text-start">CURRENT PRICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptodata.map((data,i)=>{
                        const data1 = this.state.savedid.find(id=> data.id == id.cu_id )
                            // console.log(data1)
                            return(
                            
                            <tr className="table-body font-style" key={i}>
                            <td className="body-row">{data.name}</td>
                            <td className="body-row"><span className="symbol-color"><span className='ellipse'>&#9642;</span>&nbsp;{data.symbol}</span></td>
                            {/* <td className="body-row">{data.market_cap}</td> */}
                            <td className="body-row">
                            {data1!==undefined? 
                                <button className="btn button-color text-white btn-text w-50" onClick={(e)=>this.props.history.push('/view')}>VIEW DATA</button>
                                : 
                                <button className="btn btn-save text-white btn-text w-50" onClick={(e)=>this.saveData(e,data)}>SAVE DATA</button>
                            }
                            </td>
                            <td className="body-row text-start">
                                <p className="m-0 mb-1">$ {data.price}</p>
                                <p className="m-0" style={{color: "#6E6893"}}>USD</p></td>
                            </tr>
                        )})
                    }
                        
                    </tbody>
                </table>
                <div className="pagin font-style">
                    <p className="h-100">
                        
                        <span className="m-auto">{this.state.start}-{this.state.end} of {this.state.total}</span> 
                        <span className="vec-img m-auto" onClick={()=>this.handleLeftClick()}>
                            <img src={left} alt=''/>
                        </span> 
                        <span className="vec-img m-auto" onClick={()=>this.handleRightClick()}>
                            <img src={right} alt=''/>
                        </span>
                    </p>
                </div>
                </React.Fragment>}
            </div>
        )
    }
}

export default withRouter(CryptoDetails)