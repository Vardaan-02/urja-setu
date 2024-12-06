import { motion } from "framer-motion";
import { LeftBox } from "./components/left-box";
import { RightBox } from "./components/right-box";

export function Layout() {
  return (
    <>
      <motion.div
        className="h-full p-4 transition-all duration-300 ease-in-out"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 h-full p-4">
          <div className="lg:w-[30%] h-full">
            <LeftBox />
          </div>
          <div className="lg:w-[70%] h-full">
            <RightBox />
          </div>
        </div>
      </motion.div>
    </>
  );
}
