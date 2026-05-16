# 🌐 Global Calculator

Welcome to **Global Calculator**, a modern, user-friendly Next.js app that provides a variety of calculators to simplify financial and business decisions. Our goal is to make calculations easy, accurate, and accessible to everyone.

---

## 🚀 Current Implementation

The project is currently focused on **Phase 1: Financial Calculators**, implemented using **Next.js (App Router + TypeScript)**, **Tailwind CSS**, and **Shadcn/UI** for UI components.

## 🧮 Planned Calculators

| Category                         | Calculators                                                                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Business Calculators**         | Break Even, Discount, Inventory Turnover, Markup Markdown, Payroll, Profit Margin, ROI, Tip, VAT / Sales Tax                                |
| **Construction Calculators**     | Area, Concrete, Flooring, Home Affordability, Lumber, Paint, Renovation Cost, Roof Pitch                                                    |
| **Financial Calculators**        | Credit Card Payoff, Currency Converter, EMI, Interest, Investment Return, Loan, Mortgage, Net Worth, Retirement Planning, Savings Goal, Tax |
| **Health & Fitness Calculators** | BMI, BMR, Body Fat, Calorie, Heart Rate Zone, Ideal Weight, Macronutrient, Pregnancy Due Date, Water Intake                                 |
| **Math & Science Calculators**   | Date Time, Equation Solver, Fraction, Percentage, Scientific, Standard, Statistics, Unit Converter                                          |
| **Travel Calculators**           | Distance, Flight Time, Gas Cost, Mileage, Timezone Converter, Toll Cost, Trip Cost                                                          |
| **Utility Calculators**          | Age, Carbon Footprint, Cooking Converter, Discount, Electricity Cost, Split Bill, Time Duration, Tip, Water Usage                           |

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router + TypeScript)
- **Styling:** Tailwind CSS + Shadcn/UI
- **State & Data:** React hooks, optional Zustand / React Query for future features
- **Package Manager:** pnpm
- **Deployment:** GitHub Pages or Vercel

---

## 🚀 Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Run checks before opening a pull request:

```bash
pnpm check
```

Build for production:

```bash
pnpm build
```

For deployments that need a subpath, set `NEXT_PUBLIC_BASE_PATH`. For example,
GitHub Pages can use `NEXT_PUBLIC_BASE_PATH=/global-calculator pnpm build`.
Local development does not require a base path.

---

## 🎯 Future Development Roadmap

### Phase 2: Financial Calculators Expansion

- Loan Calculator (Interest, Tenure, EMI)
- Mortgage Calculator
- Savings / Investment Calculator

### Phase 3: Business Calculators

- Break-even Calculator
- Profit Margin Calculator
- ROI Calculator

### Phase 4: Advanced Features

- User authentication (optional)
- Dark mode toggle
- Charts & visualization for results
- Multi-language support

### Phase 5: Community & Contribution

- Open-source contributions
- Feature requests and issue tracking
- CI/CD with GitHub Actions for automated deployments

---

## 🤝 Contribution Guidelines

We welcome contributions from everyone! Here’s how you can help:

1. **Fork the repository**
2. **Create a branch** for your feature or bugfix
    ```bash
    git checkout -b feature/my-new-feature
    ```
3. Make your changes and commit
    ```bash
     git commit -m "Add: description of your feature"
    ```
4. Push to your branch
    ```bash
    git push origin feature/my-new-feature
    ```
5. **Open a Pull Request** to merge into main
