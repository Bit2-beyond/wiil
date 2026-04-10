import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function DirectorPage() {
  const ongoingProjects = [
    "MATRIX (MTR/2022/000648), SERB: Signal Processing and Optimization for Configuring Intelligent Reflecting Surfaces for Smart Cities, 2023–25 [6.6 Lacs]",
    "IMPRINT (IMC/2020/000015), ANRF: Design, Development, Testing and Automation of LPG, PNG and CNG Operated Refractory Burners for Cooking, 2022–25 [2.1 Crores]",
    "DST GITA (2022TW0201097), Indo-Taiwan: AI/ML-based Reconfigurable Intelligent Surface Assisted IoT Networks, 2023–26 [INR 43 Lacs]",
    "IBITF, IIT Bhilai (TSP scheme): Leveraging AI/ML for Customized Credit Assessment of the Bodo Tribe in the Bodoland Territorial Region, 2023-25 [INR 16.5 Lacs]",
    "Core Research Grant (CRG/2023/003524), ANRF: Smart and Secure Spectrum Sharing for 6G Wireless Networks, 2024-2027 [INR 22.7 Lacs]",
    "SPARC (UKIERI): Open RAN for Next-Gen 6G Communications Using AI-based Quantum Computing, 2024-26 [INR 60 Lacs]",
    "IBITF, IIT Bhilai (Technology Development Scheme): Secure and Intelligent Platform to Combat Fraudulent Payment Mechanisms, 2025-27 [INR 25.9 Lacs]",
    "ICSSR: Socio-Economic Impact and Technological Adaptation of Textile-Based MSMEs in Assam, 2025-26 [INR 8 Lacs]",
  ];

  const completedProjects = [
    "Startup Research Grant (SRG/2020/001145), SERB: Signal Processing for Co-existence between Radar and Future Communication Systems, 2020–22 [18.5 Lacs]",
    "KARYASHALA (AV/KAR/2022/0068), SERB: Next-Generation Network Automation for Industrial Internet-of-Things in Industry 5.0, 2022 [5 Lacs]",
    "VRITIKA (AV/VRI/2022/0305), SERB: Signal Processing for Reconfigurable Intelligent Surface Aided Beyond 5G Communications, 2023 [INR 1.5 Lacs]",
  ];

  const researchAreas = [
    "Signal Processing for Wireless Communications",
    "6G Communications",
    "Transceiver Design for Full-Duplex Radios",
    "Dynamic Spectrum Access",
    "Wireless Edge Caching",
    "Communication-Radar Co-existence",
    "Reconfigurable Intelligent Surface (RIS) Assisted Communications",
    "AI/ML for Communications",
    "Quantum Computing and Communications",
  ];

  const collaborators = [
    "University of Edinburgh, UK",
    "University of Huddersfield, UK",
    "National Sun Yat-Sen University, Taiwan",
    "National Central University, Taiwan",
    "Raytheon Technologies Research Centre, Ireland",
    "Intel Deutschland GmbH, Germany",
    "Ofinno Technologies, USA",
    "Technische Universität Berlin, Germany",
    "IIT Guwahati, IIT BHU, IIT Indore, India",
  ];

  const teaching = [
    "EC-613: Linear Algebra, Statistics and Random Processes (post-grad)",
    "EC-353: Information Theory and Coding (graduate)",
    "EC-241: Signals and Systems (graduate)",
    "EC-646: Statistical Signal Processing (post-grad)",
    "EC-451: Mobile Communications (graduate & post-grad)",
    "EC-352: Digital Communications Lab (graduate)",
    "EC-244: Digital Signal Processing Lab (graduate)",
    "EC-252: Communications Lab (graduate)",
  ];

  return (
    <>
      <section
        className="text-white"
        style={{ backgroundImage: "linear-gradient(135deg, #0a1628 0%, #0f2d5c 55%, #1a4fa3 100%)" }}
      >
        <Navbar />
        <div className="py-10 px-6 text-center">
          <h1 className="text-3xl font-bold">Lab Director</h1>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/Will-home-img/director.jpg"
              alt="Dr. Sudip Biswas"
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Dr. Sudip Biswas</h2>
            <p className="text-blue-700 font-medium mb-4">Associate Professor, Dept. of ECE, IIIT Guwahati</p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sudip Biswas (Member, IEEE) received his Ph.D. in digital communications from the University of
              Edinburgh (UEDIN), U.K., in 2017. From 2017 to 2019, he worked as a Research Associate with the
              Institute of Digital Communications, UEDIN, focusing on optimization and signal processing for 5G
              and beyond communications. He also has industrial experience as an Assistant Systems Engineer at
              Tata Consultancy Services, India (Lucknow and Kolkata) during 2010–2012. Currently, he is an
              Associate Professor in the Department of Electronics and Communications Engineering at IIIT
              Guwahati (IIITG).
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              He serves as an editor for the IEEE Transactions on Green Communications and Networking (TGCN).
              He has been on the TPC of IEEE GLOBECOM 2020–2023 and was a TPC member of IEEE ICC 2022. He has
              contributed to two EU FP7 projects, a DST UKIERI project, and an EPSRC project. Currently, he
              leads three SERB/ANRF projects, one DST (GITA) project, one SPARC (UKIERI) project, and one IBITF
              project. He received the SERB Accelerate Vigyan Karyashala grant in 2022 and the Vritika grant
              in 2024. He also coordinates MoUs with NSYSU Taiwan and "n+i" France.
            </p>
            <Link
              href="https://scholar.google.co.uk/citations?user=g2Co3jsAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-medium transition-colors"
            >
              Google Scholar Profile →
            </Link>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-12 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Ongoing Projects</h3>
              <ul className="space-y-2">
                {ongoingProjects.map((p, i) => (
                  <li key={i} className="flex gap-2 text-gray-700 text-sm">
                    <span className="text-orange-500 shrink-0 mt-0.5">▸</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Completed Projects</h3>
              <ul className="space-y-2">
                {completedProjects.map((p, i) => (
                  <li key={i} className="flex gap-2 text-gray-700 text-sm">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Activities */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Activities</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2"><span className="text-orange-500 shrink-0">▸</span>Editor, IEEE Transactions on Green Communications and Networking (TGCN)</li>
          <li className="flex gap-2"><span className="text-orange-500 shrink-0">▸</span>Member of IEEE, IEEE COMSOC</li>
          <li className="flex gap-2"><span className="text-orange-500 shrink-0">▸</span>Organizing Chair, IEEE International Workshop on Signal Processing Advances in Wireless Communications (SPAWC), 2016</li>
          <li className="flex gap-2"><span className="text-orange-500 shrink-0">▸</span>TPC Member: IEEE ICC, IEEE Globecom, IEEE WCNC</li>
          <li className="flex gap-2"><span className="text-orange-500 shrink-0">▸</span>MoU Coordinator: IIITG–NSYSU Taiwan (2020), IIITG–"n+i" France (2019)</li>
          <li className="flex gap-2"><span className="text-orange-500 shrink-0">▸</span>Reviewer: IEEE TWC, IEEE TCOM, IEEE TSP, and several other IEEE Transactions</li>
          <li className="flex gap-2"><span className="text-orange-500 shrink-0">▸</span>Award: Exemplary Editor of IEEE Transactions on Green Communications &amp; Networking, 2023</li>
        </ul>
      </section>

      {/* Cards: Research, Collaborators, Teaching */}
      <section className="py-12 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-blue-800 mb-4">Research Areas</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {researchAreas.map((r, i) => <li key={i} className="flex gap-2"><span className="text-orange-400">•</span>{r}</li>)}
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-blue-800 mb-4">Collaborators</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {collaborators.map((c, i) => <li key={i} className="flex gap-2"><span className="text-orange-400">•</span>{c}</li>)}
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-blue-800 mb-4">Teaching</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {teaching.map((t, i) => <li key={i} className="flex gap-2"><span className="text-orange-400">•</span>{t}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
