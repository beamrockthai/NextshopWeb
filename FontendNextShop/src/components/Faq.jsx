import React from "react";
import { motion } from "framer-motion";

const faqList = [
  {
    question: "สินค้าของร้านมีอะไรบ้าง?",
    answer:
      "ร้านค้าของเราจำหน่ายสินค้าหลากหลายประเภท เช่น ผลิตภัณฑ์จากธรรมชาติ สมุนไพรแปรรูป ผลไม้สด รวมไปถึงสินค้าท้องถิ่นคุณภาพจากชุมชน.",
  },
  {
    question: "สินค้าของร้านมีรับประกันหรือไม่?",
    answer:
      "สินค้าทุกชิ้นของเรามีการรับประกันความพึงพอใจ หากได้รับสินค้าไม่ตรงตามคำอธิบาย หรือเกิดความเสียหายระหว่างขนส่ง สามารถแจ้งเปลี่ยน/คืนสินค้าได้ภายใน 7 วัน.",
  },
  {
    question: "สามารถชำระเงินด้วยวิธีใดได้บ้าง?",
    answer:
      "ร้านค้ารองรับการชำระผ่านหลายช่องทาง เช่น โอนเงินผ่านธนาคาร, พร้อมเพย์ และ QR Payment.",
  },
  {
    question: "สั่งซื้อสินค้าผ่านเว็บไซต์แล้วจะได้รับของเมื่อไหร่?",
    answer:
      "โดยทั่วไป การจัดส่งจะใช้เวลาประมาณ 1-3 วันทำการ ขึ้นอยู่กับพื้นที่จัดส่งและประเภทสินค้า.",
  },
  {
    question: "สามารถติดต่อสอบถามข้อมูลเพิ่มเติมได้ทางไหน?",
    answer:
      'ลูกค้าสามารถติดต่อทีมงานผ่านทาง Line, Facebook Page หรือโทรศัพท์ที่แสดงในหน้า "ติดต่อเรา".',
  },
  {
    question: "ร้านเปิดบริการวันไหนบ้าง?",
    answer:
      "ร้านของเราเปิดให้บริการทุกวันจันทร์ - เสาร์ เวลา 9.00 - 18.00 น. และสามารถสั่งซื้อออนไลน์ได้ตลอด 24 ชั่วโมง.",
  },
];

const Faq = () => {
  return (
    <div className="p-8">
      <div className="bg-white p-4 rounded-lg shadow-xl py-8 mt-10">
        <h4 className="text-4xl font-bold text-gray-800 tracking-widest uppercase text-center">
          FAQ
        </h4>
        <p className="text-center text-gray-600 text-sm mt-2">
          คำถามที่พบบ่อยเกี่ยวกับร้านของเรา
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-12 px-2 xl:px-12 mt-4">
          {faqList.map((faq, index) => (
            <motion.div
              key={index}
              className="flex space-x-8 mt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-700">
                  {faq.question}
                </h4>
                <p className="text-gray-600 my-2">{faq.answer}</p>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 hover:underline capitalize"
                >
                  Read More
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
