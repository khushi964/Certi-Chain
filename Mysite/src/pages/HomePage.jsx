import React from "react";
import { motion } from "framer-motion";
import "./HomePage.css";

const features = [
  {
    icon: "🔐",
    title: "Tamper-Proof",
    description: "Certificates stored on blockchain cannot be altered or faked.",
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
    icon: "🏛",
    title: "Institution Portal",
    description: "Easy certificate issuance for schools and colleges.",
  },
];

const steps = [
  "Institution issues certificate through our platform.",
  "Certificate data is stored on blockchain, file on IPFS.",
  "Student receives secure link to their certificate.",
  "Employer verifies authenticity with one click.",
];

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section-modern"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>
          Welcome to <span>CertiChain</span>
        </h1>
        <p>Your trusted platform for secure and verifiable certificates.</p>
      </motion.section>

      {/* Features Section */}
      <section className="features-modern">
        <h2>Why Choose CertiChain?</h2>
        <div className="features-grid-modern">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-modern"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="feature-icon-modern">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-modern">
        <h2>How It Works</h2>
        <div className="steps-modern">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-modern"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <div className="step-number-modern">{index + 1}</div>
              <p>{step}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;