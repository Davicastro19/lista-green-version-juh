import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { startButtons } from "@/shared/constants/card";
import { FilterProps } from "@/shared/interfaces/IFilter";
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";

// Variáveis de animação para transição
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Filter({
  block,
  description,
  options,
  selected,
  isArea,
  isState,
  isType,
  handleUrl,
  selectedArea,
  selectedState,
  searchQuery,
  selectedType,
}: FilterProps) {


  return (
    <motion.div className="w-full space-y-2  " initial="initial" animate="animate" exit="exit" variants={fadeIn}>
      <p className="text-sm text-[var(--foreground)] ">{description}</p>
      <div className="flex flex-wrap  justify-between  w-full ">
        {/* Renderizando os tipos */}
        {isType &&
          options.map((type) => (
            type.id ?(
            <Button
              key={type.id}
             className={`cursor-pointer flex items-center space-x-0 border border-gray-300  px-2 lg:px-8 py-2 transition-all text-[var(--foreground)] rounded-full ${
                  selected === type.id ? " text-[var(--background)] border-[var(--darkgreen)] bg-[var(--darkgreen)] shadow-[0px_1px_3px_0px_var(--darkgreen)]" : ""
                }`}

              onClick={() => handleUrl(type.id!, selectedArea, selectedState, searchQuery, 1)}
            >
              {type.label}
            </Button>):null
          ))}

        {/* Renderizando as áreas */}
        {isArea &&
          options.map(({ label, area }) =>

            {

              const sh = startButtons[label?.replace(' e ', ' & ').toLowerCase() || '']?.color

    return          (


            // Verificando se area não é undefined antes de usá-la
            area ? (
              <Button style={{boxShadow:`0px 1px 2px 0px ${sh}`}}
                key={area.id}
                disabled={block}
                className={`cursor-pointer flex items-center space-x-0 border border-gray-300  px-2 lg:px-8 py-2 transition-all text-[var(--foreground)] rounded-full ${
                  selected === area.id ? "border-[var(--darkgreen)] bg-[var(--darkgreen)] text-[var(--background)] shadow-[0px_1px_3px_0px_var(--darkgreen)]" : ""
                }`}
                onClick={() => handleUrl(selectedType, area.id, selectedState, searchQuery, 1)}
              >
                <img src={area.icon} alt={label} className="h-6 w-6 rounded-full" style={{ backgroundColor: area.bg,boxShadow:`0px 1px 4px 0px ${sh}` }} />
                <span className="hidden md:inline-block text-sm font-medium">{label}</span>
              </Button>
            ) : null
          )})}

        {/* Renderizando os estados */}
        {isState && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button disabled={block} className="w-full border text-sm font-medium   ">
                {selected ? options.find((s) => s.value === selected)?.label : "Selecione um estado"}
                <ChevronDown className="ml-2 h-2 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-[35vh] overflow-auto bg-[var(--background)]">
              {options.map((state) => (
                // Verificando se o valor de state não é undefined
                state.value ? (
                  <DropdownMenuItem
                    key={state.value}
                    onClick={() => handleUrl(selectedType, selectedArea, state.value!, searchQuery, 1)}
                    className="flex items-center space-x-2"
                  >
                    <MapPin className={`h-4 w-4 ${selected === state.value ? "text-[var(--glowgreen)]" : "text-gray-600"}`} />
                    <span>{state.label}</span>
                  </DropdownMenuItem>
                ) : null
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </motion.div>
  );
}
