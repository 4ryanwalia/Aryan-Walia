# Aryan Walia - Portfolio

A modern, responsive portfolio website built with Next.js, React, and Framer Motion.

## 🚀 Live Demo

Visit: [https://4ryanwalia.github.io/Aryan-Walia/](https://4ryanwalia.github.io/Aryan-Walia/)

## 🛠️ Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **Framer Motion** - Animation library
- **Tailwind CSS** - Styling
- **GitHub Pages** - Hosting

## 📁 Project Structure

```
my-portfolio/
├── pages/          # Next.js pages
├── public/         # Static assets
├── styles/         # Global styles
├── components/     # React components
└── .github/        # GitHub Actions
```

## 🚀 Deployment

### Automatic Deployment (Recommended)

This project uses GitHub Actions for automatic deployment. Simply push to the `main` branch and it will automatically deploy to GitHub Pages.

### Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **The build output will be in the `out/` directory**

3. **Deploy to GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

## 🔧 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)**

## 📝 Features

- ✅ Responsive design
- ✅ Smooth animations with Framer Motion
- ✅ Dark theme
- ✅ Interactive project showcase
- ✅ Contact form
- ✅ Experience timeline
- ✅ Skills section
- ✅ Mobile-friendly navigation

## 🎨 Customization

- Update personal information in `pages/index.js`
- Modify colors and styling in `styles/globals.css`
- Add new projects to the projects array
- Update experience timeline with your background

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Aryan Walia** - Developer & Tech Enthusiast 

---

## Let's Fix the Resume Page 404

### 1. **Check the Exported Output**

Next.js static export (`next export`) should generate:
```
out/resume/index.html
```
and
```
out/AryanWaliaResume.pdf
```
If `out/resume/index.html` is missing, the resume page won't work.

---

### 2. **Why This Might Happen**

- **Dynamic routes** or pages using `getServerSideProps` are NOT exported by `next export`.
- If your `resume.js` is a simple static page (which it is), it should be exported.

---

### 3. **How to Debug**

#### **A. Check the `out` Directory Locally**
1. Run:
   ```sh
   npm run build && npm run export
   ```
2. Open the `out` folder.
3. Confirm you see:
   - `out/index.html`
   - `out/resume/index.html`
   - `out/AryanWaliaResume.pdf`

#### **B. If `resume/index.html` is missing:**
- There may be a misconfiguration in your Next.js setup.

---

### 4. **Possible Causes & Fixes**

#### **A. basePath and assetPrefix**
You have:
```js
basePath: '/Aryan-Walia',
assetPrefix: '/Aryan-Walia/',
```
This is correct for GitHub Pages.  
But, all internal links should use the Next.js `Link` component and **not** hardcoded paths.

#### **B. Link Usage**
In your `index.js` and navigation, make sure you use:
```jsx
<Link href="/resume">Resume</Link>
```
and **not** `/Aryan-Walia/resume`.

#### **C. Export Path Map (Rarely Needed)**
If the page is not exported, you can add a `next.config.mjs` exportPathMap (but with Next 15, this is rarely needed).

---

### 5. **PDF Path**
Your PDF path in `resume.js` should be:
```js
src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/AryanWaliaResume.pdf`}
```
But with your current config, `/Aryan-Walia/AryanWaliaResume.pdf` is correct.

---

## **Action Plan**

1. **Run the build and export locally.**
2. **Check if `out/resume/index.html` exists.**
3. **If it does not exist, let me know.**
4. **If it does exist, push to GitHub and redeploy.**

---

### **If you want, you can upload a screenshot of your `out` directory after export, or paste the directory listing here.**

Let me know what you find, and I’ll guide you to a solution! 