import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import dateFormat from '../../modules/dateFormat';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';

const Balancesheet = (props) => {
    
    const [showInactive, setShowInactive] = useState(false);
    const [loadedData, setLoadedData] = useState([]);
    const [balanceSheet, setBalanceSheet] = useState([]);
    const [sortMethod, setSortMethod] = useState('date');
    const [totals, setTotals] = useState({});
    const {currProp, setCurrProp} = useContext(AppContext);   
    const navigate = useNavigate();
  
    const sortData = (data, method) =>{
        
        const byDate = (dataByDate) => {
            dataByDate.sort(function(a,b){
                return new Date(b.t_date) - new Date(a.t_date);
            })
            return dataByDate;
        }
        
        const byCD = (dataByCD) => {
            dataByCD.sort(function(a,b){
                return b.debit_credit - a.debit_credit;
            })
            return dataByCD;
        }
        
        let sortedByDate = byDate(data);
        
        if (method==='credit-debit') {
            sortedByDate = byCD(sortedByDate)
        }
        return sortedByDate;
    }

    useEffect(()=> {
        
        const getBalanceSheetForProp = async () => {
            try {
                let prop_id = currProp.prop_id || currProp.p_id;
                const res = await fetch(`/api/transactions/trac/${prop_id}`);
                const data = await res.json();

                let sortedData = sortData(data);
                
                let sum = {credit:0,debit:0,total:0};
                sortedData.map((trac)=>{
                    if (trac.active===true) {
                        if (trac.debit_credit===1) {
                            sum.credit+=trac.amount;
                        } else {
                            sum.debit+=trac.amount;}
                    }
                })
                sum.total = sum.credit - sum.debit;
                setTotals(sum);
                setBalanceSheet(sortedData);
                setLoadedData(sortedData);
            }
            catch(err){
                console.log(err);
            }
            
        }
        getBalanceSheetForProp();
    },[])
    
    const handleOrder = () => {
        let newMethod = (sortMethod==='date')?'credit-debit':'date';
        setSortMethod(newMethod);
        let newOrder = sortData(balanceSheet, newMethod);       
        setBalanceSheet(newOrder);
    }
    
    const handleAddTrac = () => {
        navigate('/add-trac');
    }

    const handleEditTrac = (trac) => {
        trac.t_date=dateFormat(trac.t_date,'yyyy-MM-dd');
        setCurrProp(trac);
        navigate('/add-trac');
    }

    const handleFilter = () => {
        let fromDate = dateFormat(document.getElementById('from_date').value,'yyyy-MM-dd');
        let toDate = dateFormat(document.getElementById('to_date').value,'yyyy-MM-dd');
        if (fromDate>toDate) {
            alert('Error! "from" date cannot be after "to" data')
        } else {
            let manipData;
            // console.log(fromDate,toDate);
            if (fromDate==='NaN-NaN-NaN' && toDate==='NaN-NaN-NaN') {
                manipData = [...loadedData];
            } else {
                manipData = [...loadedData].filter(trac=>
                    dateFormat(trac.t_date,'yyyy-MM-dd')>fromDate &&
                    dateFormat(trac.t_date,'yyyy-MM-dd')<toDate
                    );
            }
            setBalanceSheet(manipData);
        }
    }

    const clearFilterDates = () => {
        document.getElementById('from_date').value='';
        document.getElementById('to_date').value='';
        handleFilter();
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      

    return (
        <div className="datasheet">
            <h3>Balancesheet | Current Balance: 
                {} <span className={(totals.total<0)?'red-text':'green-text'}>
                    {totals.total}$
                    </span>
            </h3>
            <h4>
                <b>Total income:</b> <span className='green-text'>{totals.credit}</span>
                {} | <b>Total expenses:</b> <span className='red-text'>{totals.debit}</span>
            </h4>
            <br />
            <Box sx={{ '& button': { m: 1 } }}>
            <Button 
                size="small" variant="outlined"
                onClick={()=>setShowInactive((showInactive)?false:true)}>
                {(showInactive)?'Hide':'Show'} inactive
            </Button>
            <Button 
                size="small" variant="outlined"
                onClick={()=>handleOrder()}>
                Order by {(sortMethod==='date')?'debit-credit':'date'}
            </Button>
            <Button 
                size="small" variant="contained"
                onClick={()=>handleAddTrac()}>
                Add transaction for this Property
            </Button>
            <br/>
            {} Show only transactions from date: <input type="date" id="from_date"/>
            {} to date: <input type="date" id="to_date"/>
            <Button 
                size="small" variant="outlined"
                onClick={()=>handleFilter()}>Filter by dates
            </Button>
            <Button 
                size="small" variant="outlined"
                onClick={()=>clearFilterDates()}>Clear dates
            </Button>
            
            <TableContainer component={Paper}>
                <Table  sx={{ minWidth: 150 }} 
                        size="small" 
                        aria-label="a dense table"
                        className="table-container">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell>Edit</StyledTableCell>
                            <StyledTableCell align="right">ID#</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                            <StyledTableCell align="right">Amount</StyledTableCell>
                            <StyledTableCell align="right">Type</StyledTableCell>
                            <StyledTableCell align="right">Method</StyledTableCell>
                            <StyledTableCell align="right">Reference</StyledTableCell>
                            <StyledTableCell align="right">Notes</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                    (balanceSheet)?
                    balanceSheet.map((trac,i) => 
                        (showInactive===false && trac.active===false) ? <></> :
                            <TableRow 
                                className={(trac.active)?'':'red-text striker'} 
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
                                key={i}>
                                <TableCell component="th" scope="row">
                                    <button onClick={()=>handleEditTrac(trac)}>Edit</button>
                                </TableCell>
                                <TableCell align="right">{trac.t_id}</TableCell>
                                <TableCell align="right">{dateFormat(trac.t_date,'dd/MM/yyyy')}</TableCell>
                                <TableCell align="right">
                                    <span className={(trac.debit_credit===1)?'green-text':'red-text'}>
                                        <b>{(trac.debit_credit===1)?'+':'-'}{trac.amount}$</b>
                                    </span>
                                </TableCell>
                                <TableCell align="right">{trac.trans_type}</TableCell>
                                <TableCell align="right">{trac.payment_method}</TableCell>
                                <TableCell align="right">{trac.trans_reference}</TableCell>
                                <TableCell align="right">{trac.notes}</TableCell>
                            </TableRow>                
                    )
                    : <div>No data</div>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
        </div>
    )
}

export default Balancesheet;