"use client";

import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Discover Your Next Favorite Book",
    description:
      "Explore a world of stories, knowledge, and imagination. Find the perfect book for your next reading journey.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400",
  },
  {
    title: "A Little Reading Goes a Long Way",
    description:
      "Make reading a part of your everyday life. Discover inspiring books and enjoy every page.",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=1400",
  },
  {
    title: "Share Stories, Share Knowledge",
    description:
      "Add books, borrow books, and share your favorite reads with the BookNook community.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1400",
  },
];

const Hero = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-5 py-8">
      <div className="relative overflow-hidden rounded-2xl">

        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".hero-pagination",
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div
                className="relative flex min-h-[420px] items-center bg-cover bg-center md:min-h-[500px]"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
              
                <div className="absolute inset-0 bg-black/55" />

               
                <div className="relative z-10 max-w-2xl px-8 py-16 text-white md:px-16">
                  <p className="mb-4 font-semibold uppercase tracking-[3px] text-[#e4c58a]">
                    Welcome to BookNook
                  </p>

                  <h1 className="mb-5 text-3xl font-bold leading-tight md:text-5xl">
                    {slide.title}
                  </h1>

                  <p className="mb-8 text-sm leading-7 text-gray-200 md:text-base">
                    {slide.description}
                  </p>

                  <Link
                    href="/books"
                    className="inline-block rounded-lg bg-[#c8a96b] px-7 py-3 font-semibold text-[#173f31] transition hover:bg-[#e0c58f]"
                  >
                    Browse Books
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

       
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur hover:bg-white/40"
        >
          <ChevronLeft size={25} />
        </button>

       
        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur hover:bg-white/40"
        >
          <ChevronRight size={25} />
        </button>

       
        <div className="hero-pagination absolute! bottom-6! left-1/2! z-20 flex! -translate-x-1/2 justify-center gap-2" />

      </div>

     
    </section>
  );
};

export default Hero;