"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section
        className="text-white"
        style={{ backgroundImage: "linear-gradient(135deg, #0a1628 0%, #0f2d5c 55%, #1a4fa3 100%)" }}
      >
        <Navbar />
        <div className="py-10 px-6 text-center">
          <h1 className="text-3xl font-bold">Contact Us</h1>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">Get In Touch</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Reach Us</h2>
            <p className="text-gray-600 mb-6">
              Please feel free to reach out to us for any inquiries, collaborations, or feedback. We value your
              input and look forward to connecting with you.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="text-orange-500 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Wireless Intelligence &amp; Innovation Lab, IIIT Guwahati</p>
                  <p className="text-gray-600 text-sm">
                    Room No. 005 &amp; 427, Academic Building, Tech City,<br />
                    Bongora, Guwahati, Assam 781015, India.
                  </p>
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

            {/* Map */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1791.7725463915647!2d91.56198859216639!3d26.081119425014194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5987e09da847%3A0xfc90e6da1b4547c1!2sIndian%20Institute%20of%20Information%20Technology%20Guwahati%20(IIITG)!5e0!3m2!1sen!2sin!4v1756286044055!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <CheckCircle className="text-green-500 mb-3" size={48} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-600">We&apos;ll get back to you as soon as possible.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
