# Kuzco Inference Client

This repo is a sample open source client for submitting inference requesting to the [Kuzco Network](https://kuzco.xyz/). 

The app is running at [https://kuzco-inference-client.vercel.app](https://kuzco-inference-client.vercel.app).

## API Key Security

An API key is required to submit inference queries, which costs **\$KZO** points. The API key is not saved and only forwarded to the network. You can [view that code here](https://github.com/bonham000/kuzco-inference-client/blob/main/src/backend/inferenceApi.ts#L50) to verify this. **$KZO** points can be earned by contributing GPU capacity to the Kuzco network.

## Client Preview

<img width="1734" alt="Kuzco Inference Client UI" src="https://github.com/bonham000/kuzco-inference-client/assets/18126719/c99c5982-fcbe-4d81-8902-5df4f5f6268c">

## Development

If you want to run the app locally you can follow these steps:

1. Install NodeJS `18.17` or higher ([documentation](https://nextjs.org/docs/getting-started/installation)).
2. Install the [Yarn package manager](https://yarnpkg.com/).
3. Clone the repo to your computer.
4. Run `yarn` to install dependencies.
5. Run the development server with `yarn dev`.
