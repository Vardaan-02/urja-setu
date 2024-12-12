import React from "react";
import Header from "./components/Header";
import Footer from "@/components/ui/Footer";

const contributors = [
  {
    name: "Naitik Jain",
    role: "App Developer",
    image: "profile1.jpeg",
    description: "A skilled developer with a knack for creating high-performance mobile applications. Adept in React Native, Flutter, and cross-platform development, Naitik focuses on delivering seamless user experiences and innovative features.",
  },
  {
    name: "Mokshe Jain",
    role: "Frontend Developer",
    image: "profile2.jpeg",
    description: "An expert in crafting visually stunning and interactive web applications. Proficient in modern frontend technologies like React, TailwindCSS, and Redux, Mokshe brings designs to life with attention to detail and performance optimization.",
  },
  {
    name: "Vansh Dhawan",
    role: "Backend Developer",
    image: "profile3.jpeg",
    description: "A backend specialist passionate about building scalable and secure server-side applications. Skilled in Node.js, Express, and PostgreSQL, Vansh ensures data integrity, API efficiency, and seamless backend operations.",
  },
  {
    name: "Pratham Jain",
    role: "Backend Developer",
    image: "profile4.jpeg",
    description: "Focused on creating robust infrastructure and backend systems. Proficient in microservices architecture, Docker, and Kubernetes, Pratham streamlines deployment processes and ensures system reliability at scale.",
  },
  {
    name: "Vardaan Pahwa",
    role: "AI/ML Engineer",
    image: "profile.jpg",
    description: "Combining expertise in artificial intelligence and machine learning, Vardaan develops cutting-edge models for intelligent applications. Skilled in Python, TensorFlow, and deep learning, he transforms data into actionable insights.",
  },
  {
    name: "Akanksha Mishra",
    role: "Frontend Developer",
    image: "profile6.jpeg",
    description: "A creative frontend developer with a strong eye for aesthetics and functionality. Proficient in HTML5, CSS3, and modern JavaScript frameworks, Akanksha ensures pixel-perfect designs and a smooth user journey.",
  },
];
  
  const About: React.FC = () => {
    return (
      <>
        <Header />
        <div className="bg-emerald-100 dark:bg-emerald-700/[0.2] text-emerald-700 dark:text-emerald-500">
         
          <div
            className="min-h-screen relative bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center px-8 py-12 text-center"
          >
            <div className="absolute inset-0"></div>
            <div className="relative z-10 max-w-4xl">
              <h1 className="text-5xl font-bold mb-6 text-emerald-800">
                About <span className="text-emerald-500">Urja Setu</span>
              </h1>
              <p className="text-lg text-emerald-700 mb-4">
                We aim to revolutionize waste management by enabling efficient recycling and waste-to-energy solutions.
                Our platform encourages user participation through AI-driven waste identification, geolocation services,
                and blockchain-based rewards, ensuring a cleaner environment and a sustainable future.
              </p>
              <p className="text-lg leading-relaxed">
                Join us in creating a world where every piece of waste contributes to renewable energy production
                and a greener tomorrow.
              </p>
            </div>
          </div>
  
          
          <div
            className="relative bg-fixed bg-cover bg-center py-32"
            style={{ backgroundImage: "url('about1.webp')" }}
          >
            <div className="bg-emerald-700 bg-opacity-90 px-8 py-12">
              <div className="max-w-5xl mx-auto text-center text-white">
                <h2 className="text-4xl font-bold mb-8">Our Vision & Features</h2>
                <p className="text-xl font-normal mb-8">
                  To transform the world of recycling, reduce pollution, and foster renewable energy production by
                  connecting users, waste plants, and collection points seamlessly.
                </p>
                <ul className="text-left text-lg list-disc list-inside space-y-4">
                  <li>
                    <strong>AI-Driven Waste Identification:</strong> Advanced AI/ML technology to categorize waste and
                    calculate its potential for energy production.
                  </li>
                  <li>
                    <strong>Blockchain Rewards System:</strong> Earn incentives such as coupons and energy credits,
                    redeemable via cryptocurrency or NFTs.
                  </li>
                  <li>
                    <strong>Geolocation-Based Connectivity:</strong> Easily locate nearby waste-to-energy plants or
                    collection points for convenient drop-offs or pickups.
                  </li>
                  <li>
                    <strong>Real-Time Monitoring:</strong> Track your recycling contributions and waste-processing
                    progress.
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          
          <div className="bg-white dark:bg-emerald-700/[0.2] py-16 px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-emerald-700 dark:text-emerald-500">
                Meet Our Contributors
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                {contributors.map((contributor, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 dark:bg-emerald-700/[0.2]"
                  >
                    <img
                      src={contributor.image}
                      alt={contributor.name}
                      className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-emerald-700 dark:border-emerald-500"
                    />
                    <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-500">
                      {contributor.name}
                    </h3>
                    <p className="text-sm">{contributor.role}</p>
                    <p className="text-xs font-semibold  text-emerald-600 mt-2 dark:text-emerald-300">
                      {contributor.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </>
    );
  };
  
export default About;
  