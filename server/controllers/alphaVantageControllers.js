import * as dotenv from 'dotenv';
dotenv.config();

export const GetOverviewData = async (req, res) => {
    const ticker = req.query.ticker;
    const key = process.env.AV_KEY_P1;
    let url = process.env.AV_OVERVIEW_URL;

    url = url.replace('${TICKER}', ticker).replace('${KEY}', key);

    const options ={
        headers: {
            'User-Agent': 'request'
        },
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        res.status(200).send(result);
    }
    catch(exc) {
        res.status(500).json({ message: exc.message });
    }
}

export const GetTimeSeriesData = async (req, res) => {
    const ticker = req.query.ticker;
    const key = process.env.AV_KEY_P1;
    let url = process.env.AV_TIMESERIES_URL;

    url = url.replace('${TICKER}', ticker).replace('${KEY}', key);

    const options ={
        headers: {
            'User-Agent': 'request'
        },
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        res.status(200).send(result);
    }
    catch(exc) {
        res.status(500).json({ message: exc.message });
    }
}

export const GetIncomeStatementData = async (req, res) => {
    const ticker = req.query.ticker;
    const key = process.env.AV_KEY_P1;
    let url = process.env.AV_INCOMESTATEMENT_URL;

    url = url.replace('${TICKER}', ticker).replace('${KEY}', key);

    const options ={
        headers: {
            'User-Agent': 'request'
        },
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        res.status(200).send(result);
    }
    catch(exc) {
        res.status(500).json({ message: exc.message });
    }
}