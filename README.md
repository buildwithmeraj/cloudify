# <img src="public/icon.svg" alt="Cloudify" width="36" style="vertical-align: middle;" /> Cloudify

Cloudify is a media management dashboard built with Next.js.
It is designed to support multiple file providers, with **Cloudinary supported currently**.

## Live URL

- https://cloudify-delta.vercel.app/

## Backend Repo

- https://github.com/buildwithmeraj/cloudify-api

## Features

- Authentication (register, login, logout)
- Dashboard overview with key and file activity
- Cloudinary key management
- Public key management
- Cloudinary file listing, preview, single/multi delete
- API documentation page
- Responsive navigation with active route highlighting

## Provider Support

- Cloudinary: **Available now**
- Cloudflare R2: Planned
- Amazon S3: Planned

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS + DaisyUI
- Axios
- next-themes
- react-icons

## Prerequisites

- Node.js 18+ (recommended)
- npm
- A running Cloudify API backend

## Installation

```bash
npm install
```

## Environment Variables

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Use your backend API base URL in production.

## Run Locally

```bash
npm run dev
```

Open:

- http://localhost:3000

## Build & Start

```bash
npm run build
npm run start
```

## Useful Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Main Routes

- `/` - Home
- `/docs` - API docs
- `/login` - Login
- `/register` - Register
- `/dashboard` - Dashboard
- `/dashboard/files` - File providers
- `/dashboard/files/cloudinary` - Cloudinary files
- `/dashboard/keys` - Keys hub

## Notes

- The app is provider-ready by design.
- Current production file workflow is Cloudinary.
