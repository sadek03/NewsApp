import { newsApiKey } from "./Apikey";

const ApiEndpoint = "https://newsapi.org/v2";

const breakingNewsURL = `${ApiEndpoint}/top-headlines/sources?country=us&apikey=${newsApiKey}`;
const recommendedNewsUrl = `${ApiEndpoint}/top-headlines/sources?country=us&category=business&apikey=${newsApiKey}`;
const discoverNewsUrl = (discover) =>
  `${ApiEndpoint}/top-headlines/sources?country=us&category=${discover}&apikey=${newsApiKey}`;
const searchNewsUrl = (query) =>
  `${ApiEndpoint}/everything?q=${query}&apikey=${newsApiKey}`;

const newsApiCall = async (endpoint, params = {}) => {
  const url = new URL(endpoint);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("API call error:", error);
    return {};
  }
};

export const fetchBreakingNewsURL = async () => {
  return await newsApiCall(breakingNewsURL);
};

export const fetchDiscoverNewsUrl = async (discover) => {
  return await newsApiCall(discoverNewsUrl(discover));
};

export const fetchRecommendedNewsUrl = async () => {
  return await newsApiCall(recommendedNewsUrl);
};

export const fetchSearchNewsUrl = async (query) => {
  return await newsApiCall(searchNewsUrl(query));
};
