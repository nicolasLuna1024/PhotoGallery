# PhotoGallery

# 📸 FotoFlash App

Bienvenido a **FotoFlash**, una aplicación de galería fotográfica construida con **Ionic + Angular + Capacitor**.  
Esta app permite tomar fotos, guardarlas localmente y visualizarlas de forma organizada y eficiente.  

---

## 🚀 Funcionalidades principales

### 1️⃣ Mostrar nombre del archivo debajo de cada imagen
Cada imagen guardada ahora incluye su **nombre de archivo** justo debajo de la foto.  
Esto facilita su identificación y gestión. ✅

📁 Ejemplo:

![image](https://github.com/user-attachments/assets/8d2205a8-f371-40f9-8236-6ad6e497329b)

### 2️⃣ Visualización de fotos en el Tab 3
Las fotos **ya no se muestran en el Tab 2**.  
Ahora se cargan y visualizan exclusivamente desde el **Tab 3**, como una galería dedicada. 🖼️

![image](https://github.com/user-attachments/assets/96045869-5d1d-4590-8592-b78b610d91c6)
![image](https://github.com/user-attachments/assets/2d657702-61a2-462e-8c53-db1f2e160144)


### 3️⃣ Cargar fotos manualmente mediante un botón
Las fotos **no se cargan automáticamente**.  
Ahora, puedes presionar un botón con ícono 👁️ `eye` para visualizar las fotos previamente guardadas.  
Esto optimiza el rendimiento y te da mayor control. 🎛️

![image](https://github.com/user-attachments/assets/2995764f-3260-433a-afd6-d5703da5b651)
![image](https://github.com/user-attachments/assets/9d3aa5d2-dc8a-4d8a-b50d-838fdd6612d4)
![image](https://github.com/user-attachments/assets/ea588ccf-8de5-4722-b097-237e951a3b0b)


### 4️⃣ Botón para tomar fotos al 50% de calidad
Se añadió un botón adicional para que puedas tomar una foto con calidad **media (50%)**.  
Esto ayuda a **reducir el tamaño del archivo** y acelerar el guardado en dispositivos de bajos recursos. ⚡

🔘 Al presionar el botón, aparecerán estas opciones:

- Alta (100%) 📷
- Media (50%) 📉
- Cancelar ❌

![image](https://github.com/user-attachments/assets/e9965f66-ab78-400f-b107-884e38446db7)

![image](https://github.com/user-attachments/assets/3fbca459-742a-4fcf-8a11-b13290c2689e)

## Splash Screen
![image](https://github.com/user-attachments/assets/0687cabd-ebae-487d-af7b-a54a1c0e1ee9)



## 🛠️ Estructura del repositorio

```bash
foto-flash/
├── src/
│   ├── app/
│   ├── assets/
│   ├── pages/
│   └── services/
├── android/
├── ios/
├── capacitor.config.ts
└── README.md
