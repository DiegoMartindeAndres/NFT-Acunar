

# 🧪 Guía para acuñar un NFT en **Ethereum Sepolia**

Esta guía está dividida en dos partes:



1️⃣ Instalación de herramientas para trabajar.

2️⃣ Subida de imagen y metadatos a IPFS usando Pinata

3️⃣ Clonación, configuración y despliegue del proyecto NFT con Hardhat

> 🛠️ Esta versión ha sido adaptada para evitar conflictos de dependencias y facilitar la ejecución directa.

---

## 🎯 Objetivos

1. Crear y subir una imagen y sus metadatos a IPFS (usando IA y Pinata)
2. Clonar un repositorio base de Hardhat compatible con Sepolia
3. Configurar el entorno de desarrollo con las dependencias necesarias
4. Desplegar un contrato inteligente en la red de pruebas Sepolia
5. Acuñar un NFT utilizando los metadatos previamente subidos
6. Visualizar el NFT acuñado en MetaMask
7. (Opcional) Compartir el NFT con otra persona usando su dirección de Ethereum

---

## 📁 Parte 1: Verificar la instalación de `git`, `node` y `npm`

### 🔧 ¿Qué son `git`, `node` y `npm`?

Antes de empezar, veamos brevemente qué es cada una de estas herramientas que vas a necesitar:

* **🐙 Git**: Es un sistema de control de versiones distribuido. Te permite clonar, guardar y gestionar cambios en proyectos de código de forma colaborativa. Es fundamental para trabajar con repositorios en GitHub o similares.

* **🟩 Node.js (`node`)**: Es un entorno de ejecución para JavaScript en el servidor. Nos permite ejecutar código JavaScript fuera del navegador, ideal para herramientas, scripts y desarrollo backend.

* **📦 npm (Node Package Manager)**: Es el gestor de paquetes que viene con Node.js. Sirve para instalar librerías y dependencias necesarias para tu proyecto (como `ethers`, `dotenv`, `hardhat`, etc.).

> ✅ Estas tres herramientas son esenciales si vas a trabajar en desarrollo web moderno o proyectos con tecnologías blockchain como Hardhat o Ethereum.


### 🧪 1. Verificar que tienes `git` instalado

Antes de clonar el repositorio, asegúrate de que tienes Git instalado en tu sistema. Abre una terminal y ejecuta:

```bash
git --version
```

* Si ves un mensaje como `git version 2.34.1` ✅, ¡todo está listo!
* Si te sale un error tipo `command not found` ❌, descarga e instala Git desde:

👉 [https://git-scm.com/downloads](https://git-scm.com/downloads)

> Una vez instalado, **cierra y vuelve a abrir la terminal** para que se apliquen los cambios.

---

### 🧪 2. Verificar que tienes `Node.js` y `npm` instalados

Necesitamos `Node.js` y su gestor de paquetes `npm`. Compruébalo con estos comandos:

```bash
node --version
npm --version
```

* Si ves algo como `v18.16.0` y `9.5.1` ✅, ¡perfecto!
* Si no se reconoce el comando ❌, instala Node.js (incluye npm automáticamente) desde:

👉 [https://nodejs.org](https://nodejs.org)

> Te recomiendo instalar la versión **LTS** (Long Term Support) para mayor compatibilidad.

---

## 📁 Parte 2: Crear y subir imagen + metadatos a IPFS

### 🧠 1. Obtener una imagen (opcional pero recomendado)

La imagen debe ser original. Puede ser:

* Una fotografía propia (móvil, cámara)
* Una imagen creada con programas como GIMP o Photoshop
* O bien una imagen generada por IA, considerada libre de derechos

Herramientas recomendadas para generar imágenes con IA:

* [bing.com/images/create](https://www.bing.com/images/create)
* [hotpot.ai/art-generator](https://hotpot.ai/art-generator)
* [craiyon.com](https://www.craiyon.com/)
* [chat.openai.com](https://chat.openai.com/)

> 💡 Guarda la imagen en un directorio llamado `/ficheros/` dentro del proyecto.

---

### 📝 2. Crear el archivo `metadata.json`

El archivo `metadata.json` describe tu NFT. Crea un archivo en el mismo directorio que la imagen, con este contenido de ejemplo:

```json
{
  "name": "Curso Blockchain para Personal Militar",
  "description": "Imagen generada por IA que muestra a militares españoles aprendiendo sobre la tecnología blockchain.",
  "image": "https://gateway.pinata.cloud/ipfs/<CID_IMAGEN>",
  "attributes": [
    { "trait_type": "País", "value": "España" },
    { "trait_type": "Tema", "value": "Blockchain" },
    { "trait_type": "Uso educativo", "value": "Sí" },
    { "trait_type": "Red", "value": "Sepolia" }
  ]
}
```

> 🤖 Puedes pedir ayuda a una IA (como ChatGPT) para generarlo automáticamente. Asegúrate de **reemplazar el campo `image`** con la URL correcta tras subir la imagen.

---

### 📤 3. Subir la imagen a IPFS con Pinata

1. Crea una cuenta o inicia sesión en [pinata.cloud](https://www.pinata.cloud)
2. Ve a **Upload** → **File** y sube tu imagen
3. Copia el CID generado o la URL pública:

   ```
   https://gateway.pinata.cloud/ipfs/<CID_IMAGEN>
   ```
4. Actualiza el campo `image` del `metadata.json` con esta URL

---

### 📤 4. Subir `metadata.json` a Pinata

1. Repite el proceso anterior subiendo ahora el archivo `metadata.json`
2. Copia la URL pública generada:

   ```
   https://gateway.pinata.cloud/ipfs/<CID_METADATA>
   ```

> ⚠️ Guarda bien **ambas URLs** (la de la imagen y la de los metadatos). Las necesitarás más adelante.

---

## 💻 Parte 3: Clonar el repositorio y desplegar el NFT

### 📦 1. Clonar el repositorio base

Ve al directorio donde quieras trabajar. Recuerda que tras ejecutar este comando, se creará una carpeta llamada `NFT-Acunar` con todo el código necesario para acuñar tu NFT.

```bash
git clone https://github.com/DiegoMartindeAndres/NFT-Acunar
cd NFT-Acunar
```

🔍 **Estructura del proyecto**:

```
NFT-Acunar/
├── .env                     # Variables de entorno (⚠️ no subir a Git)
├── hardhat.config.js        # Configuración de Hardhat
├── contracts/
│   └── MiNFT.sol            # Contrato inteligente ERC-721
├── scripts/
│   ├── deploy.js            # Script para desplegar el contrato
│   └── acunar.js            # Script para acuñar el NFT
```

---

### 📦 2. Instalar dependencias

```bash
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-ethers
npm install --save ethers@5.8.0 dotenv
npm install @openzeppelin/contracts
```

> ✅ **Nota**: la versión `ethers@5.8.0` es importante para evitar errores de compatibilidad.

---

### 🔐 3. Configurar `.env`

Abre el archivo `.env` y completa estas variables:

```env
ALCHEMY_URL=https://eth-sepolia.g.alchemy.com/v2/tu_token
PRIVATE_KEY=tu_clave_privada_sin_0x
```

* 🔗 **ALCHEMY\_URL**: crea un proyecto en [alchemy.com](https://alchemy.com) usando la red Sepolia
* 🔑 **PRIVATE\_KEY**: lo puedes exportar desde MetaMask (sin el prefijo `0x`)

> 🚫 **No compartas nunca este archivo**. Guárdalo solo localmente y añádelo a `.gitignore`. 

---

### 🧪 4. Compilar el proyecto

```bash
npx hardhat compile
```

---

### 🚀 5. Desplegar el contrato en Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

✅ Guarda la dirección del contrato desplegado:
`0x...`

---

### 🎯 6. Acuñar el NFT

1. Abre `scripts/acunar.js`
2. Sustituye:

```js
const metadatas = [
  "URL_DEL_METADATA"
];

// Resto del código...

const contrato = await hre.ethers.getContractAt("MiNFT", "DIRECCION_DEL_CONTRATO");
```

Reemplaza por ejemplo:

```js
const metadatas = [
  "https://gateway.pinata.cloud/ipfs/Qm123..."
];

const contrato = await hre.ethers.getContractAt("MiNFT", "0x1234...ABCD");
```

3. Ejecuta el script:

```bash
npx hardhat run scripts/acunar.js --network sepolia
```

Si recibes un mensaje de éxito, ¡tu NFT ha sido acuñado! 🎉

---

## 👀 Ver tu NFT en MetaMask

1. Abre MetaMask (extensión o app)
2. Cambia a la red **Sepolia**
3. Ve a la pestaña **NFTs** → pulsa **Importar NFT**
4. Introduce:

* Dirección del contrato NFT
* Token ID: `0` (si es el primer NFT que has acuñado)

---

## 🎉 ¡Enhorabuena!

Has creado, desplegado y visualizado tu primer NFT educativo en la red de pruebas **Sepolia** 🚀
Puedes compartirlo con otros y seguir explorando el mundo de la Web3 y los contratos inteligentes ✨


---

## 🎯 Reto

¿Ya has desplegado y visualizado tu NFT? ¡Vamos un paso más allá!

### 🔁 Manda tu NFT a un compañero usando MetaMask

1. Pide a un compañero su **dirección pública de Ethereum** (⚠️ nunca la clave privada).
2. Abre **MetaMask** (extensión o app).
3. En la pestaña **NFTs**, selecciona tu NFT.
4. Pulsa **Enviar** o **Transferir**.
5. Introduce la dirección de tu compañero y confirma la transacción.

> 🧾 La transacción requiere un pequeño gasto en SepoliaETH (recuerda tener saldo en la red de prueba).

✅ Si todo va bien, tu compañero podrá ver el NFT importándolo en su MetaMask, tal como hiciste tú.

---


## ➕ ¿Cómo acuñar más imágenes?

### 🔁 Pasos para cada nueva imagen:

1. **🔍 Crea o consigue una nueva imagen**
   Usa IA, una foto, o un editor como hiciste en la Parte 1.

2. **📝 Genera un nuevo archivo `metadata_X.json`**
   Crea un archivo JSON similar al primero, pero con contenido adaptado y una URL diferente en `image`. Por ejemplo:
   `metadata_1.json`, `metadata_2.json`, etc.

3. **📤 Sube la nueva imagen a Pinata**
   Obtén su URL pública (IPFS) y actualiza el campo `image` del nuevo `metadata_X.json`.

4. **📤 Sube el nuevo `metadata_X.json` a Pinata**
   Copia su URL IPFS. Lo necesitarás para acuñar.

5. **🎯 Acuña el nuevo NFT con un nuevo `tokenId`**

Abre `scripts/acunar.js` y modifica el script así:


```js
const metadatas = [
  "URL_DEL_METADATA_1",
  "URL_DEL_METADATA_2",
  "URL_DEL_METADATA_3"
];

```

Luego ejecútalo:

```bash
npx hardhat run scripts/acunar.js --network sepolia
```

Si recibes un mensaje de éxito, ¡todos los NFTs han sido acuñados! 🎉

