// mui, react, router
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box' 
import TextField from '@mui/material/TextField' 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import {useSearchParams, redirect} from 'react-router-dom';


// icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import BalanceIcon from '@mui/icons-material/Balance';

// Components
import StockChart from '../components/Chart';

const LabelProperties = {
  style: {fontWeight: 'bolder', fontSize: 'large'}
}

const InputAttributes = {
  readOnly:true,
  disableUnderline: true
}

const InputStyles = {
  style:{
    textAlign: 'center'
  }
}

const IconStyleLight = {
  marginRight: '5px',
  color: 'floralwhite',
  backgroundColor: 'rgb(0, 74, 15)',
  borderRadius: '10px'
}

const AnalyticBoxStyle = {
  display: 'inline-flex',
  marginTop: '20px'
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Stock() {

  const [displayRangeDays, setDisplayRangeDays] = useState(15);
  const [value, setValue] = useState(0);
  const [timeSeries, setTimeSeries] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const ticker = searchParams.get('id');
  const overviewAPIURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=demo}`;

  if (ticker === null) {
    return (
    <Box sx={{margin: '5%', textAlign:'center'}}>
      <Typography variant='h4' sx={{color: 'darkred'}}>Error: Stock Symbol Not Found.</Typography>
    </Box>
  )}

  useEffect(() => {
    fetch(overviewAPIURL)
    .then(response => {return response.json()})
    .then(data => {
      setTimeSeries(data);
    });
  },[]);


  const Monify = (toMonify) => {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(toMonify);
  }

  const ToInitialCase = (srcString) => {
    return srcString.toLowerCase().split(' ').map((word) => word = `${word[0].toUpperCase()}${word.slice(1, word.length)}`).join(' ');
  }  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const SetRangeTen = () => {
    setDisplayRangeDays(10);
  }

  const SetRangeMonth = () => {
    console.log('30 day view');
    setDisplayRangeDays(30);
  }
  return (<>
    {timeSeries ?
     <><Box sx={{ margin: '3%', borderStyle: 'solid' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Company Overview" {...a11yProps(0)} />
            <Tab label="Latest Analytical" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} sx={{ height: 'fit-content' }}>
          <Box sx={{ height: '100%' }}>
            <Box sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              <TextField
                id="CompanyName"
                sx={{ width: '100%', marginBottom: '20px' }}

                label="Company Name"
                defaultValue={`${timeSeries.Name} (${timeSeries.Symbol})`}
                variant="standard"
                inputProps={{ readOnly: true, style: { textAlign: 'center', fontSize: 'xx-large', color: 'rgb(0, 74, 15)' } }} />
            </Box>
            <Box sx={{ display: 'inline-flex', width: '100%', marginBottom: '20px' }}>
              <TextField
                id="Industry"
                label="Industry"
                defaultValue={ToInitialCase(timeSeries.Industry)}
                variant="standard"
                sx={{ margin: '5px', width: '33%' }}
                InputProps={{ readOnly: true }} />
              <TextField
                id="Sector"
                label="Sector"
                defaultValue={ToInitialCase(timeSeries.Sector)}
                variant="standard"
                sx={{ margin: '5px', width: '33%' }}
                InputProps={{ readOnly: true }} />
              <TextField
                id="Type"
                label="Type"
                defaultValue={ToInitialCase(timeSeries.AssetType.toUpperCase())}
                variant="standard"
                sx={{ margin: '5px', width: '33%' }}
                InputProps={{ readOnly: true }} />
            </Box>
            <Box>
              <Typography
                variant="body1"
                component="span"
              >{timeSeries.Description}
              </Typography>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ height: '100%' }}>
            <Box sx={{ alignItems: 'center' }}>
              <TextField
                id="CompanyName"
                sx={{ width: '100%', marginBottom: '20px' }}
                label=""
                defaultValue={`${timeSeries.Name} (${timeSeries.Symbol})`}
                variant="standard"
                inputProps={{ readOnly: true, style: { textAlign: 'center', fontSize: 'xx-large', color: 'rgb(0, 74, 15)' } }}
                InputProps={InputAttributes}
                InputLabelProps={LabelProperties} />
            </Box>
            <Box sx={{ display: 'inline-flex', width: '100%', marginBottom: '20px' }}>
              <TextField
                id="Industry"
                label="Industry"
                defaultValue={ToInitialCase(timeSeries.Industry)}
                variant="standard"
                sx={{ margin: '5px', width: '33%' }}
                InputProps={{ readOnly: true }}
                InputLabelProps={LabelProperties} />
              <TextField
                id="Sector"
                label="Sector"
                defaultValue={ToInitialCase(timeSeries.Sector)}
                variant="standard"
                sx={{ margin: '5px', width: '33%' }}
                InputProps={{ readOnly: true }}
                InputLabelProps={LabelProperties} />
              <TextField
                id="Type"
                label="Type"
                defaultValue={ToInitialCase(timeSeries.AssetType)}
                variant="standard"
                sx={{ margin: '5px', width: '33%' }}
                InputProps={{ readOnly: true }}
                InputLabelProps={LabelProperties} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: '20px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%', alignItems: 'flex-end' }}>
                <Box sx={AnalyticBoxStyle}>
                  <TrendingUpIcon sx={IconStyleLight} />
                  <TextField
                    id="fiveTwoWeekHigh"
                    label="52 Week High"
                    defaultValue={Monify(timeSeries['52WeekHigh'])}
                    variant="standard"
                    sx={{ width: '100%' }}
                    inputProps={InputStyles}
                    InputProps={InputAttributes}
                    InputLabelProps={LabelProperties} />
                </Box>
                <Box sx={AnalyticBoxStyle}>
                  <AttachMoneyIcon sx={IconStyleLight} />
                  <TextField
                    id="LatestDividend"
                    label="Last Per-Share Dividend"
                    defaultValue={Monify(timeSeries.DividendPerShare)}
                    variant="standard"
                    sx={{ width: '100%' }}
                    inputProps={InputStyles}
                    InputProps={InputAttributes}
                    InputLabelProps={LabelProperties} />
                </Box>
                <Box sx={AnalyticBoxStyle}>
                  <PercentIcon sx={IconStyleLight} />
                  <TextField
                    id="PERatio"
                    label="PE Ratio"
                    defaultValue={timeSeries.PERatio}
                    variant="standard"
                    sx={{ width: '100%' }}
                    inputProps={InputStyles}
                    InputProps={InputAttributes}
                    InputLabelProps={LabelProperties} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%', alignItems: 'center' }}>
                <Box sx={AnalyticBoxStyle}>
                  <TrendingDownIcon sx={IconStyleLight} />
                  <TextField
                    id="fivetwoWeekLow"
                    label="50 Week Low"
                    defaultValue={Monify(timeSeries['52WeekLow'])}
                    variant="standard"
                    sx={{ width: '100%' }}
                    inputProps={InputStyles}
                    InputProps={InputAttributes}
                    InputLabelProps={LabelProperties} />
                </Box>
                <Box sx={AnalyticBoxStyle}>
                  <CurrencyExchangeIcon sx={IconStyleLight} />
                  <TextField
                    id="DividendYield"
                    label="Dividend Yield"
                    defaultValue={timeSeries.DividendYield}
                    variant="standard"
                    sx={{ width: '100%' }}
                    inputProps={InputStyles}
                    InputProps={InputAttributes}
                    InputLabelProps={LabelProperties} />
                </Box>
                <Box sx={AnalyticBoxStyle}>
                  <PriceChangeIcon sx={IconStyleLight} />
                  <TextField
                    id="ProfitMargin"
                    label="Profit Margin"
                    defaultValue={timeSeries.ProfitMargin}
                    variant="standard"
                    sx={{ width: '100%' }}
                    inputProps={InputStyles}
                    InputProps={InputAttributes}
                    InputLabelProps={LabelProperties} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%', alignItems: 'flex-start' }}>
                <Box sx={AnalyticBoxStyle}>
                  <CompareArrowsIcon sx={IconStyleLight} />
                  <TextField
                    id="MovingAVG"
                    label="50 Day Moving Average"
                    defaultValue={Monify(timeSeries['50DayMovingAverage'])}
                    variant="standard"
                    sx={{ width: '100%' }}
                    inputProps={InputStyles}
                    InputProps={InputAttributes}
                    InputLabelProps={LabelProperties} />
                </Box>
                <Box sx={AnalyticBoxStyle}>
                  <KeyboardReturnIcon sx={IconStyleLight} />
                  <TextField
                    id="ReturnAsset"
                    label="Return on Assets TTM*"
                    defaultValue={timeSeries.ReturnOnAssetsTTM}
                    variant="standard"
                    sx={{ width: '100%' }}
                    inputProps={InputStyles}
                    InputProps={InputAttributes}
                    InputLabelProps={LabelProperties} />
                </Box>
                <Box sx={AnalyticBoxStyle}>
                  <BalanceIcon sx={IconStyleLight} />
                  <TextField
                    id="ReturnEquity"
                    label="Return on Equity TTM*"
                    defaultValue={timeSeries.ReturnOnEquityTTM}
                    variant="standard"
                    sx={{ width: '100%' }}
                    inputProps={InputStyles}
                    InputProps={InputAttributes}
                    InputLabelProps={LabelProperties} />
                </Box>
              </Box>
            </Box>
            <Typography variant='caption' dislay='block' sx={{ margin: '10px', fontStyle: 'italic' }}>
              *TTM - Trailing Twelve Months, PE - Price per Earnings.
            </Typography>
          </Box>
        </TabPanel>
      </Box><Box sx={{ margin: '3%' }}>
          <Box sx={{ width: '100%', height: '100%', display: 'inline-flex' }}>
            <Typography sx={{ paddingTop: '25%', textAlign: 'center' }} variant='h6'>Price (USD)</Typography>
            <StockChart name={timeSeries.Name} symbol={timeSeries.Symbol} range={displayRangeDays} />
          </Box>
          <Typography variant='h6' sx={{ marginLeft: '50%' }}>Date</Typography>
        </Box></>
    :
    <h1>Loading...</h1>
    }
  </>);

}