This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Publish on GitHub Pages

This project is configured for static export and auto-deploy to GitHub Pages.

1. Create a new public GitHub repository.
2. Push this project to the `main` branch.
3. In GitHub, open **Settings > Pages** and set **Source** to **GitHub Actions**.
4. Push a new commit to `main`.
5. Wait for the workflow in **Actions** named **Deploy Next.js site to Pages** to finish.

Your site URL will be:

- `https://<github-username>.github.io/<repository-name>/`

### Local check for GitHub Pages build

In PowerShell, run:

```powershell
$env:PAGES_BASE_PATH='/<repository-name>'
$env:NEXT_PUBLIC_SITE_URL='https://<github-username>.github.io/<repository-name>'
npm run build
```

This should create the static output in the `out` folder.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
