FROM node:18

# 1. Praca w katalogu backendu
WORKDIR /app/backend

# 2. Kopiowanie tylko plików potrzebnych do instalacji
COPY backend/package.json backend/package-lock.json ./

# 3. Instalacja zależności
RUN npm install -g npm@8.19.4 && \
    npm install --include=dev --legacy-peer-deps

# 4. Kopiowanie reszty kodu
COPY . .

# 5. Kompilacja TypeScript z jawnymi flagami
RUN npx tsc --project backend/tsconfig.json \
    --esModuleInterop true \
    --skipLibCheck true \
    --strict true \
    --outDir ./dist

# 6. Kopiowanie dodatkowych folderów
RUN cp -r backend/src/other backend/dist/other && \
    cp -r backend/src/routes backend/dist/routes

# 7. Uruchomienie aplikacji
EXPOSE 5000
CMD ["node", "backend/dist/main.js"]