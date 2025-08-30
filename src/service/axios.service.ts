import axios from 'axios';

const URL = 'https://65ac6284adbd5aa31bdf3714.mockapi.io/api/stockproducts';

export const createintance = axios.create({
    baseURL: URL
});