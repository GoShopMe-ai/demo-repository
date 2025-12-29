# Git Setup Guide for GoShopMe

## Step 1: Install Git

Git is not currently installed on your system. Here's how to install it:

### Option A: Download Git for Windows (Recommended)
1. Go to: https://git-scm.com/download/win
2. Download the latest version
3. Run the installer
4. Use default settings (recommended)
5. After installation, **restart your terminal/Cursor**

### Option B: Install via Winget (if available)
Open PowerShell as Administrator and run:
```powershell
winget install --id Git.Git -e --source winget
```

## Step 2: Verify Installation

After installing and restarting, run this command in Cursor's terminal:
```bash
git --version
```

You should see something like: `git version 2.x.x`

## Step 3: Configure Git (First Time Setup)

Set your name and email (required for commits):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 4: Set Up GitHub Account (Optional but Recommended)

GitHub provides cloud backup for your code. It's free and easy to use:

1. **Create a GitHub account** (if you don't have one):
   - Go to: https://github.com/signup
   - Sign up with your email
   - Choose the free plan

2. **Create a new repository**:
   - Click the "+" icon in the top right → "New repository"
   - Name it: `GoShopMe` (or any name you prefer)
   - Choose **Private** (recommended for your project)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

3. **Copy the repository URL** (you'll need this later)
   - It will look like: `https://github.com/yourusername/GoShopMe.git`

## Step 5: Initialize Local Repository & Connect to GitHub

Once Git is installed and you have a GitHub account, I can help you:
1. Initialize the Git repository locally
2. Create the initial commit with all your documentation
3. Connect it to your GitHub repository
4. Push everything to GitHub for cloud backup

---

## How Git + GitHub Works Together

- **Git (local)**: Tracks changes on your computer
- **GitHub (cloud)**: Stores a backup online and lets you access it from anywhere

**Workflow:**
1. Make changes to your files
2. Commit changes locally (Git)
3. Push to GitHub (cloud backup)
4. If files get deleted, you can restore from GitHub!

---

**After you install Git and create a GitHub account, let me know and I'll complete the setup!**

