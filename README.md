![CHAIN HEADER ](https://user-images.githubusercontent.com/48491140/204155837-7a3c6d6f-2fff-4cef-87e6-bec188f31ec5.png)

# Dont-break-the-chain

The productivity method commits you to completing a daily goal for an extended period of time. Each day that you complete your daily goal, you add an “x” to a calendar. Eventually, you build a chain of x’s that extends days, weeks, or months. This streak of accomplishments is increasingly rewarding and dissuades you from breaking the chain. Eventually you’re able to build a long-term habit like daily journaling or morning stretching.

“Just keep at it and the chain will grow longer every day. You’ll like seeing that chain, especially when you get a few weeks under your belt. Your only job is to not break the chain.”


## Install & compose
```
git clone git@github.com:MaurerKrisztian/dont-break-the-chain.git
cd dont-break-the-chain
sudo docker-compose --file ./docker-compose.build.yml up
```
or run the latest release
```
sudo docker-compose --file ./docker-compose.latest.yml up
```

- UI will be available on http://localhost:4200/, api: http://localhost:3000/

### Api start
```
cd api
npm install
npm start
```
- open: http://localhost:3000/

### UI start

```
cd ui
npm install
npm start
```
- open: http://localhost:4200/

## Images

#### UI
```
docker pull ghcr.io/maurerkrisztian/dont-break-the-chain-ui:latest
```
#### API
```
docker pull ghcr.io/maurerkrisztian/dont-break-the-chain-api:latest
```
