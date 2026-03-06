import { GLSLHills } from "@/components/ui/glsl-hills";

export default function GLSLHillsDemo() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      <GLSLHills className="opacity-60" />
      <div className="space-y-6 pointer-events-none z-10 text-center absolute px-4">
        <h1 className="font-semibold text-5xl md:text-7xl whitespace-pre-wrap text-white">
          <span className="italic text-4xl md:text-6xl font-thin">Designs That Speak <br/> </span>
          Louder Than Words
        </h1>
        <p className="text-sm md:text-base text-white/60 max-w-lg mx-auto">
          We craft stunning visuals and user-friendly experiences that help your brand stand out and connect with your audience.
        </p>
      </div> 
    </div>
  )
}
