FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies needed for build)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies and @nestjs/cli to reduce image size
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "run", "start:prod"] 