# Portfolio Website

A minimalist personal portfolio website built with Blazor WebAssembly and deployed on GitHub Pages.

🌐 **Live Site:** [borge.email](https://borge.email)

## About

This is a personal portfolio website showcasing my work and providing links to my professional profiles. Built with modern web technologies and optimized for performance and simplicity.

## Tech Stack

- **Framework:** Blazor WebAssembly (.NET 10.0)
- **Language:** C#
- **Deployment:** GitHub Pages
- **Custom Domain:** borge.email

## Features

- ⚡ Fast, client-side rendering with Blazor WebAssembly
- 📱 Responsive design
- 🎨 Minimalist UI
- 🔗 Social media integration (LinkedIn, GitHub, Substack, Medium)
- 🚀 Deployed on GitHub Pages with custom domain

## Getting Started

### Prerequisites

- [.NET 10.0 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) or later
- A code editor (Visual Studio, VS Code, or Rider)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/0x8j0rn4r80r93/portifolio.git
cd portifolio
```

2. Restore dependencies:
```bash
dotnet restore
```

### Running Locally

Run the development server:
```bash
dotnet watch run
```

The application will be available at `https://localhost:5001` (or the port shown in your terminal).

## Project Structure

```
├── Pages/              # Razor pages
│   └── Home.razor      # Main portfolio page
├── Layout/             # Layout components
│   └── MainLayout.razor
├── wwwroot/            # Static files
│   ├── index.html      # Root HTML page
│   └── css/            # Stylesheets
├── Program.cs          # Application entry point
├── App.razor           # Root component
└── CNAME               # Custom domain configuration
```

## Deployment

This project is hosted on **GitHub Pages** with a custom domain (`borge.email`). The deployment process is automated using GitHub Actions.

### GitHub Pages Setup

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set source to the branch where you publish your build output
   - Add your custom domain in the "Custom domain" field

2. **Custom Domain Configuration:**
   - Add a `CNAME` file to the root with your domain name
   - Configure DNS records with your domain registrar:
     - Add a CNAME record pointing to `<username>.github.io`
     - Or use A records pointing to GitHub Pages IP addresses

3. **Blazor Configuration:**
   - Follow the [official Microsoft documentation](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly/github-pages?view=aspnetcore-10.0) for Blazor WebAssembly on GitHub Pages
   - Ensure proper base path configuration in `index.html`
   - Handle routing for single-page application

### Automated Deployment

The repository uses GitHub Actions to automatically build and deploy changes when pushing to the main branch.

## Links

- 🔗 [LinkedIn](https://www.linkedin.com/in/0x8j0rn4r80r93/)
- 💻 [GitHub](https://github.com/0x8j0rn4r80r93)
- ✍️ [Substack](https://substack.com/@0x8j0rn4r80r93)
- 📝 [Medium](https://medium.com/@0x8j0rn4r80r93)

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## Author

**Bjørnar Borge**  
Developer / Writer / Creator

---

Built with ❤️ using Blazor WebAssembly