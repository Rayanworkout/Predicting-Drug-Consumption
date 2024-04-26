# Folder for CI/CD related files

Continuous Integration is made through github actions. The pipeline is defined in `.github/workflows/django.yml` file.

Each time a commit or a merge is made to the `main` branch, all the unit tests are run in the backend. The test coverage is 92%. If the tests pass, the code is deployed to the production server.


On production server (Linux VPS), a Flask server listens for github webhooks. When a push event is received, the server pulls the latest changes from the repository and rebuilds the whole project.

Both backend and frontend are served with Apache2.