# [npm Picker](https://npmpicker.vercel.app/)

This project recommends npm packages. It is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[![npm Picker](./public/screenshot.png)](https://npmpicker.vercel.app/)

## Tech Stack

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [OpenAI GPT-3 API](https://platform.openai.com/overview)

## Features

- Recommend npm packages based on your requirements and framework
- Show details of the recommended packages

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sadmann7/npm-picker
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Create a `.env` file

Create a `.env` file in the root directory and add the environment variables as shown in the `.env.example` file. You can get the OpenAI API key from [here](https://beta.openai.com/account/api-keys).

### 4. Run the application

```bash
yarn run dev
```

The application will be available at `http://localhost:3000`.

## Deployment

Follow the deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
