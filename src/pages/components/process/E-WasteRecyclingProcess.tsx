import { RecyclingStep } from './ElectricRecyclingSteps';
import { FaRecycle, FaTruck, FaIndustry, FaLeaf, FaBoxOpen } from 'react-icons/fa';

export default function ElectricWasteRecycling() {
  const steps = [
    {
      title: "Collection",
      description: "Electronic waste is collected from homes, businesses, and designated drop-off points.",
      icon: <FaRecycle />
    },
    {
      title: "Transportation",
      description: "The collected e-waste is transported to specialized recycling facilities.",
      icon: <FaTruck />
    },
    {
      title: "Sorting and Dismantling",
      description: "E-waste is sorted by type and manually dismantled to separate different components.",
      icon: <FaBoxOpen />
    },
    {
      title: "Material Recovery",
      description: "Valuable materials like metals, plastics, and glass are extracted and processed for reuse.",
      icon: <FaIndustry />
    },
    {
      title: "Environmental Protection",
      description: "Hazardous materials are safely disposed of to minimize environmental impact.",
      icon: <FaLeaf />
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-5">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-green-600">Electric Waste Recycling Process</h1>
        <div className="space-y-24">
          {steps.map((step, index) => (
            <RecyclingStep key={index} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
}

