import Image from "next/image";
import Navbar from "@/components/Navbar";

const researchAreas = [
  {
    title: "Non-Orthogonal Multiple Access (NOMA)",
    description:
      "NOMA allows multiple users to share the same time–frequency resource via power-domain superposition and successive interference cancellation (SIC). While this improves spectral efficiency, it also introduces additional co-channel interference, especially in ultra-dense and massive-MIMO deployments. Our work revisits resource management (power control, user clustering, SIC ordering) and interference mitigation, and develops robust beamforming/precoding strategies for practical, imperfect-CSI settings.",
  },
  {
    title: "Rate-Splitting Multiple Access (RSMA)",
    description:
      "RSMA is a generalized and more powerful downlink multiple-access strategy that includes SDMA and NOMA as special cases. By splitting messages into common and private parts and decoding only part of the interference, RSMA 'softly' bridges the two extremes of fully decoding interference vs. treating it as noise. This enables better rate–QoS trade-offs, improved robustness to channel uncertainty, and lower complexity receivers in multi-antenna, multi-cell, and cell-free networks.",
  },
  {
    title: "UAV-Assisted Wireless Communication",
    description:
      "Unmanned Aerial Vehicles (UAVs) provide agile coverage, rapid deployment, and on-demand capacity for diverse scenarios—ranging from emergency response and rural connectivity to hotspot densification. We study UAVs as relays, aerial base stations, and flying user equipment. Key topics include 3D placement and trajectory design under energy limits, resilient backhaul and spectrum sharing, mobility-aware handover, and full-duplex self-interference cancellation.",
  },
  {
    title: "Beyond-5G and 6G Communication",
    description:
      "As networks evolve, we investigate the architectural and algorithmic advances shaping the next generation: user-centric/cell-free massive MIMO, integrated access and backhaul, sensing-communication co-design, and semantic/task-oriented communications. Our goal is green, scalable, application-aware connectivity that meets stringent reliability, latency, and energy targets across industrial IoT, autonomous mobility, and public safety.",
  },
  {
    title: "Reconfigurable Intelligent Surfaces (RIS) Aided Communication",
    description:
      "RIS are programmable meta-surfaces that control the propagation environment by guiding reflected signals. They can enhance SNR, mitigate interference, extend coverage, and strengthen physical-layer security with very low power and cost compared to active relays. We develop joint designs of active (BS) beamforming and passive (RIS) phase control, efficient channel estimation/tracking under mobility, and deployment strategies.",
  },
  {
    title: "Backscattering Communication",
    description:
      "Backscatter links enable battery-free transmitters (tags) to communicate by reflecting incident RF rather than generating their own signals. This paradigm—central to RFID and ultra-low-power sensing—reduces device size and energy needs but imposes tight link budgets and strong carrier leakage at the reader. We address waveform and reader design for reliable detection, multi-tag medium access under interference, and operation with ambient carriers.",
  },
  {
    title: "RIS-Assisted V2V and V2I Communication",
    description:
      "Vehicular networks and fog computing require reliable, low-latency links in the presence of blockage, fast fading, and dense traffic. We use RIS to proactively shape channels for vehicle-to-vehicle and vehicle-to-infrastructure communication, improving spectrum efficiency, coverage continuity, and the effectiveness of compute offloading among vehicles and roadside units.",
  },
  {
    title: "Digital Twin Based Communication",
    description:
      "Digital twins (DTs) create high-fidelity, real-time virtual replicas of wireless networks. By streaming telemetry from RAN, core, and edge, DTs support safe 'what-if' exploration, proactive control, and closed-loop optimization before live rollout. We develop surrogate models, emulation pipelines, and learning-based controllers that accelerate experimentation and enable trustworthy network changes.",
  },
  {
    title: "Artificial Intelligence and Machine Learning for Wireless Communications",
    description:
      "We apply AI/ML to channel estimation, user association, resource allocation, routing, anomaly detection, and end-to-end network automation. Emphasis is placed on deep and multi-agent reinforcement learning, graph learning for large topologies, meta/transfer learning for rapid adaptation, and trustworthy AI (constraints, uncertainty, and explainability). Our solutions are designed to be edge-deployable with tight memory and latency budgets.",
  },
];

export default function ResearchPage() {
  return (
    <>
      <section
        className="text-white"
        style={{ backgroundImage: "linear-gradient(135deg, #0a1628 0%, #0f2d5c 55%, #1a4fa3 100%)" }}
      >
        <Navbar />
        <div className="py-10 px-6 text-center">
          <h1 className="text-3xl font-bold">Research Focus</h1>
        </div>
      </section>

      {/* Research Images Banner */}
      <section className="py-8 px-6 md:px-12 bg-blue-50">
        <div className="max-w-7xl mx-auto flex gap-4 overflow-x-auto pb-2">
          {[
            { src: "/LabMembers/rs1.jpeg", alt: "Research 1" },
            { src: "/LabMembers/rs2.jpeg", alt: "Research 2" },
            { src: "/LabMembers/rs3.jpeg", alt: "Research 3" },
            { src: "/LabMembers/rs4.jpeg", alt: "Research 4" },
            { src: "/LabMembers/rs5.jpeg", alt: "Research 5" },
            { src: "/LabMembers/rs6.jpeg", alt: "Research 6" },
          ].map((img) => (
            <div key={img.src} className="relative h-48 w-64 shrink-0 rounded-xl overflow-hidden shadow-md">
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Current Research Focus</h2>
        <div className="space-y-8">
          {researchAreas.map((area, i) => (
            <div
              key={area.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">{area.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{area.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
