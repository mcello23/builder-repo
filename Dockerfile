FROM node:20.17.0

RUN apt-get update && apt-get install -y \
    xvfb \
    libgtk2.0-0 \
    libgtk-3-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    x11-apps \
    libgbm-dev \
    wget \
    gnupg

RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable

ENV PROJECT_NAME="builder-cypress-e2e-tests"

WORKDIR /app

COPY package.json yarn.lock ./
COPY cypress.config.js ./
COPY cypress/ ./cypress/

RUN yarn install
RUN yarn add cypress

CMD ["yarn", "cypress", "run", "--browser", "chrome", "--headed"]