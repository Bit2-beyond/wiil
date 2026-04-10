import Image from "next/image";
import Navbar from "@/components/Navbar";

const hardwareItems = [
  {
    title: "High-Performance Computing",
    description: "Powerful desktop and remote compute resources for simulation, ML training and data analysis.",
    items: [
      "Apple iMac (M1 / M2 / M3 / M4) — 1 TB storage, 16–32 GB RAM",
      "Windows workstations — Intel Core i7, 16 GB RAM, 512 GB–1 TB SSD",
      "Remote GPU node — NVIDIA RTX 3050, 64 GB RAM, up to 1 TB SSD (Remote Desktop accessible)",
    ],
  },
  {
    title: "Wireless & Measurement",
    description: "Industry-grade RF and measurement equipment for software-defined radio and signal analysis.",
    items: [
      "USRP (NI Instruments) — Software Defined Radio platforms",
      "Tektronix Digital Storage Oscilloscope (DSO)",
      "High-speed Wi-Fi (5 GHz) with up to 1 Gbps throughput",
    ],
  },
  {
    title: "Embedded & Edge Devices",
    description: "Edge prototypes and microcontroller boards for IoT, V2X and real-time experimentation.",
    items: [
      "Raspberry Pi 5",
      "Arduino family",
      "Intel Galileo",
      "Hardware development kits & sensor modules",
    ],
  },
  {
    title: "3D Printing & Prototyping",
    description: "Additive manufacturing tools for rapid prototyping of antenna structures and enclosures.",
    items: [
      "FDM 3D Printer — multi-material, up to 0.1 mm resolution",
      "PLA, ABS, and flexible filament support",
      "CAD/CAM software suite",
    ],
  },
];

const labImages = [
  { src: "/Labspace/Lab.jpeg", caption: "Lab Space" },
  { src: "/Labspace/LabDesk.jpeg", caption: "Lab Desk" },
  { src: "/Labspace/USRP.jpeg", caption: "USRP Equipment" },
  { src: "/Labspace/DSO.jpeg", caption: "Digital Storage Oscilloscope" },
  { src: "/Labspace/USRP1.jpeg", caption: "USRP Setup" },
  { src: "/Labspace/Lab05.jpeg", caption: "Lab Environment" },
];

export default function FacilityPage() {
  return (
    <>
      <section
        className="text-white"
        style={{ backgroundImage: "linear-gradient(135deg, #0a1628 0%, #0f2d5c 55%, #1a4fa3 100%)" }}
      >
        <Navbar />
        <div className="py-10 px-6 text-center">
          <h1 className="text-3xl font-bold">Lab Space &amp; Facility</h1>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">Hardware Resources</p>
          <h2 className="text-3xl font-bold text-gray-900">World-Class Research Infrastructure</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            WIIL is equipped with world-class computing and experimental platforms to support advanced research
            in wireless communications, AI/ML, and embedded systems.
          </p>
        </div>

        {/* Lab images */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {labImages.map((img) => (
            <div key={img.src} className="relative h-48 rounded-xl overflow-hidden shadow-md group">
              <Image
                src={img.src}
                alt={img.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-blue-900/30 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-medium">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hardware grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {hardwareItems.map((hw) => (
            <div key={hw.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-blue-900 mb-2">{hw.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{hw.description}</p>
              <ul className="space-y-1">
                {hw.items.map((item, i) => (
                  <li key={i} className="flex gap-2 text-gray-700 text-sm">
                    <span className="text-orange-500 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
