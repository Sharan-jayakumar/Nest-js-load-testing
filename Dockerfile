FROM node:20-alpine

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

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

# Copy PM2 configuration
COPY ecosystem.config.cjs ./

# Create logs directory
RUN mkdir -p /logs /.pm2 

EXPOSE 3000

# Use PM2 to start the application
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]