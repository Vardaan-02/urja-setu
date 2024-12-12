import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface RecyclingStepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function RecyclingStep({ title, description, icon }: RecyclingStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-md mb-24"
    >
      <div className="flex-shrink-0 text-4xl text-green-500">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

