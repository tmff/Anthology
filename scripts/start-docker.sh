
echo "Stopping any existing processes..."
docker compose -f ../docker/app.yml down || true

echo "Nuking the nginx volumes..."
docker volume prune -f

echo "Building the backend image..."
docker build --no-cache -t teamproject:backend ../backend/ 

echo "Building the frontend image..."
docker build --no-cache -t teamproject:frontend --build-arg api_endpoint=http://localhost/api ../poemfrontend

echo "Running the composer..."
docker compose -f ../docker/app.yml up -d
