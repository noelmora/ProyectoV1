# Proyecto de Microservicio

Este proyecto está basado en una arquitectura de microservicios utilizando Docker, Kubernetes, Istio y GitHub Actions para CI/CD. A continuación se describen los pasos necesarios para desplegar localmente este sistema en tu entorno usando Minikube.

Requisitos Previos
Asegúrate de tener instalados los siguientes componentes:

- Docker
- Kubectl
- Minikube
- Skaffold
- Istioctl

---

## 🚀 Guía de Despliegue Local

Sigue los pasos a continuación para desplegar este proyecto en tu entorno local usando Minikube.

---

### 1. Clonar el Repositorio

```bash
git clone https://github.com/SergioClaustro/proyectV1.git
cd proyectV1
```

---

### 2. Iniciar Minikube

```bash
minikube start --driver=docker
```

---

### 3. Instalar Istio e Inyectar Sidecar

```bash
istioctl install --set profile=demo -y
kubectl label namespace istio-system istio-injection=enabled
```

---

### 4. Ejecutar Skaffold

```bash
skaffold dev
```

Este comando:

- Construye las imágenes Docker
- Aplica los manifiestos de Kubernetes
- Despliega los servicios
- Monitorea cambios en el código para recarga automática

---

### 5. Acceder a los Servicios

Para acceder a `user-service`:

```bash
minikube service user-service
```

También puedes hacer esto para `product-service` y `order-service`.

---

### 6. Autenticación y Seguridad

- Algunas rutas como `/profile` requieren un token JWT generado al hacer login.
- La ruta `/health` es pública y se usa en los probes de Kubernetes.

---

### 7. Consola de Kiali (Monitoreo)

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.20/samples/addons/kiali.yaml
kubectl port-forward svc/kiali -n istio-system 20001:20001
```

Luego abre tu navegador en:

```
http://localhost:20001
```

**Usuario:** `admin`  
**Contraseña:** `admin`

---

### 8. Pruebas de Resiliencia

- Si eliminas un pod, Kubernetes lo recreará automáticamente.
- Se implementaron `readiness` y `liveness` probes en cada microservicio.
- Se configuró un `HorizontalPodAutoscaler` para escalar según uso de CPU.

---

### 9. CI/CD con GitHub Actions

Cada vez que haces `git push`, se activa un pipeline que:

- Construye imágenes Docker
- Las sube a Docker Hub
- Despliega cambios automáticamente con Skaffold

---
