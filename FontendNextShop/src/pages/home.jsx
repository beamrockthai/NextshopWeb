import React from "react";
import { motion } from "framer-motion";

// Components
import Card from "./../components/Card";
import MarketAll from "../components/MarketAll";
import Faq from "../components/Faq";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <>
      <motion.div
        className="mt-4 w-full px-6"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7 }}
      >
        <Card />
      </motion.div>

      <motion.section
        className="container mx-auto px-6 py-4 lg:py-8"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 !text-3xl !leading-snug lg:!text-4xl">
          Product list
        </h2>
        <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mt-2 w-full font-normal !text-gray-500 lg:w-5/12">
          สินค้ามีจํานวนจํากัด
        </p>
      </motion.section>

      <motion.div
        className="mt-1 w-full px-6"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <MarketAll />
      </motion.div>

      <motion.div
        className="mt-0 w-full px-6"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <Faq />
      </motion.div>
    </>
  );
};

export default Home;
