# Deployment Guide

This guide will help you deploy your personal website to the internet.

## Quick Overview

- **Frontend**: Deploy to Netlify or Vercel (free, easy)
- **Backend**: Deploy to Render or Railway (free tier available)

---

## Step 1: Deploy Backend (FastAPI)

### Option A: Render (Recommended - Free)

1. **Create account**: Go to [render.com](https://render.com) and sign up (free)

2. **Create new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (or use manual deploy)
   - Settings:
     - **Name**: `personal-website-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn backend:app --host 0.0.0.0 --port $PORT`
     - **Plan**: Free

3. **Add Environment Variables** (if needed):
   - None required for basic setup

4. **Deploy**: Click "Create Web Service"
   - Wait for deployment (takes 2-5 minutes)
   - Copy your backend URL (e.g., `https://your-backend.onrender.com`)

### Option B: Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo and set root directory to `backend`
4. Railway auto-detects Python and FastAPI
5. Copy your backend URL

---

## Step 2: Update Frontend API URL

Before deploying frontend, update the API URL in `frontend/script.js`:

1. Open `frontend/script.js`
2. Replace `const API = "http://localhost:8000";` with your deployed backend URL:
   ```javascript
   const API = "https://your-backend.onrender.com"; // Your actual backend URL
   ```

---

## Step 3: Deploy Frontend

### Option A: Netlify (Recommended - Free)

1. **Create account**: Go to [netlify.com](https://netlify.com) and sign up

2. **Deploy**:
   - Drag and drop your `frontend` folder to Netlify dashboard, OR
   - Connect GitHub repo:
     - Click "Add new site" → "Import an existing project"
     - Connect GitHub and select your repo
     - Settings:
       - **Base directory**: `frontend`
       - **Build command**: (leave empty - static site)
       - **Publish directory**: `frontend`

3. **Get your site URL**: Netlify gives you a URL like `https://your-site.netlify.app`

### Option B: Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New Project"
3. Import your GitHub repo
4. Settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Other
5. Deploy!

---

## Step 4: Update CORS (if needed)

If your frontend and backend are on different domains, update CORS in `backend/backend.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend.netlify.app"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Or keep `["*"]` for development (less secure but works for personal sites).

---

## Step 5: Create data.json (Backend)

Your backend needs a `data.json` file. Create it in the `backend` folder:

```json
{
  "projects": [],
  "messages": []
}
```

Make sure this file is included when you deploy.

---

## Quick Checklist

- [ ] Backend deployed and URL copied
- [ ] Updated `frontend/script.js` with backend URL
- [ ] Created `backend/data.json` file
- [ ] Frontend deployed
- [ ] Tested the site - buttons work, contact form works
- [ ] Updated CORS if needed

---

## Custom Domain (Optional)

Both Netlify and Render support custom domains:
- **Netlify**: Site settings → Domain management
- **Render**: Settings → Custom Domains

---

## Troubleshooting

**Backend not working?**
- Check Render/Railway logs
- Make sure `data.json` exists in backend folder
- Verify start command is correct

**Frontend can't connect to backend?**
- Check CORS settings
- Verify API URL in `script.js` matches backend URL
- Check browser console for errors

**Contact form not working?**
- Check backend logs
- Verify `data.json` file exists and is writable

---

## Cost

All options above are **FREE** for personal projects:
- Netlify: Free tier (100GB bandwidth/month)
- Render: Free tier (spins down after 15min inactivity, but free)
- Railway: $5/month after free credits, or use Render for free
