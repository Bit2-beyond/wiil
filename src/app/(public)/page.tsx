import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { MapPin, Phone, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";

const staticNews = [
  "[Dec 2025] WIIL GitHub repository publicly released.",
  "[Sept 2025] Congrats Aiswarya T, Srikant Dash, Bittu Mishra, Soumya Mitra, Naman Jain and Ravi Patel for paper accepted in GLOBECOM 2025",
  "[2025] Three SERB/ANRF projects ongoing — MATRIX, Core Research Grant, and SPARC (UKIERI).",
  "[2024] Dr. Sudip Biswas received the SERB Vritika grant.",
  "[2024] WIIL signs MoU with National Sun Yat-sen University, Taiwan.",
];

async function getNews() {
  try {
    const items = await prisma.news.findMany({ orderBy: { createdAt: "desc" }, take: 10 });
    if (items.length > 0) return items.map((n) => n.content);
  } catch {}
  return staticNews;
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const newsItems = await getNews();
  const tickerText = newsItems.join("   ✦   ");

  return (
    <>
      {/* Hero */}
      <section
        className="relative text-white min-h-[92vh] flex flex-col"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #0a1628 0%, #0f2d5c 55%, #1a4fa3 100%)",
        }}
      >
        <Navbar />
        <div className="flex-1 flex items-center px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <p className="text-orange-400 font-semibold mb-2 tracking-widest text-sm uppercase">
              IIIT Guwahati
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Wireless Intelligence &amp; Innovation Lab
            </h1>
            <p className="text-blue-200 text-lg mb-8 max-w-2xl leading-relaxed">
              Pioneering research in 6G communications, AI/ML-driven signal processing,
              Reconfigurable Intelligent Surfaces, IoT, and next-generation wireless technologies.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Our Research →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/30 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* News Ticker */}
      <section className="bg-blue-900 text-white py-2 overflow-hidden">
        <div className="flex items-center">
          <div className="shrink-0 bg-orange-500 px-4 py-2 font-bold text-sm z-10">
            NEWS
          </div>
          <div className="overflow-hidden flex-1 ml-2">
            <div className="ticker-animate text-sm py-1">
              {tickerText} &nbsp;&nbsp;&nbsp; {tickerText}
            </div>
          </div>
        </div>
      </section>

      {/* About Lab */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">About Lab</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Wireless Intelligence &amp; Innovation Lab (WIIL), IIIT Guwahati
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The Wireless Intelligence &amp; Innovation Lab (WIIL) at IIIT Guwahati, led by Dr. Sudip Biswas,
              focuses on pioneering research in next-generation wireless communication technologies, including
              6G communications, machine learning-driven signal processing, and reconfigurable intelligent
              surfaces (RIS). The lab explores cutting-edge domains such as IoT, Open RAN architectures,
              wireless edge caching, and edge computing tailored for vehicular and industrial internet
              applications (V2X, Industry 5.0). It also engages in advanced quantum communications and
              intelligent network automation to develop robust, energy-efficient, and AI-driven wireless
              systems. WIIL integrates theoretical frameworks with practical applications, fostering
              collaborations with international academic and industrial partners to accelerate innovation.
            </p>
          </div>
          <div className="relative h-72 rounded-xl overflow-hidden shadow-xl group">
            <Image
              src="/Labspace/LabDesk.jpeg"
              alt="WIIL Lab Space"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-blue-900/40 flex items-end p-4">
              <span className="text-white font-semibold">Wireless Intelligence &amp; Innovation Lab</span>
            </div>
          </div>
        </div>
      </section>

      {/* Director Snapshot */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden shadow-xl group">
            <Image
              src="/Will-home-img/director.jpg"
              alt="Dr. Sudip Biswas"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-blue-900/40 flex items-end p-4">
              <span className="text-white font-semibold">Lab Director</span>
            </div>
          </div>
          <div>
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">Lab Director</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Dr. Sudip Biswas</h2>
            <p className="text-blue-700 font-medium mb-4">Associate Professor, Dept. of ECE, IIIT Guwahati</p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sudip Biswas (Member, IEEE) received his Ph.D. in digital communications from the University
              of Edinburgh (UEDIN), U.K., in 2017. He currently leads multiple SERB/ANRF projects and
              coordinates international MoUs with NSYSU Taiwan and "n+i" France.
            </p>
            <Link
              href="/director"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-medium transition-colors"
            >
              Full Profile →
            </Link>
          </div>
        </div>
      </section>

      {/* Research Areas Quick View */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">What We Do</p>
          <h2 className="text-3xl font-bold text-gray-900">Research Focus Areas</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "6G & Beyond Communications", icon: "📡" },
            { title: "Reconfigurable Intelligent Surfaces", icon: "🔭" },
            { title: "AI/ML for Wireless", icon: "🤖" },
            { title: "NOMA & RSMA", icon: "📶" },
            { title: "UAV-Assisted Networks", icon: "🚁" },
            { title: "IoT & Edge Computing", icon: "🌐" },
          ].map((area) => (
            <div
              key={area.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{area.icon}</div>
              <h3 className="font-semibold text-gray-800">{area.title}</h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold"
          >
            See all research areas →
          </Link>
        </div>
      </section>

      {/* Contact / Map */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">Get In Touch</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Reach Us</h2>
            <p className="text-gray-600 mb-6">
              Please feel free to reach out to us for any inquiries, collaborations, or feedback.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-orange-500 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Wireless Intelligence &amp; Innovation Lab, IIIT Guwahati</p>
                  <p className="text-gray-600 text-sm">Room No. 005 &amp; 427, Academic Building, Tech City,<br />Bongora, Guwahati, Assam 781015, India.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-orange-500 shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-800">+91-8822887837 / 9777691379</p>
                  <p className="text-gray-600 text-sm">Monday to Saturday, 10AM to 6PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-orange-500 shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-800">wirelessintelligenceandinnovat@gmail.com</p>
                  <p className="text-gray-600 text-sm">Email us your query</p>
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Send a Message →
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1791.7725463915647!2d91.56198859216639!3d26.081119425014194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5987e09da847%3A0xfc90e6da1b4547c1!2sIndian%20Institute%20of%20Information%20Technology%20Guwahati%20(IIITG)!5e0!3m2!1sen!2sin!4v1756286044055!5m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
