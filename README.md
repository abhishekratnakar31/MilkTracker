# Milk Tracker

**Milk Tracker** is a decentralized supply chain tracking system designed to bring transparency, immutability, and trust to the dairy industry. Built on the **Flare Network (Coston2 Testnet)**, it enables farms, distributors, and consumers to track milk batches from source to table with verifiable blockchain records.

---

## 🔗 Contract Details

- **Network:** Flare Coston2 Testnet
- **Contract Address:** `0x5a2fF245Af24DCa6635b80BA83184be50642ED75`
- **Explorer:** [View on Coston2 Explorer](https://coston2-explorer.flare.network/address/0x5a2fF245Af24DCa6635b80BA83184be50642ED75)

---

## 🚀 Project Overview

Traditional dairy supply chains often suffer from:
- **Lack of Transparency:** Difficulty in verifying the true origin of products.
- **Data Silos:** Inconsistent records across different stakeholders.
- **Trust Issues:** Reliance on paper trails that can be easily forged.

**MilkTracker** solves these problems by anchoring every batch entry on a public blockchain.

### Key Features

- **Immutable Record Keeping:** Once a batch is recorded, it cannot be altered.
- **Farm-to-Table Traceability:** Track quantity, source farm, and timestamps.
- **Instant Verification:** Consumers and auditors can verify provenance without intermediaries.
- **User-Friendly Dashboard:** Simple interface for farms to log data and for users to view history.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Blockchain Interaction:** [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/)
- **Wallet Connection:** [RainbowKit](https://www.rainbowkit.com/)
- **Animations:** [GSAP](https://greensock.com/gsap/) & [Lottie React](https://lottiereact.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 💻 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended)
- [npm](https://www.npmjs.com/) (or yarn/pnpm)

### 1. Clone the Repository

```bash
git clone https://github.com/abhishekratnakar31/MilkTracker.git
cd miltracker
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your WalletConnect Project ID. You can obtain one for free from [WalletConnect Cloud](https://cloud.walletconnect.com/).

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## 🏗 Building for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
