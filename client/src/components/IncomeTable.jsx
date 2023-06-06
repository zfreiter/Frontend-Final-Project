// mui
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField' 

// react
import {useState, useEffect} from 'react';


export default function IncomeTable({symbol}) {

    
    const [incomeData, setIncomeData] = useState();
    const IncomeUrl = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=55AAZ5Q51TMSDPYQ`;

    useEffect(() => {
        fetch(IncomeUrl)
        .then(response => {return response.json()})
        .then(data => {
            let myData = data['annualReports'][1];
            setIncomeData(myData);
            console.log(myData);
           
        })
        .catch(err => console.log('Error: ', err));
      },[]);

      const Monify = (toMonify) => {
        return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(toMonify);
      }

    return (incomeData ?
        <>
            <Box sx={{display: 'block', margin: '2%'}}>
                <Box sx={{width: '100%', marginBottom: '3%'}}>
                    <TextField 
                    id="ISTitle"
                    variant='outlined'
                    color='success' 
                    label={`Fiscal Year End: ${incomeData.fiscalDateEnding}`}
                    defaultValue={'Income Statement Overview'}
                    sx={{width: '100%'}}
                    inputProps={{style: {color: '#004a0f', fontWeight: 'bold', textAlign: 'center', fontSize: 'large'}}}
                    InputProps={{readOnly: true}}
                    />
                </Box>
                <Box sx={{display: 'flex', flexWrap: 'flex', justifyContent: 'space-evenly'}}>
                    <TextField 
                        id="GrossProfit"
                        variant='outlined'
                        label='Gross Profit'
                        color='success' 
                        defaultValue={Monify(incomeData.grossProfit)}
                        sx={{width: '45%'}}
                        inputProps={{style: {color: '#004a0f', fontWeight: 'bold', textAlign: 'center', fontSize: 'large'}}}
                        InputProps={{readOnly: true}}
                        />
                        <TextField 
                        id="NetIncome"
                        variant='outlined'
                        label='Net Income'
                        color='success' 
                        defaultValue={Monify(incomeData.netIncome)}
                        sx={{width: '45%'}}
                        inputProps={{style: {color: '#004a0f', fontWeight: 'bold', textAlign: 'center', fontSize: 'large'}}}
                        InputProps={{readOnly: true}}
                        />
                </Box>
                <Box sx={{display: 'flex', flexWrap: 'flex', justifyContent: 'space-evenly', marginTop: '3%'}}>
                    <TextField 
                        id="OpExpenses"
                        variant='outlined'
                        label='Operating Expenses'
                        color='success' 
                        defaultValue={Monify(incomeData.operatingExpenses)}
                        sx={{width: '45%'}}
                        inputProps={{style: {color: '#004a0f', fontWeight: 'bold', textAlign: 'center', fontSize: 'large'}}}
                        InputProps={{readOnly: true}}
                        />
                        <TextField 
                        id="TotalRev"
                        variant='outlined'
                        label='Total Revenue'
                        color='success' 
                        defaultValue={Monify(incomeData.totalRevenue)}
                        sx={{width: '45%'}}
                        inputProps={{style: {color: '#004a0f', fontWeight: 'bold', textAlign: 'center', fontSize: 'large'}}}
                        InputProps={{readOnly: true}}
                        />
                </Box>
                <Box sx={{display: 'flex', flexWrap: 'flex', justifyContent: 'space-evenly', marginTop: '3%'}}>
                    <TextField 
                        id="CostG_SSold"
                        variant='outlined'
                        label='Cost Goods & Services Sold'
                        color='success' 
                        defaultValue={Monify(incomeData.costofGoodsAndServicesSold)}
                        sx={{width: '45%'}}
                        inputProps={{style: {color: '#004a0f', fontWeight: 'bold', textAlign: 'center', fontSize: 'large'}}}
                        InputProps={{readOnly: true}}
                        />
                        <TextField 
                        id="Depreciation"
                        variant='outlined'
                        label='Depreciation'
                        color='success' 
                        defaultValue={Monify(incomeData.depreciation)}
                        sx={{width: '45%'}}
                        inputProps={{style: {color: '#004a0f', fontWeight: 'bold', textAlign: 'center', fontSize: 'large'}}}
                        InputProps={{readOnly: true}}
                        />
                </Box>
                <Box sx={{display: 'flex', flexWrap: 'flex', justifyContent: 'space-evenly', marginTop: '3%'}}>
                    <TextField 
                        id="interstAndDept"
                        variant='outlined'
                        label='Interest & Debt Expense'
                        color='success' 
                        defaultValue={Monify(incomeData.interestAndDebtExpense)}
                        sx={{width: '45%'}}
                        inputProps={{style: {color: '#004a0f', fontWeight: 'bold', textAlign: 'center', fontSize: 'large'}}}
                        InputProps={{readOnly: true}}
                        />
                        <TextField 
                        id="IncomeBeforeTax"
                        variant='outlined'
                        label='Income Before Tax'
                        color='success' 
                        defaultValue={Monify(incomeData.incomeBeforeTax)}
                        sx={{width: '45%'}}
                        inputProps={{style: {color: '#004a0f', fontWeight: 'bold', textAlign: 'center', fontSize: 'large'}}}
                        InputProps={{readOnly: true}}
                        />
                </Box>
            </Box>
        </>
        :
        <h4>Loading...</h4>
);
}