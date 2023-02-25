
echo "Building the backend image..."
docker build -t teamproject_backend ../backend/

echo "Building the frontend image..."
docker build -t teamproject_frontend ../poemfrontend

echo "Running the composer..."
docker compose -f ../docker/app.yml up