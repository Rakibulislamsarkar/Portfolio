"use client";

import React, { useRef, useEffect, useState, FC } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all"; // Import ScrollTrigger
import { motion, useTransform, useScroll } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MarqueeWithImageTrail from "@/components/MarqueeWithImageTrail";

interface CardProps {
  card: {
    url: string;
    title: string;
    id: number;
  };
}

const cards = [
  {
    url: "1.png",
    title: "Extracting the flavour of nature for Appco",
    id: 1,
  },
  {
    url: "2.jpg",
    title: "Arriving at the station of great literature",
    id: 2,
  },
  {
    url: "3.jpg",
    title: "Finding the simplicity in typeface design",
    id: 3,
  },
  {
    url: "4.jpg",
    title: "Crafting a Bold Identity and Website for ProgresjaTech",
    id: 4,
  },
];

// Main component
export default function Home() {
  const router = useRouter();
  return (
    <>
      <LoadingScreen />
      <Marquee />
      <SectionIntro />
      <SectionWork />
      <AboutWrapper />
      <ServiceMarquee />
      <FooterSection />
    </>
  );
}

//Loading Screen

const LoadingScreen: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading completion after 1 second
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center 
      transition-all duration-1000 ease-in-out ${
        isLoaded ? "invisible" : "visible"
      }`}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Left Panel */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-black 
          transform transition-all duration-1000 ease-in-out 
          ${isLoaded ? "-translate-x-full" : "translate-x-0"}`}
        />
        {/* Right Panel */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full bg-black 
          transform transition-all duration-1000 ease-in-out 
          ${isLoaded ? "translate-x-full" : "translate-x-0"}`}
        />
      </div>
    </div>
  );
};

// Marquee Component
const Marquee = () => {
  const images = [
    '/shapes/shape-1.svg',
    '/shapes/shape-2.svg',
    '/shapes/shape-3.svg',
    '/shapes/shape-4.svg',
    '/shapes/shape-5.svg',
    '/shapes/shape-6.svg',
    '/shapes/shape-7.svg',
    '/shapes/shape-8.svg',
    '/shapes/shape-9.svg',
    '/shapes/shape-10.svg',
    '/shapes/shape-11.svg',
    '/shapes/shape-12.svg',
    '/shapes/shape-13.svg',
    '/shapes/shape-14.svg',
    '/shapes/shape-15.svg',
    '/shapes/shape-16.svg',
    '/shapes/shape-17.svg',
    '/shapes/shape-18.svg',
    '/shapes/shape-19.svg',
    '/shapes/shape-20.svg',
    // ... rest of your images
  ];

  return (
    <main>
      <MarqueeWithImageTrail images={images} />
    </main>
  );
};

const SectionIntro = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      const words = text.innerText.split(" ");

      text.innerHTML = words
        .map((word) => `<span class="word">${word}</span>`)
        .join(" ");

      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        text.querySelectorAll(".word"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "top 20%",
            scrub: 1.5,
          },
        }
      );
    }
  }, []);

  return (
    <div className="w-auto px-4 min-h-[60vh] lg:min-h-[70vh]">
      <h1
        ref={textRef}
        className="font-[branch]  text-[35px] lg:text-[61.44px] leading-10 lg:leading-[75.12px] lg:tracking-[-1px] text-center mx-auto max-w-[1300px]"
      >
        I am a digital-first brand identity & web designer and a Webflow, Figma
        developer. I help companies connect with their audience, expand their
        reach, and achieve greater commercial success.
      </h1>
    </div>
  );
};

// Work Section Component
const SectionWork = () => {
  return (
    <div className="w-full min-h-[50vh] ">
      <h1 className="text-[150px] lg:text-[307.2px] font-[degularLight] tracking-[-10px] leading-[245.76px] px-4">
        Work
      </h1>
      <HorizontalScrollCarousel />
    </div>
  );
};

// Horizontal Scroll Carousel Component
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

const HorizontalScrollCarousel: React.FC = () => {
  const targetRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section ref={targetRef} className="relative h-auto md:h-[300vh]">
      <div className="md:sticky md:top-0 flex flex-col md:flex-row md:h-screen items-center overflow-x-hidden">
        <motion.div
          style={{ x: isDesktop ? x : "none" }}
          className="flex flex-col md:flex-row gap-4 px-4 md:px-0 w-full md:w-auto"
        >
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Card Component
const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[750px] md:h-[650px] w-full md:w-[812px] overflow-hidden flex flex-col rounded-3xl "
    >
      <ImageContainer url={card.url} />
      <TextContainer title={card.title} />
    </div>
  );
};

// Image Container Component
const ImageContainer: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-[100%] md:h-[75%] object-cover rounded-3xl"
    />
  );
};

// Text Container Component
const TextContainer: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="h-[30%] md:h-[25%] w-full flex mt-4">
      <p className="text-4xl md:text-5xl font-[branch] max-w-full md:max-w-[90%] leading-8">
        {title}
      </p>
    </div>
  );
};

// About Wrapper Component
const AboutWrapper = () => {
  return (
    <section className="about-wrapper min-h-screen flex items-center mt-20">
      <div className="about-container flex flex-col lg:flex-row gap-3 w-full px-4 md:px-6">
        <div className="flex lg:hidden">
          <h1 className="text-[150px] font-[degularLight] tracking-[-10px] leading-[245.76px] px-4">
            About
          </h1>
        </div>
        {/* Left Profile Section */}
        <div className="left-profile flex-1 flex items-center justify-center rounded-[12px] overflow-hidden h-auto lg:h-screen">
          <Image
            src="/profile.jpg"
            alt="product preview"
            width={1364}
            height={866}
            quality={100}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right About Section */}
        <div className="right-about flex-1 px-6 md:px-10 py-6 md:py-10 text-gray-800 flex flex-col justify-between gap-6 sm:gap-8 lg:gap-6 xl:gap-8 bg-white rounded-[12px] h-auto lg:h-screen overflow-y-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-9xl font-bold font-[degularRegular] leading-[50px] md:leading-[60px] lg:leading-[70px] xl:leading-[107.52px]">
            Hello there, I&apos;m Rakibul
          </h1>
          <div className="font-[degularLight] flex flex-col gap-4 text-base md:text-lg lg:text-xl xl:text-2xl leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[30px] tracking-[-0.2px] md:tracking-[-0.5px]">
            <p>
              I design bespoke brand identities and websites that fit each
              company like a well-tailored suit, ensuring your brand stands out
              digitally and physically. Specialising in brand identity design,
              I&apos;m also a web designer and Webflow developer with a keen eye
              for typography and motion design.
            </p>
            <p>
              I honed my skills at Coventry University and have created
              impactful visuals for over four years. Guided by Leonardo da
              Vinci&apos;s principle that "Simplicity is the ultimate
              sophistication," I bring clarity and elegance to each project.
            </p>
            <p>
              Outside work, I enjoy photography, travelling, and staying active
              through running, resistance training, and playing volleyball.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Marquee

const ServiceMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const animate = () => {
      if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
        marquee.scrollLeft = 0;
      } else {
        marquee.scrollLeft += 2;
      }
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <>
      <div className="w-full lg:py-20 flex items-center overflow-hidden ">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap overflow-x-hidden w-full"
        >
          {[...Array(2)].map((_, index) => (
            <div key={index} className="inline-flex">
              {["Service - 1", "Service - 2", "Service - 3"].map(
                (word, index) => (
                  <h1
                    key={`${word}-${index}`}
                    className="relative -translate-y-10 text-[15rem] lg:text-[250px] font-[degularLight] leading-300 mx-16  lg:tracking-[-5px] tracking-[-1.2rem]"
                  >
                    {word}
                  </h1>
                )
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="card-wrapper min-h-screen flex items-center p-8">
        <div className="card-container flex flex-col w-full gap-8 mb-20">
          {/* Top Cards */}
          <div className="top-card flex flex-col sm:flex-row w-full gap-4 justify-between">
            <div className="card-1 flex-1 h-auto sm:h-[437px] rounded-lg shadow-md relative overflow-hidden">
              <Image
                src="/artboard.jpg"
                alt="product preview"
                width={1364}
                height={866}
                quality={100}
                className="object-cover w-full h-full opacity-20"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between items-center p-4 bg-opacity-50">
                <h1 className="font-[degularRegular] text-[15vw] sm:text-[10vw] md:text-[8vw] lg:text-[92.16px] font-bold leading-[0.8] tracking-[-3px]">
                  Digital First Branding
                </h1>
                <p className="text-[4vw] sm:text-[5vw] md:text-[4.5vw] lg:text-[24.576px] tracking-[0.2px] font-[degularLight] leading-[1.2]">
                  I specialize in creating digital-first branding that captures
                  your brand's essence and connects with your audience across
                  all platforms. From logos to social media graphics, I design
                  cohesive identities that ensure your brand is consistent,
                  memorable, and impactful online.
                </p>
              </div>
            </div>
            <div className="card-2 flex-1 h-auto sm:h-[437px] rounded-lg shadow-md relative overflow-hidden">
              <Image
                src="/artboard.jpg"
                alt="product preview"
                width={1364}
                height={866}
                quality={100}
                className="object-cover w-full h-full opacity-20"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between items-center p-4 bg-opacity-50">
                <h1 className="font-[degularRegular] text-[15vw] sm:text-[10vw] md:text-[8vw] lg:text-[92.16px] font-bold leading-[0.8] tracking-[-px]">
                  Web Design & Development
                </h1>
                <p className="text-[4vw] sm:text-[5vw] md:text-[4.5vw] lg:text-[24.576px] tracking-[0.2px] font-[degularLight] leading-[1.2]">
                  I design and develop user-friendly websites that blend
                  aesthetics with functionality. Each site is tailored to meet
                  your specific needs, with responsive layouts and intuitive
                  navigation. My goal is to create an engaging online experience
                  that not only looks great but also drives results and keeps
                  users coming back.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="bottom-card w-full">
            <div className="card-3 flex-1 h-auto sm:h-[437px] rounded-lg shadow-md relative overflow-hidden">
              <Image
                src="/artboard.jpg"
                alt="product preview"
                width={1364}
                height={866}
                quality={100}
                className="object-cover w-full h-full opacity-20"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between items-center p-4 bg-opacity-50 w-full sm:w-1/2">
                <h1 className="font-[degularRegular] text-[15vw] sm:text-[10vw] md:text-[8vw] lg:text-[92.16px] font-bold leading-[0.8] tracking-[-px]">
                  Bespoke Design Experiences
                </h1>
                <p className="text-[4vw] sm:text-[5vw] md:text-[4.5vw] lg:text-[24.576px] tracking-[0.2px] font-[degularLight] leading-[1.2]">
                  Every brand has a unique story, and I craft bespoke design
                  experiences that reflect your distinct identity. From custom
                  illustrations to tailored visual elements, I bring your vision
                  to life with creativity and precision. My designs are
                  carefully curated to provide a memorable and personalised
                  experience that stands out in any industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Footer

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/rakibul_islam_sarkar/",
    label: "Instagram",
  },
  { href: "https://x.com/Rakibul1019", label: "Twitter" },
  {
    href: "https://www.linkedin.com/in/rakibul-islam-sarkar-356aa5256",
    label: "LinkedIn",
  },
  { href: "https://github.com/Rakibulislamsarkar", label: "Github" },
  { href: "https://dribbble.com/Kozuki_Oden", label: "Dribbble" },
];

export const FooterSection: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const textRefer = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRefer.current;
    if (text) {
      // Split the text into individual letters
      const letters = text.innerText.split("");

      // Replace the content with span-wrapped letters
      text.innerHTML = letters
        .map((letter) =>
          letter.trim() === ""
            ? `<span class="letter">&nbsp;</span>` // Handle spaces
            : `<span class="letter">${letter}</span>`
        )
        .join("");

      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        text.querySelectorAll(".letter"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 20,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "top 20%",
            scrub: 2,
          },
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting email:", email);
    setEmail("");
  };

  return (
    <footer className="w-full min-h-screen bg-[#0b1215] text-[#f9fdfe] font-[degularRegular] flex flex-col justify-between p-8">
      <h2
        ref={textRefer}
        className="text-8xl sm:text-8xl md:text-9xl lg:text-[15rem] tracking-tighter mb-12"
      >
        Let's talk
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <nav aria-label="Footer navigation">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-4xl md:text-3xl lg:text-4xl hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Social media links">
          <ul>
            {socialLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl md:text-3xl lg:text-4xl hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl mb-4 font-[branch]">
            Leave an email and I'll get back to you
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="p-5 bg-[#333333] rounded-full w-full outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-[rgba(22,22,22,0.4)_0px_0px_20px_0px,rgba(59,59,59,0.1)_0px_1px_20px_4px_inset,rgba(160,160,160,0.22)_-1px_-1px_5px_0px,rgba(14,14,14,0.89)_1px_1px_7px_0px]"
            />
            <button
              type="button"
              className="p-5 bg-[#f4f4f4] text-black rounded-full hover:bg-white transition-colors"
              onClick={() => router.push("/contact")}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center border-t mt-5 pt-4 gap-4">
        <div className="text-sm md:text-base">Cookies & Privacy</div>
        <div className="text-sm md:text-base text-center md:text-right">
          Copyright © 2024. Rakibul Islam Sarkar. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};
