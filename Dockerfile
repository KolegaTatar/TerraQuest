# Użyj oficjalnego obrazu Node.js
FROM node:18 AS backend

# Ustawienie katalogu roboczego
WORKDIR /app/backend

# Kopiowanie pliku package.json z katalogu backend
COPY backend/package.json ./

# Kopiowanie pliku package-lock.json z głównego katalogu projektu
COPY package-lock.json ./

# Zainstalowanie wszystkich zależności, w tym devDependencies
RUN npm install --legacy-peer-deps

# Instalacja TypeScript (upewniamy się, że jest dostępny)
RUN npm install typescript --save-dev

# Kopiowanie pozostałych plików źródłowych z katalogu backend
COPY backend ./

# Sprawdzamy kompilację TypeScript przed uruchomieniem
RUN npx tsc --noEmit

# Uruchomienie kompilacji TypeScript
RUN npm run build

# Ustawienie portu 5000 (zdefiniowanego w backendzie)
EXPOSE 5000

# Uruchomienie aplikacji
CMD ["npm", "start"]
