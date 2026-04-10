import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const supervisorPassword = await bcrypt.hash("wiil-admin-2024", 12);
  const memberPassword = await bcrypt.hash("wiil-member-2024", 12);

  // Supervisor
  const supervisor = await prisma.user.upsert({
    where: { email: "sudip.biswas@iiitg.ac.in" },
    update: {},
    create: {
      name: "Dr. Sudip Biswas",
      email: "sudip.biswas@iiitg.ac.in",
      password: supervisorPassword,
      role: "SUPERVISOR",
      position: "Associate Professor",
      degree: "Ph.D (Edinburgh)",
      bio: "Associate Professor in the Department of Electronics and Communications Engineering at IIIT Guwahati. PhD from University of Edinburgh, 2017.",
      googleScholar: "https://scholar.google.co.uk/citations?user=g2Co3jsAAAAJ&hl=en",
      researchInterests: "6G, RIS, AI/ML for Wireless Communications, NOMA, RSMA",
    },
  });
  console.log("✓ Supervisor:", supervisor.name);

  // PhD Scholars
  const members = [
    { email: "aiswarya.t@iiitg.ac.in", name: "Aiswarya T", position: "PhD Scholar", research: "Machine Learning for Next-Gen Networks", img: "/LabMembers/Aiswariya.jpeg", joinYear: 2021 },
    { email: "srikanta.dash@iiitg.ac.in", name: "Srikanta Dash", position: "PhD Scholar", research: "Quantum Computing, O-RAN", img: "/LabMembers/srikant.jpeg", joinYear: 2021 },
    { email: "bittu.mishra@iiitg.ac.in", name: "Bittu Mishra", position: "PhD Scholar", research: "Machine Learning for Next-Gen Networks", img: "/LabMembers/bittu.jpeg", joinYear: 2021 },
    { email: "sayantan.das@iiitg.ac.in", name: "Sayantan Das", position: "PhD Scholar", research: "IoT, Edge Computing", img: "/LabMembers/Sayantan-Das.jpeg", joinYear: 2022 },
    { email: "dipankar.sarma@iiitg.ac.in", name: "Dipankar Sarma", position: "PhD Scholar", research: "AI/ML for Next Generation Farming", img: "/LabMembers/dipankar.jpeg", joinYear: 2022 },
    { email: "sourav.addhya@iiitg.ac.in", name: "Sourav Addhya", position: "PhD Scholar", research: "Movable Antenna for Next-Gen Networks", img: "/LabMembers/sourav.jpg", joinYear: 2023 },
    { email: "satyamshaurya@iiitg.ac.in", name: "Satyam Shaurya", position: "PhD Scholar", research: "Data Security using AI/ML", img: "/LabMembers/satyam.png", joinYear: 2023 },
    // Interns
    { email: "vaibhavkr912271@gmail.com", name: "Vaibhav", position: "Research Intern", research: "Wireless Communications", img: "/LabMembers/vaibhav.jpeg" },
    { email: "susmita.sain205@gmail.com", name: "Susmita Sain", position: "Research Intern", research: "Signal Processing", img: "/LabMembers/susmita.jpeg" },
    { email: "harshraj726wq@gmail.com", name: "Harsh Raj", position: "Research Intern", research: "Embedded Systems", img: "/LabMembers/Harsh-intern.jpeg" },
    { email: "mallena.vardhan23b@iiitg.ac.in", name: "Mallena Vaedhan", position: "Research Intern", research: "Communications", img: "/LabMembers/vardhan.jpeg" },
  ];

  for (const m of members) {
    const member = await prisma.user.upsert({
      where: { email: m.email },
      update: {},
      create: {
        name: m.name,
        email: m.email,
        password: memberPassword,
        role: "MEMBER",
        position: m.position,
        joinYear: m.joinYear || null,
        profileImage: m.img,
        researchInterests: m.research,
      },
    });
    console.log("✓ Member:", member.name);
  }

  // News items
  const newsItems = [
    { content: "[Dec 2025] WIIL GitHub repository publicly released.", date: "2025-12-01" },
    { content: "[Sept 2025] Congrats Aiswarya T, Srikant Dash, Bittu Mishra, Soumya Mitra, Naman Jain and Ravi Patel for paper accepted in GLOBECOM 2025", date: "2025-09-01" },
    { content: "[2025] Three SERB/ANRF projects ongoing — MATRIX, Core Research Grant, and SPARC (UKIERI).", date: "2025-01-01" },
    { content: "[2024] Dr. Sudip Biswas received the SERB Vritika grant.", date: "2024-01-01" },
    { content: "[2024] WIIL signs MoU with National Sun Yat-sen University, Taiwan.", date: "2024-03-01" },
  ];

  for (const n of newsItems) {
    await prisma.news.create({ data: { ...n, userId: supervisor.id } });
    console.log("✓ News:", n.content.slice(0, 60));
  }

  // Alumni
  const alumni = [
    { name: "Dr. Atiquzzaman Mondal", degree: "Ph.D", yearStart: 2020, yearEnd: 2024, currentPosition: "Postdoctoral Researcher, KFUPM, Saudi Arabia", email: "atiq336@gmail.com", imageUrl: "/LabMembers/Atiq-mondal.jpg" },
    { name: "Prajwalita Saikia", degree: "M.Tech", yearStart: 2020, yearEnd: 2022, currentPosition: "Postdoctoral Fellow, University College Dublin, Ireland", email: "mitalisaikiajist@gmail.com", imageUrl: "/LabMembers/Prajwalita-saikia.jpg" },
    { name: "Aayush Singh", degree: "B.Tech", yearStart: 2020, yearEnd: 2024, currentPosition: "SWE, Versa Networks, Bengaluru, India", email: "ayushsingh8217@gmail.com", imageUrl: "/LabMembers/Aayush.jpg" },
    { name: "Ravi Patel", degree: "B.Tech", yearStart: 2020, yearEnd: 2024, email: "ravirajpatel9990@gmail.com", imageUrl: "/LabMembers/RaviPatel.jpg" },
    { name: "Soumya Sankar Mitra", degree: "B.Tech", yearStart: 2022, yearEnd: 2025, email: "soumyavis10@gmail.com", imageUrl: "/LabMembers/Soumya.jpeg" },
    { name: "Naman Jain", degree: "B.Tech", yearStart: 2022, yearEnd: 2025, email: "namanjain2004.in@gmail.com", imageUrl: "/LabMembers/Naman-Jain.JPG" },
  ];

  for (const a of alumni) {
    await prisma.alumni.create({ data: a });
    console.log("✓ Alumni:", a.name);
  }

  // Sample publications
  const pubs = [
    { title: "NOMA-Assisted RIS for Beyond 5G Networks", authors: "Aiswarya T, Sudip Biswas", venue: "IEEE GLOBECOM 2025", year: 2025, type: "CONFERENCE" as const },
    { title: "Rate-Splitting Multiple Access with Imperfect CSI", authors: "Srikanta Dash, Sudip Biswas", venue: "IEEE Transactions on Wireless Communications", year: 2024, type: "JOURNAL" as const },
    { title: "UAV-Assisted Reconfigurable Intelligent Surfaces", authors: "Bittu Mishra, Sudip Biswas", venue: "IEEE GLOBECOM 2025", year: 2025, type: "CONFERENCE" as const },
  ];

  for (const p of pubs) {
    await prisma.publication.create({ data: { ...p, userId: supervisor.id } });
    console.log("✓ Publication:", p.title.slice(0, 50));
  }

  console.log("\n✅ Seeding complete!");
  console.log("\n🔑 Default Credentials:");
  console.log("  Supervisor: sudip.biswas@iiitg.ac.in / wiil-admin-2024");
  console.log("  Member:     aiswarya.t@iiitg.ac.in / wiil-member-2024");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
