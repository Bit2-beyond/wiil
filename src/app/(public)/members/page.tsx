import Image from "next/image";
import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const phdScholars = [
  { name: "Aiswarya T", email: "aiswarya.t@iiitg.ac.in", research: "Machine Learning for Next-Gen Networks", img: "/LabMembers/Aiswariya.jpeg" },
  { name: "Srikanta Dash", email: "srikanta.dash@iiitg.ac.in", research: "Quantum Computing, O-RAN", img: "/LabMembers/srikant.jpeg" },
  { name: "Bittu Mishra", email: "bittu.mishra@iiitg.ac.in", research: "Machine Learning for Next-Gen Networks", img: "/LabMembers/bittu.jpeg" },
  { name: "Sayantan Das", email: "sayantan.das@iiitg.ac.in", research: "IoT, Edge Computing", img: "/LabMembers/Sayantan-Das.jpeg" },
  { name: "Dipankar Sarma", email: "dipankar.sarma@iiitg.ac.in", research: "AI/ML for Next Generation Farming", img: "/LabMembers/dipankar.jpeg" },
  { name: "Sourav Addhya", email: "sourav.addhya@iiitg.ac.in", research: "Movable Antenna for Next-Gen Networks", img: "/LabMembers/sourav.jpg" },
  { name: "Satyam Shaurya", email: "satyamshaurya@iiitg.ac.in", research: "Data Security using AI/ML", img: "/LabMembers/satyam.png" },
];

const researchInterns = [
  { name: "Vaibhav", email: "vaibhavkr912271@gmail.com", img: "/LabMembers/vaibhav.jpeg" },
  { name: "Susmita Sain", email: "susmita.sain205@gmail.com", img: "/LabMembers/susmita.jpeg" },
  { name: "Harsh Raj", email: "harshraj726wq@gmail.com", img: "/LabMembers/Harsh-intern.jpeg" },
  { name: "Mallena Vaedhan", email: "mallena.vardhan23b@iiitg.ac.in", img: "/LabMembers/vardhan.jpeg" },
];

function MemberCard({ name, email, research, img, position }: {
  name: string; email: string; research?: string; img?: string | null; position?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-52 bg-gray-100">
        <Image
          src={img || "/Will-home-img/Will-logo.jpeg"}
          alt={name}
          fill
          className="object-cover object-top"
          onError={() => {}}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        {position && <p className="text-blue-600 text-xs font-medium mb-1">{position}</p>}
        {email && <p className="text-gray-500 text-xs mb-1">{email}</p>}
        {research && (
          <p className="text-gray-600 text-xs">
            <span className="font-medium">Research:</span> {research}
          </p>
        )}
      </div>
    </div>
  );
}

export default async function MembersPage() {
  // Try to get members from DB, fallback to static
  let dbMembers: Array<{ id: string; name: string; email: string; position: string | null; profileImage: string | null; researchInterests: string | null; role: string }> = [];
  try {
    dbMembers = await prisma.user.findMany({
      where: { role: "MEMBER" },
      select: { id: true, name: true, email: true, position: true, profileImage: true, researchInterests: true, role: true },
      orderBy: { createdAt: "asc" },
    });
  } catch {}

  return (
    <>
      <section
        className="text-white"
        style={{ backgroundImage: "linear-gradient(135deg, #0a1628 0%, #0f2d5c 55%, #1a4fa3 100%)" }}
      >
        <Navbar />
        <div className="py-10 px-6 text-center">
          <h1 className="text-3xl font-bold">Lab Members</h1>
        </div>
      </section>

      {dbMembers.length > 0 ? (
        <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Research Scholars &amp; Members</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dbMembers.map((m) => (
              <MemberCard
                key={m.id}
                name={m.name}
                email={m.email}
                research={m.researchInterests || undefined}
                img={m.profileImage}
                position={m.position || undefined}
              />
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">PhD Research Scholars</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {phdScholars.map((m) => (
                <MemberCard key={m.name} name={m.name} email={m.email} research={m.research} img={m.img} position="PhD Scholar" />
              ))}
            </div>
          </section>
          <section className="py-12 px-6 md:px-12 bg-gray-50 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Research Interns</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {researchInterns.map((m) => (
                <MemberCard key={m.name} name={m.name} email={m.email} img={m.img} position="Research Intern" />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
