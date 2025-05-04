# Użyj oficjalnego obrazu Node.js jako bazowego obrazu
FROM node:18 AS backend

WORKDIR /app/backend

# Instalacja zależności
COPY backend/package*.json ./
RUN npm install

# Kopiowanie kodu aplikacji
COPY backend/ .

# Ustawienie portu na 5000 (jeśli aplikacja działa na tym porcie)
EXPOSE 5000

# Uruchomienie aplikacji
CMD ["npm", "start"]
