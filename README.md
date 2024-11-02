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

