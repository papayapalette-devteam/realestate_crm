"use client";
import Image from "next/image";
import Image1 from '../../icons/about-content-1.webp'
import Image2 from "../../icons/about-content-2.webp"
import Header from "@/Components/header";



export default function AboutPage() {
  return (
    <div className="font-sans">
      <Header/>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <h1 className="text-4xl font-bold drop-shadow-md">About Us</h1>
      </section>

      {/* About JLL Homes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <Image src={Image2} alt="Team" className="rounded-lg shadow-md w-full" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About JLL Homes</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              JLL Homes enable prospective home buyers to choose from an array
              of residential projects offered by eminent developers with
              luxurious amenities. Our highly qualified professionals assist
              homebuyers by identifying their needs and providing research-backed
              advice to make home-buying seamless.
            </p>
            <button className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">See a Brighter Way</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Discover the JLL way — an innovative, intelligent, and human approach to real estate.
        </p>
        <div className="flex justify-center">
          <div className="aspect-video w-full max-w-3xl bg-black rounded-lg flex items-center justify-center text-white">
            <p>Video Unavailable (Private)</p>
          </div>
        </div>
      </section>

      {/* About JLL */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <Image src={Image2} alt="Office" className="rounded-lg shadow-md w-full" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About JLL</h2>
            <p className="text-gray-600 leading-relaxed">
              We see a brighter way forward for our clients, our people, and our
              planet. By combining innovative technology with expertise, we’re
              creating a brighter future for all.
            </p>
          </div>
        </div>
      </section>

      {/* Market Report */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <Image src={Image2} alt="Report" className="rounded-lg shadow-md w-full" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Indian Residential Market Dynamics Q2 2025
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              India’s housing market hit an inflection point in early 2025. While
              sales dipped, resilient cities like Mumbai and Bengaluru showed
              strong buyer confidence and robust developer response.
            </p>
            <div className="flex items-center space-x-4">
              <img src="/qr.png" alt="QR" className="h-16 w-16" />
              <button className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
