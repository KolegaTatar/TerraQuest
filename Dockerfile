# Użyj oficjalnego obrazu Node.js
FROM node:18 AS backend

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app/backend

# Kopiowanie pliku package.json z katalogu backend
COPY backend/package.json ./ 

# Kopiowanie pliku package-lock.json z głównego katalogu projektu
COPY package-lock.json ./

# Aktualizacja npm do najnowszej wersji (np. 11.3.0)
RUN npm install -g npm@11.3.0

# Instalowanie wszystkich zależności
RUN npm install --legacy-peer-deps

# Kopiowanie pozostałych plików źródłowych z katalogu backend do kontenera
COPY backend ./

# Instalowanie TypeScript, jeśli nie jest zainstalowany
RUN npm install typescript --save-dev

# Sprawdzamy kompilację TypeScript przed uruchomieniem
RUN npx tsc --noEmit

# Uruchomienie kompilacji TypeScript
RUN npm run build

# Ustawienie portu 5000 (zdefiniowanego w backendzie)
EXPOSE 5000

# Uruchomienie aplikacji
CMD ["npm", "start"]
