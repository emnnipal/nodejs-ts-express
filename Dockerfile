FROM node:14

ENV NODE_VERSION 16.15.0
ENV HOME /app
ENV PORT 8080

# install pnpm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

RUN mkdir -p ${HOME}

WORKDIR ${HOME}

# copy package.json and install first to prevent reinstalling of dependencies
# when there are changes in files from src directory
COPY package.json pnpm-lock.yaml ${HOME}
RUN pnpm fetch --prod
RUN pnpm install --frozen-lockfile --ignore-scripts --prod
RUN pnpm add esbuild esbuild-node-tsc

COPY tsconfig.json ${HOME}
COPY etsc.config.js ${HOME}
COPY .env ${HOME}
COPY src ${HOME}/src

RUN pnpm build

EXPOSE 8080

CMD ["pnpm", "start"]