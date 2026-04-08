# Stage 1: Build
FROM node:20 AS build

WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./

# Use CI install (fast + reliable)
RUN npm ci --legacy-peer-deps

# Copy rest of code
COPY . .

# Build app
RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]