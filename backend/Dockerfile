FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev  # instaluje devDependencies (TypeScript)
COPY . .
RUN npm run build  # kompiluje TS → JS

EXPOSE 3000
CMD ["npm", "start"]