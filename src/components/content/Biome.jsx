import { useAnimate } from "framer-motion";
import React, { useRef } from "react";
import Arrow from '/our-earth/src/assets/arrow.webp'

export const Biome = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "https://images.pexels.com/photos/804565/pexels-photo-804565.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/36762/scarlet-honeyeater-bird-red-feathers.jpg?auto=compress&cs=tinysrgb&w=600",
        'https://images.pexels.com/photos/3689859/pexels-photo-3689859.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/542608/pexels-photo-542608.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1271620/pexels-photo-1271620.jpeg?cs=srgb&dl=pexels-andreimike-1271620.jpg&fm=jpg',
        'https://images.pexels.com/photos/3375116/pexels-photo-3375116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/2674052/pexels-photo-2674052.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHwwfHx8MTcyMTA0MjYwMXww&ixlib=rb-4.0.3&q=80&w=1080',
      ]}
    >
    <section className="grid md:h-[600px] h-fit w-full place-content-center bg-[url('https://image.mux.com/K8QrwDyi02LcDaAA8CLnpILaTUK6Md9ek/thumbnail.jpg?time=0&width=2700&height=1519&fit_mode=smartcrop')] bg-opacity-20 bg-cover bg-center bg-no-repeat relative">
       <div className="flex flex-col justify-start items-start text-start md:w-1/2 w-full mt-20 px-12">
        <h4 className="font-extrabold text-5xl mb-2 text-white">What is a Biome?</h4>
        <p className="font-bold text-lg text-green-300 my-4">A biome is defined as a regional area characterized by the plants, animals, and climate in that area. Many of the plants and animals located in these areas area endemic to the biome. There are five primary biomes in the world:</p>
        <ul className="font-bold text-lg text-blue-200 list-disc p-4">
            <li>Grassland</li>
            <li>Desert</li>
            <li>Forest</li>
            <li>Aquatic Biome</li>
            <li>Tundra</li>
        </ul>
       </div>
            <img
               src="https://img.freepik.com/free-vector/colorful-biomes-map-world-divided-by-nature_1308-159402.jpg"
               alt=""
               className="absolute bottom-0 right-0 w-[48%] h-[60%] rounded-tl-3xl md:block hidden"
            />
            <h5 className="text-lg absolute bottom-3 right-6 font-extrabold text-slate-950 md:block hidden">Hover over this section to view different biomes of Earth!!</h5>
      </section>
    </MouseImageTrail>
  );
};

const MouseImageTrail = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div className="relative mt-16">
      <p className="absolute -top-14 right-0 text-green-900 font-bold font-['helvetica']">Hover over this section</p>
      <img src={Arrow} className="absolute -top-6 right-0 w-36 h-24" alt="Arrow" />

    <div
      ref={scope}
      className="relative overflow-hidden w-full border rounded-3xl shadow-2xl md:mt-20 mt-6 mb-12"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-gray-300 bg-neutral-900 shadow-md shadow-gray-500 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
    </div>
  );
};