"use client";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Menu, X } from "lucide-react"; // lucide-react for icons
import { Heart, BedDouble, Ruler } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Pagination,Navigation  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import 'swiper/css/navigation';
import Image1 from "./icons/mumbai.webp";
import Image2 from "./icons/building.webp";
import Logo from "./icons/logo.svg";
import Image3  from "./icons/JLL_Mumbai_Birla.webp";
import Image4 from "./icons/JLL_Mum_Ekta.webp";
import Image5 from "./icons/JLL_Mumbai_Lodha.webp";
import Image6 from "./icons/JLL_Mumbai_Meghdoo.webp";
import Image7 from "./icons/bedrooms.b2ea63d7.svg";
import Image8 from "./icons/budget.webp";
import Image9 from "./icons/pc-3.webp";
import Image10 from "./icons/pc-2.webp";
import Image11 from "./icons/pc-1.webp";
import Header from "@/Components/header";


export default function Home() { 
  const [menuOpen, setMenuOpen] = useState(false);
  const locations = [
    "Andheri East", "Andheri West", "Ghatkopar East", "Bandra West",
    "Kandivali East", "Worli", "Prabhadevi", "Malabar Hill",
    "Chembur", "Wadala East", "Parel", "Thane West",
    "Vikhroli East", "Goregaon East", "Thane East", "Powai",
    "Juhu", "Vikhroli West", "Lower Parel East", "Goregaon West",
    "Bandra East"
  ];

   const featuredcategories = [
    { title: '1 BHK Flats', count: '680+ Properties' },
    { title: '2 BHK Flats', count: '2410+ Properties' },
    { title: '3 BHK Flats', count: '1160+ Properties' },
    { title: '4 BHK Flats', count: '310+ Properties' },
    { title: 'Apartments', count: '3430+ Properties' },
    { title: 'Villas', count: '5+ Properties Available' },
  ];
    const projects = [
    {
      id: 1,
      title: "Birla Niyaara",
      type: "APARTMENTS",
      location: "Pandurang Budhkar Marg, Century Mills",
      sizes: "850 sqft - 4206 sqft",
      bhk: "2,3,6,7",
      price: "INR 8.49 Cr",
      possession: "Mar 2028",
      image: Image2,
    },
    {
      id: 2,
      title: "Ekta Tripolis - Phase II",
      type: "APARTMENTS",
      location: "Road No. 8, Siddharth Nagar Road Number 2",
      sizes: "727 sqft - 1084 sqft",
      bhk: "2,3",
      price: "INR 3.30 Cr",
      possession: "Dec 2021",
      image: Image4,
    },
    {
      id: 3,
      title: "Lodha Reservo",
      type: "APARTMENTS",
      location: "Lal Bahadur Shastri Marg, Vikhroli West",
      sizes: "894 sqft - 1074 sqft",
      bhk: "2,3",
      price: "INR 2.70 Cr",
      possession: "Mar 2027",
      image: Image2,
    },
    {
      id: 4,
      title: "Meghdoot",
      type: "APARTMENTS",
      location: "5th Road, JVPD Scheme",
      sizes: "1400 sqft",
      bhk: "3",
      price: "INR 9.94 Cr",
      possession: "May 2025",
      image: Image6,
    },

     {
      id: 4,
      title: "Meghdoot",
      type: "APARTMENTS",
      location: "5th Road, JVPD Scheme",
      sizes: "1400 sqft",
      bhk: "3",
      price: "INR 9.94 Cr",
      possession: "May 2025",
      image: Image6,
    },

    
    
  ];

   const categories = [
    {
      title: "New Launches",
      count: "120+ Available Properties",
      img: Image9,
      bg: "bg-white",
      btnBg: "bg-white",
    },
    {
      title: "Ready To Move",
      count: "120+ Available Properties",
      img:Image10,
      bg: "bg-whhite",
      btnBg: "bg-white",
    },
    {
      title: "Under Construction",
      count: "120+ Available Properties",
      img:Image11,
      bg: "bg-white",
      btnBg: "bg-white",
    },
  ];

  const developers = [
  { name: 'India Bulls', logo: '/logos/indiabulls.png' },
  { name: 'Lodha', logo: '/logos/lodha.png' },
  { name: 'Kalpa Taru', logo: '/logos/kalpataru.png' },
  { name: 'Godrej Properties', logo: '/logos/godrej.png' },
  { name: 'Satyam developer', logo: '/logos/godrej.png' },
  { name: 'Shapoorji Pallonji', logo: '/logos/godrej.png' },
  { name: 'Sheath creater', logo: '/logos/godrej.png' },
  { name: 'Piramal Realty', logo: '/logos/godrej.png' },
  { name: 'Godrej Properties', logo: '/logos/godrej.png' },
  { name: 'Intigrated Space Limited', logo: '/logos/godrej.png' },
  { name: 'Chandak', logo: '/logos/godrej.png' },

];
  
const testimonials = [
  {
    name: 'Kamlesh Jain',
    location: 'Mumbai',
    text: 'I was in search of apartment from last 6-8 months. With the help of you all, I found my home of choice with lots of benefits. Thanks a lot. Friendly guidance and work for customer as their family member to complete their destination home.',
  },
  {
    name: 'Mr. Budbadkar',
    location: 'Delhi',
    text: "Back in April 2020 when my family was searching for a house that's when JLL team contacted us. After the first interaction with Mr. Purav Shah from the team, we were pretty sure to go ahead with his plan because he was very reassuring and bold while talking. Throughout our house hunt Purav has been extremely patient and polite and also understood what we were looking for and always came up with best suggestions.",
  },
  {
    name: 'Kevin Jude Pereira',
    location: 'Bengaluru',
    text: 'It has been a great pleasure and success working with Richa and JLL. Since you’ll have a skilled team and makes dreams a reality. After working with Richa and JLL to sell our Projects, I was convinced that she’s one of the realtor we would love to work with. JLL is Honest and has a well-trained team. All the Best Richa and JLL.',
  },
   {
    name: 'Kevin Jude Pereira',
    location: 'Bengaluru',
    text: 'It has been a great pleasure and success working with Richa and JLL. Since you’ll have a skilled team and makes dreams a reality. After working with Richa and JLL to sell our Projects, I was convinced that she’s one of the realtor we would love to work with. JLL is Honest and has a well-trained team. All the Best Richa and JLL.',
  },
   {
    name: 'Kevin Jude Pereira',
    location: 'Bengaluru',
    text: 'It has been a great pleasure and success working with Richa and JLL. Since you’ll have a skilled team and makes dreams a reality. After working with Richa and JLL to sell our Projects, I was convinced that she’s one of the realtor we would love to work with. JLL is Honest and has a well-trained team. All the Best Richa and JLL.',
  },
   {
    name: 'Kevin Jude Pereira',
    location: 'Bengaluru',
    text: 'It has been a great pleasure and success working with Richa and JLL. Since you’ll have a skilled team and makes dreams a reality. After working with Richa and JLL to sell our Projects, I was convinced that she’s one of the realtor we would love to work with. JLL is Honest and has a well-trained team. All the Best Richa and JLL.',
  },
   {
    name: 'Kevin Jude Pereira',
    location: 'Bengaluru',
    text: 'It has been a great pleasure and success working with Richa and JLL. Since you’ll have a skilled team and makes dreams a reality. After working with Richa and JLL to sell our Projects, I was convinced that she’s one of the realtor we would love to work with. JLL is Honest and has a well-trained team. All the Best Richa and JLL.',
  },
];


  return (
    <div className="w-full bg-white font-sans">
      {/* ===== Header ===== */}
    <Header/>

      {/* ===== Hero Section ===== */}
      <section className="flex flex-col md:flex-row w-full min-h-[85vh]">
        {/* Left: Image */}
        <div className="relative w-full md:w-3/5 h-[50vh] md:h-auto">
          <Image
            src={Image1}
            alt="Prestige Ocean Towers"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right: Text Overlay */}
        <div className="bg-[#181B1FE5] text-white flex flex-col justify-center w-full md:w-2/5 px-6 sm:px-10 py-10 md:py-0">
          <h2 className="text-2xl md:text-3xl font-light leading-snug">
            An architectural brilliance overlooking
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold text-[#D8B892] mt-2">
            Queens Necklace & Arabian Sea!
          </h1>
          <h3 className="text-lg md:text-xl mt-3">
            4 bed residences at{" "}
            <span className="font-semibold text-[#D8B892]">Marine Lines</span>
          </h3>

          <ul className="list-disc pl-5 mt-3 mb-6 text-sm md:text-base space-y-1">
            <li>Jodi options up to 5000 sq.ft.</li>
            <li>International design partners</li>
            <li>2 units per floor</li>
            <li>Luxurious amenities</li>
          </ul>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-2">
            <span className="text-lg md:text-xl font-bold">₹25 Crore onwards*</span>
            <span className="hidden sm:inline text-lg font-bold">|</span>
            <span className="text-lg md:text-xl font-bold">+91 98920 45348</span>
          </div>

          <p className="text-xs md:text-sm font-light mt-2">
            *T&C Apply &nbsp;/&nbsp; Agent RERA No.: A51900000251
          </p>
          <p className="text-xs md:text-sm font-light mt-3">
            MahaRERA number:
            <br />
            P5190066470 South Tower
            <br />
            P5190053993 North Tower
            <br />
            <a
              href="https://maharera.maharashtra.gov.in/"
              className="underline text-[#D8B892]"
              target="_blank"
            >
              https://maharera.maharashtra.gov.in/
            </a>
          </p>
        </div>
      </section>

      {/* ===== Tabs & Search ===== */}
      <section className="max-w-7xl mx-auto mt-8 mb-10 px-4 md:px-18">
        {/* Tabs */}
        <div className="bg-white flex flex-wrap justify-center md:justify-start rounded-t-xl  mt:-1 px-6 pt-1 pb-2">
          <nav className="flex flex-wrap gap-4 font-semibold text-[15px] md:text-[16px]">
            <a href="#" className="text-red-600 border-b-2 border-red-600 pb-2">
              All
            </a>
            <a href="#" className="hover:text-red-600 text-gray-800 pb-2">
              Apartments
            </a>
            <a href="#" className="hover:text-red-600 text-gray-800 pb-2">
              Plot
            </a>
            <a href="#" className="hover:text-red-600 text-gray-800 pb-2">
              Villas
            </a>
            <a href="#" className="hover:text-red-600 text-gray-800 pb-2">
              Penthouse
            </a>
            <a href="#" className="hover:text-red-600 text-gray-800 pb-2">
              Senior Living
            </a>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="bg-white flex flex-col sm:flex-row items-center gap-3 w-full rounded-b-xl  md:px-6 py-3 mt-1">
          <input
            type="text"
            placeholder="Developer, Micro-market, Street, Keyword"
            className="flex-grow bg-white text-gray-600 rounded px-4 py-2 border focus:outline-none w-full sm:w-auto"
          />
          <button className="bg-red-600 text-white px-6 py-2 rounded shadow w-full sm:w-auto">
            Search
          </button>
        </div>

        {/* Quick Search */}
        <div className="flex flex-wrap gap-2 md:gap-4 text-gray-600 text-sm mt-3 justify-center md:justify-start">
          <span className="font-semibold">Quick search:</span>
          <span className="bg-zinc-100 px-3 py-1 rounded-full">
            Bandra West
          </span>
          <span className="bg-zinc-100 px-3 py-1 rounded-full">
            Kandivali East
          </span>
          <span className="bg-zinc-100 px-3 py-1 rounded-full">Worli</span>
        </div>
      </section>
  {/* ===== Premium Properties Section ===== */}
<section className="max-w-7xl mx-auto mt-10 px-4 md:px-6">
  <h2 className="text-3xl font-bold text-gray-900">Premium Properties</h2>
  <p className="text-gray-500 mt-1">Top Living Projects in Mumbai</p>

  {/* Property Card */}
  <div className="bg-[#f9f6f2] rounded-xl mt-6 p-6 flex flex-col md:flex-row items-center gap-6 shadow-md">
    {/* Left Content */}
    <div className="flex-1 space-y-4">
      <h3 className="text-2xl font-semibold text-gray-900">Chandak Sarvam</h3>
      <p className="flex items-start text-gray-600 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mt-1 mr-2 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        Jain Derasar, Near, Kavivar Pandit Indra Marg, Bamanpuri, Kanti Nagar,
        J B Nagar, Andheri East, Mumbai, 400059
      </p>

      {/* Property Details */}
      <div className="flex flex-wrap items-center gap-4 text-gray-700 mt-2">
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5h18m-18 9h18M9 3v18m6-18v18"
            />
          </svg>
          2,3,4 Bedrooms
        </span>
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
          702 sqft - 2074 sqft
        </span>
      </div>

      {/* Price */}
      <div className="mt-3">
        <p className="text-xs text-gray-500 uppercase">Starting Price</p>
        <p className="text-lg font-semibold text-gray-900">INR 3.03 Cr</p>
      </div>

      {/* Buttons + Icons */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5v-9m0 0l3 3m-3-3l-3 3M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>
          Download Brochure
        </button>

        <button className="flex items-center gap-2 bg-red-600 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-red-700 transition">
          Explore Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12l-3.75 3.75M3 12h18"
            />
          </svg>
        </button>
      </div>
    </div>

    {/* Right Side: Image */}
    <div className="w-full md:w-[45%] rounded-xl overflow-hidden">
      <Image
        src={Image2}
        alt="Chandak Sarvam"
        width={600}
        height={400}
        className="object-cover w-full h-full rounded-xl"
      />
    </div>
  </div>
</section>


{/* ===== Projects In Demand Section ===== */}
  <section className="max-w-7xl mx-auto mt-16 px-4 md:px-6 font-sans">
      <h2 className="text-3xl font-bold text-gray-900">Project In Demand</h2>
      <p className="text-gray-500 mt-1">Top-tier projects in Mumbai</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:bg-[#fdf8e5] cursor-pointer transition"
          >
            <div className="relative w-full h-56">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              <span className="absolute top-3 left-3 text-[#0b6fa3] bg-[#fcede8] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {project.type}
              </span>
            </div>

            <div className="p-5 flex flex-col justify-between min-h-[200px]">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {project.location}
                </div>

                <div className="flex justify-between text-gray-700 text-sm">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7.5h18m-18 9h18M9 3v18m6-18v18"
                      />
                    </svg>
                    {project.bhk}
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                    {project.sizes}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-400 text-sm flex justify-between">
                <div>
                  <p className="text-gray-600">STARTING PRICE</p>
                  <p className="font-semibold text-lg text-gray-700">
                    {project.price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">POSSESSION</p>
                  <p className="font-semibold text-lg text-gray-700">
                    {project.possession}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-10">
        <a
          href="#"
          className="text-blue-600 font-medium hover:underline inline-flex items-center"
        >
          View All Projects
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12l-3.75 3.75M3 12h18"
            />
          </svg>
        </a>
      </div>
    </section>

 <section className="w-full bg-white py-10 px-4 md:px-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Popular Location
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Explore prime locations and key real estate destinations in Mumbai
        </p>

        {/* Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-[#fdf8e5] hover:shadow-md transition-shadow duration-300 p-4 cursor-pointer"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl">
                <MapPin className="text-red-500 w-6 h-6" />
              </div>
              <span className="font-medium text-gray-800">{loc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ===== Featured Categories & Browse By Budget ===== */}
    <section className="w-full bg-[#ecf6f8] py-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Categories</h2>
            <p className="text-gray-600 mt-1">Explore top property categories.</p>
          </div>

          {/* Slider Buttons */}
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              className="prev-btn p-2 rounded-full border border-gray-300 hover:bg-gray-200 transition"
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="next-btn p-2 rounded-full border border-gray-300 hover:bg-gray-200 transition"
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          navigation={{
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {featuredcategories.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md cursor-pointer hover:bg-[#fdf8e5] transition h-full">
                <div className="text-red-600 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7.5h18m-18 9h18M9 3v18m6-18v18"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.count}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>

{/* ===== Browse By Budget Section ===== */}
<section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-3 items-center font-sans">
  {/* Left Side: Images */}
  <div className=" w-full">
    <Image
      src={Image8}
      alt="Living Room"
      width={400}
      height={300}
      className="rounded-2xl object-cover w-full h-64"
    />
  
  </div>
  {/* Right Side: Text + Boxes */}
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse By Budget</h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      Finding the right property within your budget is key to a smart real estate investment.
      Whether you are looking for affordable, mid-range, or luxury projects, we make your search effortless.
    </p>

    <h3 className="text-lg font-semibold text-gray-800 mb-3">Browse by Budget</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { title: "Affordable Projects", count: "120+ Available Properties" },
        { title: "Mid-segment", count: "120+ Available Properties" },
        { title: "Luxury Projects", count: "120+ Available Properties" },
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:shadow-md hover:bg-[#fdf8e5] transition cursor-pointer"
        >
          <div className="text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7.5h18m-18 9h18M9 3v18m6-18v18"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-sm text-gray-500">{item.count}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  <section className="w-full py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Properties Categories</h2>
          <p className="text-gray-600 mt-2">Explore Properties Tailored to Your Needs</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8">
          {categories.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden shadow-md  cursor-pointer hover:shadow-xl hover:bg-[#f5e6d3] transition bg-white"
            >
              <div className="relative w-full h-64">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className={`flex items-center justify-between px-5 py-4 ${item.bg} border-t`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.count}</p>
                </div>
                <button
                  className={`p-2 rounded-full border border-gray-300 hover:bg-red-500 transition ${item.btnBg}`}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      <section className="w-full py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            New Projects in Mumbai
          </h2>
          <p className="text-gray-600 mt-1">New launch in Mumbai</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 overflow-x-auto pb-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition duration-300 flex-shrink-0"
            >
              {/* Image */}
              <div className="relative w-full h-52 rounded-t-xl overflow-hidden">
                <Image
                  src={Image6}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded">
                  {project.type}
                </span>
                <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-red-100 transition">
                  <Heart size={18} className="text-gray-700" />
                </button>
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {project.name}
                </h3>
                <div className="flex items-start text-sm text-gray-600 mb-3">
                  <MapPin size={16} className="mt-0.5 mr-2 flex-shrink-0" />
                  <p>{project.location}</p>
                </div>

                <div className="flex items-center text-sm text-gray-600 gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <BedDouble size={16} />
                    <span>{project.bhk}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Ruler size={16} />
                    <span>{project.size}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t pt-3">
                  <div>
                    <p className="text-xs text-gray-500">STARTING PRICE</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {project.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">POSSESSION</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {project.possession}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center text-blue-600 font-medium hover:underline"
          >
            View All Projects →
          </a>
        </div>
      </div>
    </section>

    <section className="w-full h-96 flex justify-center bg-white">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#DDE6EA] to-[#F0F6F8] rounded-2xl overflow-hidden p-6 md:p-10">
        {/* Left Text Section */}
        <div className="flex flex-col items-start text-left gap-4 md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A]">
            Exclusive Luxury Properties for Elite Living
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Own a Masterpiece – Explore High-End Villas, Penthouses & Estates at
            Incredible Prices!
          </p>
          <button className="mt-4 flex items-center gap-2 bg-[#D6001C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b10018] transition">
            Explore Now <ArrowRight size={20} />
          </button>
        </div>

        {/* Right Image Section */}
        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <div className="w-full">
            <Image
              src={Image2}
              alt="Luxury Property"
              className="rounded-xl object-cover w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>

  <section className="bg-[#f2f9fb] py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold">Our Developers</h2>
        <p className="text-gray-600">Our developers in Mumbai</p>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1.2}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="px-6"
      >
        {developers.map((dev, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition">
              <img
                src={dev.logo}
                alt={dev.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{dev.name}</h3>
                <p className="text-sm text-gray-500">6+ available properties</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>

    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
        {/* Left Side - Text */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Interiors For Your Home
          </h2>
          <p className="text-gray-600 mb-6">
            Elevate your space with curated interior solutions with our esteemed
            design partners. They convert your imagination into your reality.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Service We Offer
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="border rounded-lg p-4 flex-1 hover:shadow-sm transition">
              <h4 className="font-semibold text-gray-800 mb-2">The Chapter</h4>
              <p className="text-sm text-gray-600">
                At The Chapter, we design homes that harmonize your vision with
                our expertise, blending modern innovation with timeless
                elegance.
              </p>
            </div>

            <div className="border rounded-lg p-4 flex-1 hover:shadow-sm transition">
              <h4 className="font-semibold text-gray-800 mb-2">Bonito</h4>
              <p className="text-sm text-gray-600">
                Bonito Designs, since 2011, has been at the forefront of
                delivering personalized, cutting-edge interiors that make every
                home uniquely yours.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={Image8}
              alt="Interior Design"
              width={700}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#f2f9fb] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-900">
          What Our Clients Say
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-[#ddeff3] rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition">
                <p className="text-gray-700 text-sm mb-6">{t.text}</p>

                <div className="flex items-center gap-3 mt-auto">
                  <FaUserCircle className="text-4xl text-gray-400" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.location}</p>
                  </div>

                  <div className="flex text-yellow-500 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
    </div>

  );
}
