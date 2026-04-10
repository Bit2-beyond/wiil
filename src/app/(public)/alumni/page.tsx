import Image from "next/image";
import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const staticAlumni = [
  {
    name: "Dr. Atiquzzaman Mondal",
    degree: "Ph.D [2020-2024]",
    currentPosition: "Postdoctoral Researcher, KFUPM, Saudi Arabia",
    email: "atiq336@gmail.com",
    img: "/LabMembers/Atiq-mondal.jpg",
  },
  {
    name: "Prajwalita Saikia",
    degree: "M.Tech [2020-2022]",
    currentPosition: "Postdoctoral Fellow, University College Dublin, Ireland",
    email: "mitalisaikiajist@gmail.com",
    img: "/LabMembers/Prajwalita-saikia.jpg",
  },
  {
    name: "Aayush Singh",
    degree: "B.Tech [2020-2024]",
    currentPosition: "SWE, Versa Networks, Bengaluru, India",
    email: "ayushsingh8217@gmail.com",
    img: "/LabMembers/Aayush.jpg",
  },
  {
    name: "Ravi Patel",
    degree: "B.Tech [2020-2024]",
    email: "ravirajpatel9990@gmail.com",
    img: "/LabMembers/RaviPatel.jpg",
  },
  {
    name: "Soumya Sankar Mitra",
    degree: "B.Tech [2022-2025]",
    email: "soumyavis10@gmail.com",
    img: "/LabMembers/Soumya.jpeg",
  },
  {
    name: "Naman Jain",
    degree: "B.Tech [2022-2025]",
    email: "namanjain2004.in@gmail.com",
    img: "/LabMembers/Naman-Jain.JPG",
  },
];

export default async function AlumniPage() {
  let dbAlumni: Array<{ id: string; name: string; degree: string; yearStart: number | null; yearEnd: number | null; currentPosition: string | null; email: string | null; imageUrl: string | null }> = [];
  try {
    dbAlumni = await prisma.alumni.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}

  const alumniList = dbAlumni.length > 0 ? dbAlumni : staticAlumni;

  return (
    <>
      <section
        className="text-white"
        style={{ backgroundImage: "linear-gradient(135deg, #0a1628 0%, #0f2d5c 55%, #1a4fa3 100%)" }}
      >
        <Navbar />
        <div className="py-10 px-6 text-center">
          <h1 className="text-3xl font-bold">Alumni</h1>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Passout Students</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {alumniList.map((a, i) => {
            const isDb = "yearStart" in a;
            const degree = isDb
              ? `${(a as { degree: string; yearStart: number | null; yearEnd: number | null }).degree} [${(a as { yearStart: number | null }).yearStart || ""}–${(a as { yearEnd: number | null }).yearEnd || ""}]`
              : (a as { degree: string }).degree;
            const img = isDb ? (a as { imageUrl: string | null }).imageUrl : (a as { img: string }).img;
            return (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-52 bg-gray-100">
                  <Image
                    src={img || "/Will-home-img/Will-logo.jpeg"}
                    alt={a.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{a.name}</h3>
                  <p className="text-blue-600 text-xs font-medium mb-1">{degree}</p>
                  {a.email && <p className="text-gray-500 text-xs mb-1">{a.email}</p>}
                  {a.currentPosition && (
                    <p className="text-gray-600 text-xs">
                      <span className="font-medium">Current:</span> {a.currentPosition}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
