import React, {Component} from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { urlBuilder } from '~/routes';
import { Link } from 'react-router-dom';
import withStore from '~/hocs/withStore';

//import data from '../../../coins.json';

class DataTable extends Component{

    render(){

        let {data,sortField} = this.props;
       return (
        <table className="table">
            <thead>
                <tr>
                    <th>
                        <button onClick={()=>this.props.sortBy('rank')}>#</button>
                        {sortField.rank=='asc'?'↓': sortField.rank=='desc'? '↑': ''}
                    </th>
                    <th>
                        <button onClick={()=>this.props.sortBy('name')}>Name</button>
                        {sortField.name=='asc'?'↓': sortField.name=='desc'? '↑': ''}
                    </th>
                    <th>
                        <button onClick={()=>this.props.sortBy('symbol')}>Symbol</button>
                        {sortField.symbol=='asc'?'↓': sortField.symbol=='desc'? '↑': ''}
                    </th>
                    <th>
                        <button onClick={()=>this.props.sortBy('price_usd')}>Price</button>
                        {sortField.price_usd=='asc'?'↓': sortField.price_usd=='desc'? '↑': ''}
                    </th>
                    <th>
                        <button onClick={()=>this.props.sortBy('percent_change_1h')}>%/hour</button>
                        {sortField.percent_change_1h=='asc'?'↓': sortField.percent_change_1h=='desc'? '↑': ''}
                    </th>
                    <th>
                        <button onClick={()=>this.props.sortBy('percent_change_24h')}>%/day</button>
                        {sortField.percent_change_24h=='asc'?'↓': sortField.percent_change_24h=='desc'? '↑': ''}
                    </th>
                    <th>
                        <button onClick={()=>this.props.sortBy('percent_change_7d')}>%/week</button>
                        {sortField.percent_change_7d=='asc'?'↓': sortField.percent_change_7d=='desc'? '↑': ''}
                    </th>
                </tr>
            </thead>
            <tbody>
            {
                data.map(row=>(
                    <tr key={row.symbol}>
                        <td>{row.rank}</td>
                        <td>{row.name}</td>
                        <td>{row.symbol}</td>
                        <td>{row.price_usd}</td>
                        <td>{row.percent_change_1h}</td>
                        <td>{row.percent_change_24h}</td>
                        <td>{row.percent_change_7d}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
       )
    }
}
export default DataTable;
//export default withStore(DataTable);