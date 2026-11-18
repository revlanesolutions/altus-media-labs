# Upload Altus Media Labs to GitHub

1. Extract this ZIP on your computer.
2. Create an empty repository on GitHub.
3. Open the repository and choose **Add file → Upload files**.
4. Upload the contents inside the extracted `altus-media-labs` folder, including `.github`, `.gitignore`, `.env.example`, `.prettierrc.json`, `.prettierignore`, and `.editorconfig`. Enable hidden files in your file manager if needed. On macOS, press Command + Shift + Period.
5. Commit the uploaded files. You can upload in several batches if needed. GitHub Desktop is another option for uploading the entire folder.

Upload the extracted files, rather than the ZIP itself, so GitHub can use the source code and run the included workflow.

## Run locally

Install Node.js 22 or newer, then run these commands from the project folder:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. See README.md for production build commands, tests, and configuration.

This is a Next.js application with server API routes. Deploy it to a host that supports Next.js and Node.js; GitHub Pages alone cannot run its server features.

The export contains the current working website, including uncommitted source changes. It excludes Git history, installed dependencies, generated build/test output, and private environment files. Configure live form endpoints in your deployment environment if needed, as described in README.md.
