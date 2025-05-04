# Etap budowania
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev  # instaluje devDependencies (TypeScript)
COPY . .
RUN npm run build  # wykonuje tsc

# Etap finalny
FROM node:18
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["npm", "start"]