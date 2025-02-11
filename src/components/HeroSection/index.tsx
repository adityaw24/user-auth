interface HeroSectionProps {
  setRegisterModalOpen: (open: boolean) => void;
}

const HeroSection = ({ setRegisterModalOpen }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 bg-white">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="text-center">
              <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="block">Welcome to Our Platform</span>
                <span className="block text-indigo-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-3">
                  Everything you need in one place
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Your one-stop solution for everything you need. Join our
                community today and discover amazing features!
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => setRegisterModalOpen(true)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
