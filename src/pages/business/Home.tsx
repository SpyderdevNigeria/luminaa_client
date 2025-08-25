import { useState } from "react";
import website from "../../utils/website";
import routeLinks from "../../utils/routes";
import { Link } from "react-router-dom";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white ">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">{website?.name}</span>
              <img
               className={` ${website?.square ? website?.logoSquareSize : website?.logoRegularSize}`}
                src={website?.logo}
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to={routeLinks?.auth?.partnerLogin} className="text-sm md:text-base font-semibold text-gray-900">Practitioners</Link>
             <Link to={routeLinks?.auth?.adminLogin} className="text-sm md:text-base font-semibold text-gray-900">Admin</Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to={routeLinks?.auth?.login} className="text-sm md:text-base font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50"></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white  px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">{website?.name}</span>
                  <img
                    className="h-8 w-auto"
                       src={website?.logo}
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6 flex flex-col ">
                     <Link to={routeLinks?.auth?.partnerLogin}  className="text-sm font-semibold text-gray-900">Practitioners</Link>
                      <Link to={routeLinks?.auth?.adminLogin}  className="text-sm font-semibold text-gray-900">Admin</Link>
                  </div>
                  <div className="py-6">
                    <Link to={routeLinks?.auth?.login} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">Log in</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >

        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">

          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Data to enrich your online business
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={routeLinks?.auth?.register}
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <a href="#" className="text-sm font-semibold text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
