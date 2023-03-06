
echo "Stopping any existing processes..."
docker compose -f ../docker/app.yml down || true

echo "Nuking the nginx volumes..."
docker volume prune -f