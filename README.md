<div align="center">

# ShareDrop

**Sube y comparte archivos de cualquier tamaño de forma instantánea**

Una aplicación web moderna con drag & drop, progreso en tiempo real y diseño glassmorphism.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

[Ver Demo](https://alejndromaldonado.github.io/sharedrop/) · [Reportar Bug](https://github.com/Alejndromaldonado/sharedrop/issues) · [Solicitar Feature](https://github.com/Alejndromaldonado/sharedrop/issues)

</div>

---

## Características

| Característica | Descripción |
|----------------|-------------|
| **Drag & Drop** | Arrastra archivos directamente a la zona de upload |
| **Sin límite de tamaño** | Sube archivos de cualquier tamaño usando GoFile |
| **Progreso en tiempo real** | Barra de progreso animada con porcentaje |
| **Links compartibles** | Genera URLs únicas para compartir archivos |
| **Validación de seguridad** | Advierte sobre archivos ejecutables (.exe, .bat, etc.) |
| **Diseño moderno** | Interfaz glassmorphism con animaciones fluidas |
| **Notificaciones elegantes** | Sistema de toasts con iconos dinámicos |
| **Responsive** | Funciona en desktop y móvil |
| **Seguridad CSP** | Content Security Policy implementado |

## Vista Previa

La interfaz ofrece una experiencia limpia y moderna:

- Zona de upload con drag & drop
- Barra de progreso animada
- Notificaciones toast elegantes
- Advertencias de seguridad para archivos ejecutables

## Tecnologías

<p align="left">
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Styles-TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Icons-Lucide-000000?style=flat-square&logo=lucide" alt="Lucide">
  <img src="https://img.shields.io/badge/API-GoFile-FF6B35?style=flat-square" alt="GoFile API">
</p>

## Seguridad

Esta aplicación implementa múltiples capas de seguridad:

| Medida | Descripción |
|--------|-------------|
| **Content Security Policy** | Previene ataques XSS y de inyección |
| **X-Frame-Options** | Protección contra clickjacking |
| **X-Content-Type-Options** | Previene MIME sniffing |
| **Validación de archivos** | Advierte sobre archivos ejecutivos peligrosos |
| **Console logging** | Logs deshabilitados en producción |

## Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/Alejndromaldonado/sharedrop.git

# Entrar al directorio
cd sharedrop

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## Estructura del Proyecto

```
sharedrop/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   └── Toast.jsx
│   ├── services/
│   │   └── gofile.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Previsualiza build de producción |
| `npm run lint` | Ejecuta ESLint |

## API Utilizada

Este proyecto utiliza la **API pública de GoFile** para almacenamiento de archivos:

- **Endpoint**: `https://api.gofile.io`
- **Autenticación**: No requerida (API pública)
- **Límites**: Sin límite de tamaño de archivo

## Roadmap

- [ ] Soporte para múltiples archivos
- [ ] Historial de archivos subidos (localStorage)
- [ ] Tema claro/oscuro
- [ ] QR code para compartir links
- [ ] PWA con offline support

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir cambios mayores.

1. Fork el repositorio
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## Autor

Desarrollado por **Alejandro Maldonado** como proyecto de personal.

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-Alejndromaldonado-181717?style=for-the-badge&logo=github)](https://github.com/Alejndromaldonado)

</div>
    