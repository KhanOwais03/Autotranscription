# File Upload UI --- Next.js + Tailwind + Drag & Drop

A modern file upload UI built using **Next.js (App Router)**, **Tailwind
CSS**, and **React Dropzone**, inspired by clean design-system style
upload components.

------------------------------------------------------------------------

## 🚀 Tech Stack

-   Next.js 14 (App Router)
-   React
-   Tailwind CSS
-   react-dropzone
-   lucide-react (icons)

------------------------------------------------------------------------

## 📂 Project Structure

app/ 
├ api/ 
│ └ upload/ 
│ └ route.ts 
├ components/ 
│ └FileUploadCard.tsx 
├ page.tsx

------------------------------------------------------------------------

## ⚙️ Prerequisites

Make sure you have installed:

-   Node.js 18+ (Recommended: Node 20)
-   npm or yarn

Check versions:

node -v\
npm -v

------------------------------------------------------------------------

## 📦 Installation

Install dependencies:

npm install

If needed manually:

npm install react-dropzone lucide-react

------------------------------------------------------------------------

## 🧪 Run Development Server

npm run dev

Open browser:

http://localhost:3000

------------------------------------------------------------------------

## 🏗 Build for Production

npm run build

------------------------------------------------------------------------

## ▶ Run Production Server

npm start

------------------------------------------------------------------------

## 📤 File Upload Flow

1.  User drags or selects file\
2.  File sent to /api/upload\
3.  API processes file (currently logs file name)\
4.  UI shows upload status

------------------------------------------------------------------------

## 🔌 API Endpoint

### POST /api/upload

Accepts: multipart/form-data\
Field: file

Example response:

{ "success": true }

------------------------------------------------------------------------

## ☁️ Production Upload (Extend Here)

Replace upload logic inside:

app/api/upload/route.ts

With: - AWS S3 - Azure Blob Storage - Google Cloud Storage - Database
storage

------------------------------------------------------------------------

## 🎨 UI Features

-   Drag & drop support\
-   Upload progress states\
-   Clean card layout\
-   Responsive design\
-   Accessible interaction states

------------------------------------------------------------------------

## 📏 Limits (Current Defaults)

Max file size: 5MB\
Max files: 1

------------------------------------------------------------------------

## 🛠 Customization

Change Max File Size example:

maxSize: 10 \* 1024 \* 1024

Allow Multiple Files example:

maxFiles: 5

Restrict File Types example:

accept:\
image/\*\
application/pdf

------------------------------------------------------------------------

## 📱 Mobile Testing

Find local IP:

Mac / Linux: ifconfig

Windows: ipconfig

Open on phone: http://YOUR_IP:3000

------------------------------------------------------------------------

## 🧹 Clean Build Issues

If something breaks:

rm -rf .next\
npm run dev

------------------------------------------------------------------------

## 🚀 Deployment

### Deploy to Vercel

npm install -g vercel\
vercel

Or connect GitHub repo → Vercel dashboard.

------------------------------------------------------------------------

## 🔒 Security Notes (For Production)

Add: - File type validation\
- Virus scanning\
- Signed upload URLs\
- Authentication

------------------------------------------------------------------------

## 👨‍💻 Development Workflow

npm run dev

------------------------------------------------------------------------

## 📜 License

MIT
