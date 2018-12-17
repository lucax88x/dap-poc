# DAP POC

## Environment variables

In order to fully run the backend, you need to set environment variables (you may need to login again / reboot)

### Windows

```cmd
env.bat
```

### Ubuntu

```bash
sudo -H gedit /etc/environment
```

then manually write & save the following

```text
DAP_Raven__Address="http://localhost:8080"
DAP_Raven__Database="DAP"
```

## Infrastructure

You need to bring up the infrastructure needed for the backend.

```bash
docker-compose -f docker-compose.dev.yml up
```
