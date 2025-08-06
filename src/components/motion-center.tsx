import { cn } from "@/lib/utils"
import { HTMLMotionProps, motion } from "framer-motion"



export function MotionCenter({ children, className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center bg-gradient-to-r from-[var(--darkgreenhome)] via-[var(--basegreen)] to-[var(--lightgreen)]",
        className
      )}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: ["0% 50%", "70% 50%", "0% 50%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ backgroundSize: "200% 200%" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
