import axios from 'axios';

/**
 * With ngrok's free tier, baseURL changes after every session
 */
export default axios.create({
  baseURL: 'http://69fd-2601-4a-c200-d710-cc59-cb6-8fda-34f6.ngrok.io',
});
