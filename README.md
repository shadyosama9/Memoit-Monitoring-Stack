<div align="center">
  <br />
      <img src="https://memoit-images.s3.us-east-1.amazonaws.com/blog-prometheus%2Bgrafana.png" alt="Prometheus + Grafana">
  <br />

  <h3 align="center">Monitoring Heros</h3>
</div>

<br>

## 📑 <a name="table">Table of Contents</a>

1. 🤖 [Overview](#overview)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🐳 [Docker](#docker)
4. 🌐 [Nginx](#nginx)
5. 📈 [Prometheus](#prometheus)
6. 📊 [Grafana](#grafana)

<br>

## <a name="overview">📊 Overview</a>

This project sets up a comprehensive monitoring stack for the [Memoit web application](https://github.com/jasonqiu212/memoit), originally created by [Jason Qiu](https://github.com/jasonqiu212). Using Prometheus, Grafana, and Docker, the stack monitors the application’s health, performance, and availability. It includes Node Exporter and Blackbox Exporter for system and endpoint metrics, and Alertmanager for sending notifications via Gmail. The entire setup is containerized with Docker Compose, making it easy to deploy and manage.

<div align="center">
  <br />
      <img src="https://memoit-images.s3.us-east-1.amazonaws.com/Monitoring+Stack.gif" alt="Monitoring Diagram">
  <br />
</div>

<br>

## <a name="tech-stack">⚙️ Tech Stack</a>

- AWS
- Docker
- Docker Copmpose
- Nginx
- Prometheus
- Grafana


## <a name="docker">🐳 Docker</a>

To set up and run the application using Docker and Docker Compose, follow these instructions.

## Prerequisites

- [Install Docker](https://docs.docker.com/engine/install/): Follow the official Docker documentation to install Docker on your system.

## Steps to Run the Application

1. **Create the `.env` file**  
   Create a file named `.env` in the root directory of your project, and add the following environment variables:

   ```plaintext
   REACT_APP_API_URL=
   MEMOIT_DATABASE_PASSWORD="admin"
   MEMOIT_DATABASE_USER="postgres"
   MEMOIT_DATABASE_HOST="memoit-app-db"  
- **Set `REACT_APP_API_URL`** with the appropriate API endpoint.
- The following variables are pre-configured for database connection:
  - `MEMOIT_DATABASE_PASSWORD`
  - `MEMOIT_DATABASE_USER`
  - `MEMOIT_DATABASE_HOST`

2. **Docker Compose Configuratio**

    If you are **not** using a proxy or reverse proxy server, uncomment the `ports` section in the `docker-compose.yml` file to expose ports directly.

3. **Build and Run the Containers**

    To build and run the application, execute the following command:

```bash
docker compose up --build

