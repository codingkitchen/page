# Coding Kitchen Website
Web presence for bookings and subscriptions

## Docker

Deploy and start Redis:

```
sh opt/deploy-redis.sh
```

Build the backend:

```
docker build --rm -t kordano/codingkitchen .
```

Run it:

```
sh opt/deploy.sh
```

Visit the [page](http://localhost:8080)
