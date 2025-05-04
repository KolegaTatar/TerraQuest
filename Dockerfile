FROM node:18

# 1. Instalacja zależności
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install --include=dev

# 2. Kopiowanie kodu
COPY . .

# 3. Kompilacja TypeScript
WORKDIR /app/backend
RUN npm run build

# 4. Uruchomienie
EXPOSE 5000
CMD ["node", "dist/main.js"]