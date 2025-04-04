import React from "react";
import { motion } from "framer-motion";

import image1 from "../assets/MeThat.jpg";
import image2 from "../assets/pra.jpg";
import image3 from "../assets/Cho.jpg";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const Card = () => {
  const cardData = [
    {
      id: 1,
      name: "1 Thatchanon Rodwong (CEO)",
      img: image1,
      desc: "เกิดเมือวันที่ 14 มกราคม ปี 2546 ปัจจุบัน อายุ 22 ปี ตอนนี้กําลังศึกษาอยู่ที่ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",
    },
    {
      id: 2,
      name: "2 Prachwit Tlemmungpan (CEO)",
      img: image2,
      desc: "เกิดเมือวันที่ 21 มิถุนายน ปี 2544 ปัจจุบัน อายุ 24 ปี ตอนนี้กําลังศึกษาอยู่ที่ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",
    },
    {
      id: 3,
      name: "3 Chonlatarn Nambut (CEO)",
      img: image3,
      desc: "เกิดเมือวันที่ 18 มกราคม ปี 2546 ปัจจุบัน อายุ 22 ปี ตอนนี้กําลังศึกษาอยู่ที่ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-4 lg:py-8">
      <motion.h2
        className="text-4xl font-semibold tracking-normal !text-3xl !leading-snug lg:!text-4xl text-blue-gray-900"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        NextShop
      </motion.h2>

      <motion.p
        className="text-xl font-normal leading-relaxed !text-gray-500 mt-2 lg:w-5/12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        ก่อตั้งเมือ วันที่ 3 เมษายน ปี 2568 ณ ประเทศไทยเเลนด์
      </motion.p>

      <motion.a
        href="https://www.material-tailwind.com/"
        target="_blank"
        rel="noreferrer"
        className="block mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        ผู้ร่วมก่อตั้งมีอยู่ด้วยกัน <b>3</b> คน.
      </motion.a>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {cardData.map((card, index) => (
          <motion.div
            key={card.id}
            className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md grid min-h-[30rem] items-end overflow-hidden"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <img
              src={card.img}
              alt={`bg-${card.id}`}
              className="absolute inset-0 w-full h-full object-cover object-center brightness-100"
            />
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="p-6 relative flex flex-col justify-end">
              <h4 className="text-2xl font-semibold text-white">{card.name}</h4>
              <p className="text-base text-white my-2">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Card;
