# Użyj oficjalnego obrazu Node.js
FROM node:18 AS backend

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app/backend

# Kopiowanie pliku package.json z katalogu backend
COPY backend/package.json ./ 

# Kopiowanie pliku package-lock.json z głównego katalogu projektu
COPY package-lock.json ./

# Instalowanie wszystkich zależności, w tym npm i devDependencies
RUN npm install --legacy-peer-deps

# Instalowanie TypeScript w projekcie, jeżeli nie jest jeszcze zainstalowany
RUN npm install typescript --save-dev

# Kopiowanie pozostałych plików źródłowych z katalogu backend do kontenera
COPY backend ./

# Sprawdzamy kompilację TypeScript przed uruchomieniem
RUN npx tsc --noEmit

# Uruchomienie kompilacji TypeScript
RUN npm run build

# Ustawienie portu 5000 (zdefiniowanego w backendzie)
EXPOSE 5000

# Uruchomienie aplikacji
CMD ["npm", "start"]
