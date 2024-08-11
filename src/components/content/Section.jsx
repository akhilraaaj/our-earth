import Countdown from "./Countdown";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Quiz from "./quiz/Quiz";

const Section = () => {
  return (
    <div className="bg-white px-12">
      <div className="mx-auto text-center flex flex-col px-6 md:px-0 md:max-w-[1300px] xl:w-[1300px] 2xl:w-[1300px] max-w-[1300px] py-32">
        <div className="flex items-center justify-between bg-[#12486B] rounded-2xl shadow-2xl md:pl-24 md:pr-20 px-4 py-12 md:text-left text-center max-w-7xl">
          <div className="flex flex-col justify-center w-full">
            <motion.div
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <h1 className="md:text-5xl text-3xl font-extrabold text-white mb-8">
                WHAT IS EARTH DAY?
              </h1>
              <h2 className="md:text-4xl text-2xl font-bold text-white mb-8">
                Celebrate Earth Day Everyday!!
              </h2>
              <p className="text-[#F9F3CC] md:text-lg text-base md:font-semibold font-medium w-[90%]">
                Our planet is an amazing place, but it needs our help to thrive!
                That’s why each year on April 22, more than a billion people
                celebrate Earth Day to protect the planet from things like
                pollution and deforestation. By taking part in activities like
                picking up litter and planting trees, we’re making our world a
                happier, healthier place to live.
              </p>
              <label
                htmlFor="my_modal_7"
                className="btn btn-success bg-[#27b927] text-white text-lg md:w-64 px-4 py-0 mt-8"
              >
                Show Countdown
              </label>
              <input type="checkbox" id="my_modal_7" className="modal-toggle" />
              <div className="modal" role="dialog">
                <div className="modal-box bg-blue-100">
                  <Countdown />
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
                    className="rounded-xl mt-4"
                    alt=""
                  />
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">
                  Close
                </label>
              </div>
            </motion.div>
          </div>
          <div className="md:block hidden">
            <motion.div
              variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <img src="/images/globe.png" alt="" />
            </motion.div>
          </div>
        </div>
       
        <h1 class="text-4xl font-bold text-center mb-8">
          Bento Grid Layout with Images
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* <!-- Large item --> */}
          <div class="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl shadow-lg group">
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHwwfHx8MTcyMTA0MjYwMXww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Nature"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h3 class="text-2xl font-bold text-white">Explore Nature</h3>
                <p class="text-white">
                  Discover the beauty of the natural world
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Two small items --> */}
          <div class="relative overflow-hidden rounded-2xl shadow-lg group">
            <img
              src="https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Food"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h4 class="text-xl font-bold text-white">Culinary Delights</h4>
              </div>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-2xl shadow-lg group">
            <img
              src="https://images.pexels.com/photos/2674052/pexels-photo-2674052.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Technology"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h4 class="text-xl font-bold text-white">Tech Innovations</h4>
              </div>
            </div>
          </div>

          {/* <!-- Three medium items --> */}
          <div class="relative overflow-hidden rounded-2xl shadow-lg group">
            <img
              src="https://images.pexels.com/photos/3375116/pexels-photo-3375116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Travel"
              class="w-full h-96 object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h4 class="text-xl font-bold text-white">Travel Adventures</h4>
              </div>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-2xl shadow-lg group">
            <img
              src="https://images.pexels.com/photos/1271620/pexels-photo-1271620.jpeg?cs=srgb&dl=pexels-andreimike-1271620.jpg&fm=jpg"
              alt="Art"
              class="w-full h-96 object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h4 class="text-xl font-bold text-white">
                  Artistic Expressions
                </h4>
              </div>
            </div>
          </div>

          {/* <!-- bottom cards --> */}
          <div class="relative overflow-hidden rounded-2xl shadow-lg group">
            <img
              src="https://images.pexels.com/photos/542608/pexels-photo-542608.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Sport"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h4 class="text-xl font-bold text-white">Swimming</h4>
              </div>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-2xl shadow-lg group">
            <img
              src="https://images.pexels.com/photos/3689859/pexels-photo-3689859.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Sport"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h4 class="text-xl font-bold text-white">Chess</h4>
              </div>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-2xl shadow-lg group">
            <img
              src="https://images.pexels.com/photos/36762/scarlet-honeyeater-bird-red-feathers.jpg?auto=compress&cs=tinysrgb&w=600"
              alt="Sport"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h4 class="text-xl font-bold text-white">Football</h4>
              </div>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-2xl shadow-lg group">
            <img
              src="https://images.pexels.com/photos/804565/pexels-photo-804565.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Sport"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h4 class="text-xl font-bold text-white">Cricket</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="py-12">
          <div className="bg-gray-200 px-12 py-12 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Earth Conservation Quiz</h1>
            <Quiz />
          </div>
        </div>
        <div class="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
    <h2 class="mb-1 text-3xl font-extrabold leading-tight text-gray-900">Services</h2>
    <p class="mb-12 text-lg text-gray-500">Here is a few of the awesome Services we provide.</p>
    <div class="w-full">
        <div class="flex flex-col w-full mb-10 sm:flex-row">
            <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                <div class="relative h-full ml-0 mr-0 sm:mr-10">
                    <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                    <div class="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                        <div class="flex items-center -mt-1">
                            <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">DAPP Development</h3>
                        </div>
                        <p class="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">------------</p>
                        <p class="mb-2 text-gray-600">A decentralized application (dapp) is an application built on a
                            decentralized network that combines a smart contract and a frontend user interface.</p>
                    </div>
                </div>
            </div>
            <div class="w-full sm:w-1/2">
                <div class="relative h-full ml-0 md:mr-10">
                    <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                    <div class="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                        <div class="flex items-center -mt-1">
                            <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Web 3.0 Development</h3>
                        </div>
                        <p class="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">------------</p>
                        <p class="mb-2 text-gray-600">Web 3.0 is the third generation of Internet services that will
                            focus on understanding and analyzing data to provide a semantic web.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col w-full mb-5 sm:flex-row">
            <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                <div class="relative h-full ml-0 mr-0 sm:mr-10">
                    <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                    <div class="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                        <div class="flex items-center -mt-1">
                            <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Project Audit</h3>
                        </div>
                        <p class="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">------------</p>
                        <p class="mb-2 text-gray-600">A Project Audit is a formal review of a project, which is intended
                            to assess the extent up to which project management standards are being upheld.</p>
                    </div>
                </div>
            </div>
            <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                <div class="relative h-full ml-0 mr-0 sm:mr-10">
                    <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                    <div class="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
                        <div class="flex items-center -mt-1">
                            <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Hacking / RE</h3>
                        </div>
                        <p class="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">------------</p>
                        <p class="mb-2 text-gray-600">A security hacker is someone who explores methods for breaching
                            defenses and exploiting weaknesses in a computer system or network.</p>
                    </div>
                </div>
            </div>
            <div class="w-full sm:w-1/2">
                <div class="relative h-full ml-0 md:mr-10">
                    <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
                    <div class="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
                        <div class="flex items-center -mt-1">
                            <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Bot/Script Development</h3>
                        </div>
                        <p class="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">------------</p>
                        <p class="mb-2 text-gray-600">Bot development frameworks were created as advanced software tools
                            that eliminate a large amount of manual work and accelerate the development process.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<section id="testimonies" class="py-20">
    <div class="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">


        <div class="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
            <div class="mb-12 space-y-5 md:mb-16 md:text-center">
                <div
                    class="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 rounded-lg md:text-center text-cn bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
                    Words from Others
                </div>
                <h1 class="mb-5 text-3xl font-semibold text-indigo-700 md:text-center md:text-5xl">
                    It's not just us.
                </h1>
                <p class="text-xl text-gray-400 md:text-center md:text-2xl">
                    Here's what others have to say about us.
                </p>
            </div>
        </div>


        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">


            <ul class="space-y-8">
                <li class="text-sm leading-6">
                    <div class="relative group">
                        <div
                            class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/kanyewest" class="cursor-pointer">
                            <div
                                class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                <div class="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                                        class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West" />
                                    <div>
                                        <h3 class="text-lg font-semibold text-white">Kanye West</h3>
                                        <p class="text-gray-500 text-md">Rapper &amp; Entrepreneur</p>
                                    </div>
                                </div>
                                <p class="leading-normal text-gray-300 text-md">Find God.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li class="text-sm leading-6">
                    <div class="relative group">
                        <div
                            class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/tim_cook" class="cursor-pointer">
                            <div
                                class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                <div class="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                                        class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                                    <div>
                                        <h3 class="text-lg font-semibold text-white">Tim Cook</h3>
                                        <p class="text-gray-500 text-md">CEO of Apple</p>
                                    </div>
                                </div>
                                <p class="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque
                                    fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                    aliquam malesuada bibendum.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li class="text-sm leading-6">
                    <div class="relative group">
                        <div
                            class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/kanyewest" class="cursor-pointer">
                            <div
                                class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                <div class="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                                        class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West" />
                                    <div>
                                        <h3 class="text-lg font-semibold text-white">Kanye West</h3>
                                        <p class="text-gray-500 text-md">Rapper &amp; Entrepreneur</p>
                                    </div>
                                </div>
                                <p class="leading-normal text-gray-300 text-md">Find God.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li class="text-sm leading-6">
                    <div class="relative group">
                        <div
                            class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/tim_cook" class="cursor-pointer">
                            <div
                                class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                <div class="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                                        class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                                    <div>
                                        <h3 class="text-lg font-semibold text-white">Tim Cook</h3>
                                        <p class="text-gray-500 text-md">CEO of Apple</p>
                                    </div>
                                </div>
                                <p class="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque
                                    fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                    aliquam malesuada bibendum.</p>
                            </div>
                        </a>
                    </div>
                </li>
            </ul>


            <ul class="hidden space-y-8 sm:block">
                <li class="text-sm leading-6">
                    <div class="relative group">
                        <div
                            class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/paraga" class="cursor-pointer">
                            <div
                                class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                <div class="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg"
                                        class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal" />
                                    <div>
                                        <h3 class="text-lg font-semibold text-white">Parag Agrawal</h3>
                                        <p class="text-gray-500 text-md">CEO of Twitter</p>
                                    </div>
                                </div>
                                <p class="leading-normal text-gray-300 text-md">Enim neque volutpat ac tincidunt vitae
                                    semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam
                                    pellentesque nec. Turpis cursus in hac habitasse platea dictumst.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li class="text-sm leading-6">
                    <div class="relative group">
                        <div
                            class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/tim_cook" class="cursor-pointer">
                            <div
                                class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                <div class="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                                        class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                                    <div>
                                        <h3 class="text-lg font-semibold text-white">Tim Cook</h3>
                                        <p class="text-gray-500 text-md">CEO of Apple</p>
                                    </div>
                                </div>
                                <p class="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque
                                    fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                    aliquam malesuada bibendum.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li class="text-sm leading-6">
                    <div class="relative group">
                        <div
                            class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/paraga" class="cursor-pointer">
                            <div
                                class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                <div class="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg"
                                        class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal" />
                                    <div>
                                        <h3 class="text-lg font-semibold text-white">Parag Agrawal</h3>
                                        <p class="text-gray-500 text-md">CEO of Twitter</p>
                                    </div>
                                </div>
                                <p class="leading-normal text-gray-300 text-md">Enim neque volutpat ac tincidunt vitae
                                    semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam
                                    pellentesque nec. Turpis cursus in hac habitasse platea dictumst.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li class="text-sm leading-6">
                    <div class="relative group">
                        <div
                            class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/tim_cook" class="cursor-pointer">
                            <div
                                class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                <div class="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                                        class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                                    <div>
                                        <h3 class="text-lg font-semibold text-white">Tim Cook</h3>
                                        <p class="text-gray-500 text-md">CEO of Apple</p>
                                    </div>
                                </div>
                                <p class="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque
                                    fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                    aliquam malesuada bibendum.</p>
                            </div>
                        </a>
                    </div>
                </li>
            </ul>


            <ul class="hidden space-y-8 lg:block">
                <li class="text-sm leading-6">
                    <div class="relative group">
                        <div
                            class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/satyanadella" class="cursor-pointer">
                            <div
                                class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                <div class="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                                        class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella" />
                                    <div>
                                        <h3 class="text-lg font-semibold text-white">Satya Nadella</h3>
                                        <p class="text-gray-500 text-md">CEO of Microsoft</p>
                                    </div>
                                </div>
                                <p class="leading-normal text-gray-300 text-md">Tortor dignissim convallis aenean et
                                    tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam
                                    eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li class="text-sm leading-6">
                    <div class="relative group">
                        <div
                            class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/dan_schulman" class="cursor-pointer">
                            <div
                                class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                <div class="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                                        class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Dan Schulman" />
                                    <div>
                                        <h3 class="text-lg font-semibold text-white">Dan Schulman</h3>
                                        <p class="text-gray-500 text-md">CEO of PayPal</p>
                                    </div>
                                </div>
                                <p class="leading-normal text-gray-300 text-md">Quam pellentesque nec nam aliquam sem
                                    et tortor consequat id. Enim sit amet venenatis urna cursus.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li class="text-sm leading-6">
                    <div class="relative group">
                        <div
                            class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/satyanadella" class="cursor-pointer">
                            <div
                                class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                <div class="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                                        class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella" />
                                    <div>
                                        <h3 class="text-lg font-semibold text-white">Satya Nadella</h3>
                                        <p class="text-gray-500 text-md">CEO of Microsoft</p>
                                    </div>
                                </div>
                                <p class="leading-normal text-gray-300 text-md">Tortor dignissim convallis aenean et
                                    tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam
                                    eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li class="text-sm leading-6">
                    <div class="relative group">
                        <div
                            class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/dan_schulman" class="cursor-pointer">
                            <div
                                class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                <div class="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                                        class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Dan Schulman" />
                                    <div>
                                        <h3 class="text-lg font-semibold text-white">Dan Schulman</h3>
                                        <p class="text-gray-500 text-md">CEO of PayPal</p>
                                    </div>
                                </div>
                                <p class="leading-normal text-gray-300 text-md">Quam pellentesque nec nam aliquam sem
                                    et tortor consequat id. Enim sit amet venenatis urna cursus.</p>
                            </div>
                        </a>
                    </div>
                </li>
            </ul>


        </div>
    </div>
</section>

      </div>
    </div>
  );
};

export default Section;
