import HeroSection from "./HeroSection";
import QuickOverviewSection from "./QuickOverviewSection";
import HowItWorksSection from "./HowItWorksSection";
import FeaturesSection from "./FeaturesSection";
import UseCasesSection from "./UseCasesSection";
import QuickStartSection from "./QuickStartSection";

const HomePage = () => {
  return (
    <div className="bg-base-100">
      <div className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <HeroSection />
        <QuickOverviewSection />
        <HowItWorksSection />
        <FeaturesSection />
        <UseCasesSection />
        <QuickStartSection />
      </div>
    </div>
  );
};

export default HomePage;
