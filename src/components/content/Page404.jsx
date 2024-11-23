import { Link } from "react-router-dom"

const Page404 = () => {
  return (
    <section className="flex w-full dark:text-gray-100 h-screen bg-pattern">
	<div className="container flex flex-col items-center justify-center px-5  my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl text-white">404</h2>
			<p className="text-xl font-extrabold italic md:text-3xl text-gray-800 whitespace-nowrap mb-4">Sorry, we couldn't find this page.</p>
			<Link to="/" className="btn-wide btn bg-slate-800 border-none hover:bg-slate-900 text-white font-bold text-lg mt-4 mb-8">Back to Home Page</Link>
		</div>
	</div>
</section>
  )
}

export default Page404;