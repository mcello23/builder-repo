import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { sleep } from 'k6';
import http from 'k6/http';

export function handleSummary(data) {
  return {
    'results/report.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

export const options = {
  vus: 10,
  duration: '5s',
};

export default function () {
  http.get('https://dekra.landing.identity-platform.dev/');
  sleep(1);
}
