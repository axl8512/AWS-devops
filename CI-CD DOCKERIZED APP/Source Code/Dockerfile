# Step 1: Use Nginx official image
FROM nginx:alpine

# Step 2: Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Step 3: Copy your frontend files into Nginx folder
COPY . /usr/share/nginx/html/

# Step 4: Expose port 80
EXPOSE 80

# Step 5: Start Nginx
CMD ["nginx", "-g", "daemon off;"]

