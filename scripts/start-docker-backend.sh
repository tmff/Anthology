
echo "Stopping any existing processes..."
docker compose -f ../docker/app.yml down || true

echo "Nuking the nginx volumes..."
docker volume prune -f

echo "Building the backend image..."
docker build --no-cache -t teamproject:backend ../backend/ 

echo "Running the composer..."
docker compose -f ../docker/app.yml up -d teamproject-app
