from locust import HttpUser, task

class LoadTest(HttpUser):
    @task
    def home_and_stats(self):
        self.client.get("/")
        self.client.get("/statistics")