FROM node:18

# 1. Instalacja zależności
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./

# Naprawa problemów z zależnościami
RUN npm install -g npm@8.19.4 && \
    npm install --omit=dev --legacy-peer-deps && \
    npm install typescript@5.8.3 --save-dev

# 2. Kopiowanie kodu
COPY . .

# 3. Kompilacja TypeScript
RUN npx tsc --project backend/tsconfig.json

# 4. Uruchomienie
EXPOSE 5000
CMD ["node", "backend/dist/main.js"]