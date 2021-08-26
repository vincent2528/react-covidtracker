import axios from "axios";

/*
  API for Covid-19 stats.Shows data uptil March 2021 for all countries.
*/
const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  /*
  Fetch and returns no.of active cases,recovered cases and deaths for a given country. By default USA is selected.
  */
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

export const fetchDailyData = async () => {
  /*
  Fetch and returns no.of cases,recovered cases and deaths by daytime.
  */
  try {
    const { data } = await axios.get(`${url}/daily`);

    return data.map(({ confirmed, deaths, reportDate: date }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      date,
    }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  /*
  Returns list of all the countries whose data is recorded in API.
  */
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    console.log(countries);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
