import { motion } from "framer-motion";

const AnimatedBlobs = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Top-left blob */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Top-right blob */}
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-advocacy-red/8 blur-3xl"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Center-left blob */}
      <motion.div
        className="absolute top-1/3 -left-40 w-72 h-72 rounded-full bg-healing-blue/10 blur-3xl"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Center-right blob */}
      <motion.div
        className="absolute top-1/2 -right-32 w-64 h-64 rounded-full bg-hope-gold/10 blur-3xl"
        animate={{
          x: [0, -20, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Bottom-left blob */}
      <motion.div
        className="absolute bottom-1/4 -left-24 w-56 h-56 rounded-full bg-empowerment-purple/8 blur-3xl"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Bottom-right blob */}
      <motion.div
        className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-primary/8 blur-3xl"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedBlobs;
