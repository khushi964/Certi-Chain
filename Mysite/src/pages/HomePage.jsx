import React from "react";
import { motion } from "framer-motion";
import "./HomePage.css";

// Features data
const features = [
  {
    icon: "🔐",
    title: "Tamper-Proof",
    description:
      "Certificates stored on blockchain cannot be altered or faked.",
  },
  {
    icon: "⚡",
    title: "Instant Verification",
    description: "Employers can verify credentials in seconds.",
  },
  {
    icon: "🌐",
    title: "Accessible Anywhere",
    description: "Access your certificates from any device.",
  },
  {
    icon: "🏛️",
    title: "Institution Portal",
    description: "Easy certificate issuance for schools and colleges.",
  },
];

// Steps data
const steps = [
  "Institution issues certificate through our platform.",
  "Certificate data is stored on blockchain, file on IPFS.",
  "Student receives secure link to their certificate.",
  "Employer verifies authenticity with one click.",
];

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Existing Content Section */}
      <section className="existing-content">{/* Your existing content */}</section>

      {/* Hero Section */}
      <motion.header
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>Welcome to CertiChain</h1>
        <p>Your trusted platform for secure and verifiable certificates.</p>
      </motion.header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose CertiChain?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.3 }}
            >
              <div className="step-number">{index + 1}</div>
              <p>{step}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
