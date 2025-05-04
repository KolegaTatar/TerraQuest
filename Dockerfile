# Użyj oficjalnego obrazu Node.js
FROM node:18 AS backend

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plików package.json i package-lock.json
COPY package*.json ./

# Instalowanie wszystkich zależności w katalogu lokalnym
RUN npm install --legacy-peer-deps

# Instalowanie TypeScript
RUN npm install typescript --save-dev

# Kopiowanie pozostałych plików źródłowych do kontenera
COPY . .

# Sprawdzenie wersji npm (można usunąć, jeśli nie jest to konieczne)
RUN npm --version

# Sprawdzenie, czy vite jest dostępne (pomaga wykryć brakujące zależności)
RUN npx vite --version

# Uruchomienie kompilacji TypeScript
RUN npx tsc --noEmit

# Uruchomienie kompilacji TypeScript
RUN npm run build

# Ustawienie portu 5000 (zdefiniowanego w backendzie)
EXPOSE 5000

# Uruchomienie aplikacji
CMD ["npm", "start"]
