import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Barack Obama",
      title: "Former US President",
      imageUrl: "https://pbs.twimg.com/profile_images/1329647526807543809/2SGvnHYV_400x400.jpg",
      twitterUrl: "https://twitter.com/BarackObama",
      quote: "We are the first generation to feel the impact of climate change and the last generation that can do something about it."
    },
    {
      name: "Mark Ruffalo",
      title: "Actor and Activist",
      imageUrl: "https://pbs.twimg.com/profile_images/1727376667017199616/pWSyF4Hc_400x400.jpg",
      twitterUrl: "https://twitter.com/MarkRuffalo",
      quote: "Climate change is the greatest threat to our existence in our short history on this planet. Nobody's going to buy their way out of its effects."
    },
    {
      name: "Greta Thunberg",
      title: "Climate Activist",
      imageUrl: "https://pbs.twimg.com/profile_images/1459213153301053442/rL5hhpAI_400x400.jpg",
      twitterUrl: "https://twitter.com/GretaThunberg",
      quote: "We can no longer let the people in power decide what is politically possible. We can no longer let the people in power decide what hope is. Hope is not passive. Hope is not blah, blah, blah. Hope is telling the truth. Hope is taking action. And hope always comes from the people."
    },
    {
      name: "Ian Somerhalder",
      title: "Actor",
      imageUrl: "https://pbs.twimg.com/profile_images/1265911518115160064/3awhurkz_400x400.jpg",
      twitterUrl: "https://twitter.com/iansomerhalder",
      quote: "Let’s double down on solar energy, let’s be more energy-efficient, let’s weatherize our homes. We can build a better, healthier economy based on good-paying, clean energy jobs."
    },
    {
      name: "Dalai Lama",
      title: "Spiritual leader ",
      imageUrl: "https://pbs.twimg.com/profile_images/529214699041067008/fqPBAr5s_400x400.jpeg",
      twitterUrl: "https://twitter.com/DalaiLama",
      quote: "It is our collective and individual responsibility to protect and nurture the global family, to support its weaker members, and to preserve and tend to the environment in which we all live."
    },
    {
      name: "Bill Gates",
      title: "Founder of Microsoft",
      imageUrl: "https://pbs.twimg.com/profile_images/1674815862879178752/nTGMV1Eo_400x400.jpg",
      twitterUrl: "https://twitter.com/BillGates",
      quote: "Climate change is a terrible problem, and it absolutely needs to be solved. It deserves to be a huge priority."
    },
    {
      name: "Kofi Annan",
      title: "Former Secretary-General of UN",
      imageUrl: "https://pbs.twimg.com/profile_images/1030754250803081218/hdtc2Aoe_400x400.jpg",
      twitterUrl: "https://twitter.com/KofiAnnan",
      quote: "The world is reaching the tipping point beyond which climate change may become irreversible. If this happens, we risk denying present and future generations the right to a healthy and sustainable planet – the whole of humanity stands to lose."
    },
    {
      name: "Pope Francis",
      title: "266th Catholic Pope",
      imageUrl: "https://pbs.twimg.com/profile_images/1635032110531485696/e72TClKQ_400x400.jpg",
      twitterUrl: "https://twitter.com/Pontifex",
      quote: "The time for seeking global solutions is running out. We can find suitable solutions only if we act together and in agreement."
    },
    {
      name: "Leonardo Di Caprio",
      title: "Actor & Environmentalist",
      imageUrl: "https://pbs.twimg.com/profile_images/694662257586892802/mdc5ELjj_400x400.jpg",
      twitterUrl: "https://twitter.com/LeoDiCaprio",
      quote: "Climate change is real. It is happening right now, it is the most urgent threat facing our entire species and we need to work collectively together and stop procrastinating."
    },
    {
      name: "Gisele Bundchen",
      title: "Supermodel & UN Goodwill Ambassador",
      imageUrl: "https://pbs.twimg.com/profile_images/976834296085442563/KyawpqFf_400x400.jpg",
      twitterUrl: "https://twitter.com/giseleofficial",
      quote: "One thing leads to the other. Deforestation leads to climate change, which leads to ecosystem losses, which negatively impacts our livelihoods – it's a vicious cycle."
    },
    {
      name: "Arnold Schwarzenegger",
      title: "Actor & Former Governor of California",
      imageUrl: "https://pbs.twimg.com/profile_images/1630293026567491584/RU9ugnh7_400x400.jpg",
      twitterUrl: "https://twitter.com/Schwarzenegger",
      quote: "I've starred in a lot of science fiction movies and, let me tell you something, climate change is not science fiction. This is a battle in the real world, it is impacting us right now."
    },
    {
      name: "Elon Musk",
      title: "CEO of Tesla & SpaceX",
      imageUrl: "https://pbs.twimg.com/profile_images/1845482317860450309/OrD0ovmf_400x400.jpg",
      twitterUrl: "https://twitter.com/elonmusk",
      quote: "We are running the most dangerous experiment in history right now, which is to see how much carbon dioxide the atmosphere can handle before there is an environmental catastrophe."
    },
  ];

  const TestimonialCard = ({ testimonial }) => (
    <li className="text-sm leading-6">
      <div className="relative group">
        <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
        <a href={testimonial.twitterUrl} className="cursor-pointer">
          <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
            <div className="flex items-center space-x-4 text-start">
              <img
                src={testimonial.imageUrl}
                className="w-12 h-12 bg-center bg-cover border rounded-full"
                alt={testimonial.name}
              />
              <div className='flex flex-col gap-1'>
                <h3 className="text-lg font-bold text-white">
                  {testimonial.name}
                </h3>
                <p className="text-gray-400 font-semibold leading-5 text-md">
                  {testimonial.title}
                </p>
              </div>
            </div>
            <p className="leading-normal text-gray-300 text-md font-medium text-start">
              {testimonial.quote}
            </p>
          </div>
        </a>
      </div>
    </li>
  );

  return (
    <section id="testimonies" className="py-20">
      <div className="">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-12 space-y-5 md:mb-16 md:text-center">
            <div className="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 rounded-lg md:text-center text-cn bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
              Words from Others
            </div>
            <h1 className="mb-5 text-3xl font-semibold text-indigo-700 md:text-center md:text-5xl">
              It's not just us.
            </h1>
            <p className="text-xl text-gray-400 md:text-center md:text-2xl">
              Here's what others have to say about us.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <ul className="space-y-8">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </ul>

          <ul className="hidden space-y-8 sm:block">
            {testimonials.slice(4, 8).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </ul>

          <ul className="hidden space-y-8 lg:block">
            {testimonials.slice(8, 12).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Testimonials