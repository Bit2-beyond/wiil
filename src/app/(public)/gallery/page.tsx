import Image from "next/image";
import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const staticImages = [
  "/gallery/AMondal-2.jpeg",
  "/gallery/AMondal-3.jpeg",
  "/gallery/AMondal-4.jpeg",
  "/gallery/AMondal5.jpg",
  "/gallery/AN-3.jpeg",
  "/gallery/AN-4.jpeg",
  "/gallery/AkshayNair-1.jpeg",
  "/gallery/AkshayNair-2.jpeg",
  "/gallery/atiq-defense.jpeg",
];

export default async function GalleryPage() {
  let dbImages: Array<{ id: string; imageUrl: string; caption: string | null; category: string | null }> = [];
  try {
    dbImages = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}

  const images = dbImages.length > 0
    ? dbImages.map((g) => ({ src: g.imageUrl, caption: g.caption || "", category: g.category || "" }))
    : staticImages.map((src) => ({ src, caption: "", category: "" }));

  return (
    <>
      <section
        className="text-white"
        style={{ backgroundImage: "linear-gradient(135deg, #0a1628 0%, #0f2d5c 55%, #1a4fa3 100%)" }}
      >
        <Navbar />
        <div className="py-10 px-6 text-center">
          <h1 className="text-3xl font-bold">Gallery</h1>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Lab Events &amp; Activities</h2>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {images.map((img, i) => (
            <div key={i} className="mb-4 break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <Image
                  src={img.src}
                  alt={img.caption || `Gallery image ${i + 1}`}
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-blue-900/0 hover:bg-blue-900/50 flex items-end transition-all">
                    <p className="text-white text-sm p-3 opacity-0 hover:opacity-100 transition-opacity">
                      {img.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
