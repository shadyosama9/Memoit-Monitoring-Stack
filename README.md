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

---

## <a name="overview">🤖 Overview</a>

This project sets up a comprehensive monitoring stack for the [Memoit web application](https://github.com/jasonqiu212/memoit), originally created by [Jason Qiu](https://github.com/jasonqiu212). Using Prometheus, Grafana, and Docker, the stack monitors the application’s health, performance, and availability. It includes Node Exporter and Blackbox Exporter for system and endpoint metrics, and Alertmanager for sending notifications via Gmail. The entire setup is containerized with Docker Compose, making it easy to deploy and manage.

<div align="center">
  <br />
      <img src="https://memoit-images.s3.us-east-1.amazonaws.com/Monitoring+Stack.gif" alt="Monitoring Diagram">
  <br />
</div>

<br>

---

## <a name="tech-stack">⚙️ Tech Stack</a>

- AWS
- Docker
- Docker Copmpose
- Nginx
- Prometheus
- Grafana

<br>

---

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
    ```

<br>

---

## <a name="nginx">🌐 Nginx</a>


To set up NGINX as the proxy server for the application, follow these instructions.

## Steps to Configure NGINX

1. **Install NGINX**

   Run the following command to install NGINX:

   ```bash
   apt install nginx -y
   ```
2. **Configure NGINX Default Site**

    To change NGINX default site, replace the content in `/etc/nginx/sites-available/default` with the following configuration:

    ```nginx
    server {
        listen 80 default_server;
        return 444;
    }

    server {
        listen 80;
        server_name <Enter your server name>;

        location / {
            proxy_pass http://<memoit app docker container IP>:3000;
        }
    }
    ```
    - The first `server` block listens on port 80 and immediately drops unwanted connections.

    - The second `server` block listens on port 80 and proxies requests to your application:
      - Replace `<Enter your server name>` with the domain or IP address of your server.
      - Replace `<memoit app docker container IP>` with the IP address of the Docker container running the application on port 3000.

3. **Restart NGINX**

    After configuring, restart NGINX to apply the changes:

    ```bash
    sudo systemctl restart nginx
    ```

<br>

---

## <a name="prometheus">📈 Prometehus</a>

**Note:** All the `.yml` configuration files for Prometheus are located in the prometheus directory.

# Monitoring with Prometheus

To set up Prometheus for monitoring and configure it to run as a background service, follow these instructions.

## Install Prometheus

1. **Download and Install Prometheus**  
   [Download Prometheus](https://prometheus.io/download/) and follow the instructions for installation.

2. **Locate the Configuration File**  
   After installation, you will find a `prometheus.yml` file, which contains the default settings for Prometheus.

## Running Prometheus as a Systemd Service

To run Prometheus in the background, create a systemd service for it by following these steps:

1. **Create the Service File**  
   Create a new file named `prometheus.service` in the `/etc/systemd/system` directory:

2. **Add the following configuration to the `prometheus.service` file.**

  ```ini
  [Unit]
  Description=Prometheus Server
  Documentation=https://prometheus.io/docs/introduction/overview/
  After=network-online.target

  [Service]
  User=root
  Restart=on-failure
  ExecStart=<your prometheus installation directory>/prometheus --config.file=<your prometheus installation directory>/prometheus.yml

  [Install]
  WantedBy=multi-user.target
  ```

- Replace `<your prometheus installation directory>` with the actual path where Prometheus is installed.

3. **Reload Systemd and Start the Service**

    After creating the service file, run the following commands to reload systemd and start Prometheus:

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl start prometheus.service
    sudo systemctl enable prometheus.service
    ```

You can now access Prometheus at `<Your server IP>:9090`.

Prometheus will now start as a background service and will automatically launch on system startup.

## Prometheus Agents

**Note:** All the agents can be run as a systemd service like prometheus

<br>

1. **Node Exporter**

- Install Node Exporter

  Download and install [Node Exporter](https://prometheus.io/download/) on the web application server to monitor system health.

- Configure Prometheus to Monitor Node Exporter

  After installing Node Exporter, update the `prometheus.yml` file to add the web application server endpoint for monitoring.

<br>

2. **Black Box Exporter**

    To monitor the application health and availability Black Box Exporter can be used

- Install Black Box Exporter

  Download and install [Black Box Exporter](https://prometheus.io/download/) on the web application server to monitor system health.

- Configure prometheus to collect black box metrices 

  Adjust prometheus.yml file and add black box configurations to it


<br>

3. **Alert Manager**

    Sending alerts is crucial for quick troubleshooting. The Alert Manager is the agent used to handle this.

## Steps to Configure Alert Manager

1. **Create Alert Rules**
   - Navigate to the Prometheus installation directory.
   - Create a file named `rules.yml`.

2. **Define Alert Rules**
   - Locate the configuration for alert rules in the directory:
     ```
     prometheus/rules.yml
     ```
   - Edit this file to define your alerting rules.

3. **Install Alert Manager**
   - Download and install [Alert Manager](https://prometheus.io/download/)


4. **Configure Alert Manager**
   - Find the Alert Manager configuration file in the directory:
     ```
     prometheus/alertmanager.yml
     ```
   - Open this file and replace the email configurations with your specific values.

## Receiving Alerts
Once an alerting rule is triggered, you will receive a notification in your Gmail.

<br>

---

## <a name="grafana">📊 Grafana</a>


To create insightful dashboards for monitoring your services, you can integrate **Grafana** with **Prometheus**. Follow the steps below to set up and connect Grafana to Prometheus.

## Steps to Install and Configure Grafana

1. **Install Grafana**
   - Download Grafana from the official website: [Grafana Downloads](https://grafana.com/grafana/download).

2. **Start Grafana Service**
   - Enable and start the Grafana service:
     ```bash
     sudo systemctl start grafana
     sudo systemctl enable grafana
     ```

3. **Access Grafana**
   - Open Grafana in your browser by navigating to `<your-server-ip>:3000`.

4. **Add Prometheus as a Data Source**
   - Once in Grafana, follow these steps to connect Prometheus:
     - Go to **Configuration** > **Data Sources**.
     - Select **Prometheus** as the data source type.
     - Enter the details to connect to your Prometheus server.
   
5. **Create Dashboards**
   - Choose from a variety of available dashboards in Grafana to monitor your services effectively.


<div align="center">
  <br />

  <table>
    <tr>
      <td>
        <img src="https://memoit-images.s3.us-east-1.amazonaws.com/prom-blackbox.webp" alt="Prometheus Black Box" width="500">
      </td>
      <td>
        <img src="https://memoit-images.s3.us-east-1.amazonaws.com/prom-node-exporter.webp" alt="Prometheus Node Exporter" width="500">
      </td>
    </tr>
  </table>
</div>
