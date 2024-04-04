# Folder for CI/CD related files

Continuous Integration is made through github actions. The pipeline is defined in `.github/workflows/django.yml` file.

Each time a commit or a merge is made to the `main` branch, all the unit tests are run. If the tests pass, the code is deployed to the production server.


On production server, a Flask server listens for github webhooks. When a push event is received, the server pulls the latest changes from the repository and restarts the Django server
as well as the frontend server.