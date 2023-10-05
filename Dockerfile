FROM node:16.16.0-alpine as build

# Configure the main working directory inside the Docker image.
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT commands.
WORKDIR /app

# Copy the package.json as well as the package-lock.json and install
# the dependencies. This is a separate step so the dependencies
# will be cached unless changes to one of those two files are made.
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the main application
COPY . ./

# Set the NODE_OPTIONS environment variable to increase the memory limit
ENV NODE_OPTIONS=--max-old-space-size=4096

# Build the application
RUN npm run build

# Stage 2: Serve the React application from Nginx
FROM nginx:1.17.0-alpine

# Copy the React build from Stage 1
COPY --from=build /app/build /usr/share/nginx/html

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Add the following lines to copy the necessary files for react-toastify
COPY ./ReactToastify.css /usr/share/nginx/html/static/css/
#COPY ./node_modules/react-toastify/dist/ReactToastify.min.js /usr/share/nginx/html/static/js/

# Expose port 80 to the Docker host, so we can access it from the outside.
EXPOSE 89

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
