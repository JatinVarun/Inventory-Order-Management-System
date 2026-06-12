# Stage 1: Build the React application using Node
FROM node:22-alpine AS build
WORKDIR /app

# Copy the package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all the frontend code and build it for production
COPY . .
RUN npm run build

# Stage 2: Serve the built application using Nginx
FROM nginx:alpine
# Copy the built files from Stage 1 into the Nginx server folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (default HTTP port)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
