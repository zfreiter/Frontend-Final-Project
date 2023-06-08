import * as dotenv from 'dotenv';
dotenv.config();

export const getStories = async (req, res) => {
  const url = process.env.GSM_STOCK_NEWS;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST_GLOBAL,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: err.message });
  }
};

export const getInformation = async (req, res) => {
  const parems = {
    symbol: req.query.parems,
  };
  const url = process.env.MBOUM_FIANCE_QUOTE + new URLSearchParams(parems);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST_MBOUM,
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: err.message });
  }
};

export const getPrice = async (req, res) => {
  const find = req.query.find;
  const url = `${process.env.REALSTONK_QUOTE}${find}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST_REAL,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: err.message });
  }
};
