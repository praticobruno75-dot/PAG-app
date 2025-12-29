# 🚀 Fullylife PAG - Progressive Web App

**Profilo di Appartenenza al Gruppo** - Applicazione web installabile per gestione profili PAG

---

## 📱 **INSTALLAZIONE RAPIDA (per utenti finali)**

### **Su iOS (iPhone/iPad)**
1. Ricevi il link via WhatsApp: `https://tuonome.github.io/pag-app/`
2. Apri in **Safari** (importante!)
3. Tap icona **Condividi** (quadrato con freccia su)
4. Scorri e tap **"Aggiungi a Home"**
5. Tap **"Aggiungi"**
6. ✅ Icona PAG sulla home screen!

### **Su Android**
1. Ricevi il link via WhatsApp
2. Apri in **Chrome**
3. Tap menu (⋮) → **"Aggiungi a schermata Home"** oppure
4. Vedrai banner "Installa app" → Tap **"Installa"**
5. ✅ Icona PAG sulla home screen!

---

## 🖥️ **DEPLOY SU GITHUB PAGES (per sviluppatori)**

### **Passo 1: Crea Repository**
1. Vai su [github.com](https://github.com)
2. Click **"New repository"**
3. Nome: `pag-app`
4. Pubblico
5. Click **"Create repository"**

### **Passo 2: Carica Files**

**Opzione A - Via Web (più facile):**
1. Nel repository, click **"uploading an existing file"**
2. Trascina TUTTI i file di questa cartella
3. Commit changes

**Opzione B - Via Git:**
```bash
cd pag-pwa
git init
git add .
git commit -m "Initial PWA"
git branch -M main
git remote add origin https://github.com/TUONOME/pag-app.git
git push -u origin main
```

### **Passo 3: Abilita GitHub Pages**
1. Repository → Settings
2. Pages (menu laterale)
3. Source: **Deploy from a branch**
4. Branch: **main** / **root**
5. Save

⏱️ **Attendi 2-3 minuti** → Il sito sarà live!

### **Passo 4: Trova il Tuo Link**
URL: `https://TUONOME.github.io/pag-app/`

---

## 🔧 **PRIMA DEL DEPLOY: Aggiorna HTML**

**⚠️ IMPORTANTE:** Prima di fare il deploy, aggiungi queste righe ai file HTML:

### **In `index.html`, `utente.html`, `consulente.html`**

**Aggiungi nel `<head>` (dopo il `<title>`):**
```html
<!-- PWA Manifest -->
<link rel="manifest" href="./manifest.json">
<meta name="theme-color" content="#f5a623">
<link rel="icon" href="./icons/icon-512.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="PAG">
<link rel="apple-touch-icon" href="./icons/icon-512.png">
```

**Aggiungi prima di chiudere `</body>`:**
```html
<!-- Service Worker Registration -->
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('✅ SW registered'))
      .catch(err => console.log('❌ SW registration failed:', err));
  });
}
</script>
```

---

## 📂 **STRUTTURA FILES**

```
pag-app/
├── index.html           # Menu principale
├── utente.html          # App utente
├── consulente.html      # App consulente
├── manifest.json        # Config PWA
├── sw.js               # Service Worker (offline + cache)
├── README.md           # Questo file
├── icons/
│   ├── icon-192.png    # Icona piccola
│   └── icon-512.png    # Icona grande
└── pdf/                # 16 documenti PDF (3.7MB)
    ├── ATTACCO.pdf
    ├── ATTIVAZIONE.pdf
    ├── BOCCONE.pdf
    ├── FEMMINA.pdf
    ├── FEMMINA_DX.pdf
    ├── FEMMINA_SX.pdf
    ├── GRATIFICAZIONE.pdf
    ├── IDENTIFICAZIONE.pdf
    ├── INIBIZIONE.pdf
    ├── INTERAZIONE_GENERE.pdf
    ├── MASCHIO.pdf
    ├── MASCHIO_DX.pdf
    ├── MASCHIO_SX.pdf
    ├── PROTEZIONE.pdf
    ├── SOCIALITA_.pdf
    └── SPAZIALITA_.pdf
```

---

## ✨ **FUNZIONALITÀ PWA**

### **Installabile**
- Icona personalizzata sulla home
- Apre a schermo intero (senza barra browser)
- Look & feel nativo

### **Offline-First**
- HTML/CSS/JS cachati → Funziona sempre
- PDF scaricati on-demand → Cache permanente
- Primo accesso serve internet, poi offline al 100%

### **Performance**
- Service Worker intelligente
- Cache separata per PDF (3.7MB)
- Strategia "Cache First" per PDF
- Strategia "Network First" per HTML

---

## 🌐 **CONDIVISIONE VIA WHATSAPP**

**Messaggio tipo:**
```
📱 Installa l'app Fullylife PAG!

Link: https://tuonome.github.io/pag-app/

🔹 iPhone: Apri in Safari → Condividi → Aggiungi a Home
🔹 Android: Apri in Chrome → Installa app

Funziona offline dopo la prima installazione! ✅
```

---

## 🛠️ **AGGIORNAMENTI**

Per aggiornare l'app:
1. Modifica i file HTML/CSS/JS
2. Incrementa versione in `sw.js`:
   ```js
   const CACHE_NAME = 'pag-v2'; // <-- cambia numero
   ```
3. Commit e push su GitHub
4. GitHub Pages si aggiorna automaticamente
5. Utenti vedranno aggiornamento al prossimo accesso

---

## 🔐 **PASSWORD CONSULENTE**

La password dell'app consulente è: **FULLYLIFE2026**
(impostata in `index.html`)

---

## 📊 **PERFORMANCE**

- **Dimensione totale:** ~4.2MB
  - HTML/CSS/JS: ~500KB
  - PDF: ~3.7MB
  - Icons: ~36KB

- **Primo caricamento:** ~2-3 secondi (dipende da connessione)
- **Caricamenti successivi:** istantaneo (cache)
- **Offline:** 100% funzionale

---

## ❓ **TROUBLESHOOTING**

### **"I pulsanti non funzionano su iOS!"**
➜ Problema: File aperto da WhatsApp WebView
➜ Soluzione: Aprire in Safari vero (Share → Open in Safari)

### **"L'app non si installa"**
➜ iOS: Deve essere aperta in Safari
➜ Android: Deve essere aperta in Chrome
➜ Verifica HTTPS attivo (GitHub Pages lo fa automaticamente)

### **"PDF non si aprono"**
➜ Prima apertura serve internet
➜ Poi vengono cachati e funzionano offline

### **"Come disinstallo?"**
➜ iOS: Tieni premuto icona → Rimuovi app
➜ Android: Tieni premuto icona → Disinstalla

---

## 📞 **SUPPORTO**

**Fullylife Solutions**
- Web: https://www.fullylife.solutions
- Email: info@fullylife.solutions

---

## 📜 **LICENZA**

© 2024 Fullylife Solutions - Tutti i diritti riservati

---

**Versione:** 1.0.0
**Ultimo aggiornamento:** Dicembre 2024
**Sviluppato con:** HTML5, CSS3, JavaScript, PWA APIs
