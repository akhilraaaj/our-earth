import { useMemo } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Barack Obama",
    title: "Former US President",
    quote:
      "We are the first generation to feel the impact of climate change and the last generation that can do something about it.",
    img: "https://pbs.twimg.com/profile_images/1329647526807543809/2SGvnHYV_400x400.jpg",
  },
  {
    name: "Mark Ruffalo",
    title: "Actor and Activist",
    quote:
      "Climate change is the greatest threat to our existence in our short history on this planet. Nobody's going to buy their way out of its effects.",
    img: "https://pbs.twimg.com/profile_images/1727376667017199616/pWSyF4Hc_400x400.jpg",
  },
  {
    name: "Greta Thunberg",
    title: "Climate Activist",
    quote:
      "Hope is not passive. Hope is telling the truth. Hope is taking action. And hope always comes from the people.",
    img: "https://pbs.twimg.com/profile_images/1459213153301053442/rL5hhpAI_400x400.jpg",
  },
  {
    name: "Ian Somerhalder",
    title: "Actor",
    quote:
      "Let's double down on solar energy, let's be more energy-efficient. We can build a better, healthier economy based on clean energy jobs.",
    img: "https://pbs.twimg.com/profile_images/1265911518115160064/3awhurkz_400x400.jpg",
  },
  {
    name: "Dalai Lama",
    title: "Spiritual Leader",
    quote:
      "It is our collective and individual responsibility to protect and nurture the global family and to preserve the environment in which we all live.",
    img: "https://pbs.twimg.com/profile_images/529214699041067008/fqPBAr5s_400x400.jpeg",
  },
  {
    name: "Bill Gates",
    title: "Founder of Microsoft",
    quote:
      "Climate change is a terrible problem, and it absolutely needs to be solved. It deserves to be a huge priority.",
    img: "https://pbs.twimg.com/profile_images/1879013694367252480/Gxa-Pspq_400x400.jpg",
  },
  {
    name: "Leonardo DiCaprio",
    title: "Actor & Environmentalist",
    quote:
      "Climate change is real. It is happening right now, it is the most urgent threat facing our entire species.",
    img: "https://pbs.twimg.com/profile_images/694662257586892802/mdc5ELjj_400x400.jpg",
  },
  {
    name: "Pope Francis",
    title: "266th Catholic Pope",
    quote:
      "The time for seeking global solutions is running out. We can find suitable solutions only if we act together and in agreement.",
    img: "https://pbs.twimg.com/profile_images/1635032110531485696/e72TClKQ_400x400.jpg",
  },
  {
    name: "Elon Musk",
    title: "CEO of Tesla & SpaceX",
    quote:
      "We are running the most dangerous experiment in history right now, which is to see how much carbon dioxide the atmosphere can handle.",
    img: "https://pbs.twimg.com/profile_images/1845482317860450309/OrD0ovmf_400x400.jpg",
  },
  {
    name: "Kofi Annan",
    title: "Former UN Secretary-General",
    quote:
      "The world is reaching the tipping point beyond which climate change may become irreversible. The whole of humanity stands to lose.",
    img: "https://pbs.twimg.com/profile_images/1030754250803081218/hdtc2Aoe_400x400.jpg",
  },
  {
    name: "Gisele Bundchen",
    title: "UN Goodwill Ambassador",
    quote:
      "Deforestation leads to climate change, which leads to ecosystem losses, which negatively impacts our livelihoods – it's a vicious cycle.",
    img: "https://pbs.twimg.com/profile_images/976834296085442563/KyawpqFf_400x400.jpg",
  },
  {
    name: "Arnold Schwarzenegger",
    title: "Actor & Former Governor",
    quote:
      "Climate change is not science fiction. This is a battle in the real world, it is impacting us right now.",
    img: "https://pbs.twimg.com/profile_images/1630293026567491584/RU9ugnh7_400x400.jpg",
  },
];

function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  const directionClass = vertical ? "flex-col" : "flex-row";
  const animateClass = vertical
    ? "animate-marquee-vertical flex-col"
    : "animate-marquee flex-row";
  const pauseClass = pauseOnHover
    ? "group-hover:[animation-play-state:paused]"
    : "";
  const reverseClass = reverse ? "[animation-direction:reverse]" : "";

  return (
    <div
      {...props}
      className={`group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-[var(--gap)] ${directionClass} ${className}`}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 justify-around gap-[var(--gap)] ${animateClass} ${pauseClass} ${reverseClass}`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

function TestimonialCard({ img, name, title, quote }) {
  return (
    <div className="relative group h-full">
      <div className="cursor-pointer block h-full">
        <div className="relative max-w-[420px] h-full px-8 py-14 space-y-6 leading-none rounded-2xl bg-[#00704A] hover:bg-blue-900">
          <div className="flex items-center space-x-4">
            <img
              src={img}
              alt={`${name}'s avatar`}
              className="w-12 h-12 bg-center bg-cover border rounded-full flex-shrink-0"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-white text-left">{name}</h3>
              <p className="text-white font-semibold leading-5 text-md text-left">
                {title}
              </p>
            </div>
          </div>
          <p className="leading-relaxed text-white text-base font-medium text-left">
            {quote}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ClimateTestimonials() {
  const firstRow = useMemo(
    () => testimonials.slice(0, testimonials.length / 2),
    []
  );
  const secondRow = useMemo(
    () => testimonials.slice(testimonials.length / 2),
    []
  );

  return (
    <section
      id="testimonies"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12"
    >
      <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
        <div className="mb-12 space-y-5 md:mb-12">
          <div className="inline-block px-3 py-2 text-sm font-semibold text-white rounded-lg text-cn bg-blue-900 hover:cursor-pointer hover:bg-opacity-90">
            Words from Others
          </div>
          <motion.h1
            className="text-5xl font-bold text-center mb-8 text-green-800"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            It's not just us.
          </motion.h1>
          <motion.p
            className="text-2xl text-center mb-16 text-green-700 font-semibold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Here's what others have to say about earth conservation and climate
            change
          </motion.p>
        </div>
      </div>

      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </Marquee>

      <div className="h-4"></div>

      <Marquee reverse pauseOnHover className="[--duration:25s]">
        {secondRow.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-white to-transparent z-10" />
    </section>
  );
}
