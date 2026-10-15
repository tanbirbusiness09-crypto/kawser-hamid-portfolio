# Kawser Hamid Portfolio — Local Windows Testing

**Complete project ZIP:** [Download latest main source](https://github.com/tanbirbusiness09-crypto/kawser-hamid-portfolio/archive/refs/heads/main.zip)

## Windows — one-click launch

1. Install **Node.js 24 LTS**, or Node 22.12+ (https://nodejs.org/).
2. Download and **extract the full ZIP** (do not run inside the compressed ZIP).
3. Open the extracted `kawser-hamid-portfolio-...` folder.
4. Double-click **`START-LOCAL.bat`**.
5. On first run, the launcher runs `npm install` (internet required).
6. Open **http://localhost:5173/** on the same PC.
7. Close the terminal or press **Ctrl+C** to stop.

The site uses React, TypeScript, Tailwind, Vite, Framer Motion. Assets, portraits, and animated constellation background are included in the full source ZIP. `node_modules` is not included; the launcher installs it locally.

### Command-line alternative

```powershell
npm install
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

If port 5173 is busy, use port 5174 with `npm run dev -- --host 127.0.0.1 --port 5174` and open http://localhost:5174/.

### Important limitations

The consultation button currently opens an email inquiry, not a paid booking application. The ZIP is a frontend local-testing package. No Firebase / production server secrets are required to run it.

Production source snapshot before these launcher files were added: `dd9744c28af634fdb04ec51df85c5539d56fb42b`.
