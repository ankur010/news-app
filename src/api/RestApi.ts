import axios from 'axios';



export const getNews = async (page: number, size: number, text: string = "") =>
  await axios.get(`https://newsapi.org/v2/everything?q=${text}&apiKey=6879ae5842474b1fbbd8a308d69ba905&pageSize=${size}&page=${page}`);

