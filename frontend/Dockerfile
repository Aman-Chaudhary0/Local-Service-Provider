#  base image
FROM node:20-bookworm

# our working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

#clear past dependencies and install all new dependencies
RUN npm ci

# copy rest of our app into the container
COPY . .

# expose port that we are use in our PC
EXPOSE 5173

# Run the app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]


