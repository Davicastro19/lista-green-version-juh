/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CompanyFormData } from "@/shared/interfaces/ICompany";
import { CircleAlert, X } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { MdArrowBack, MdArrowForward, MdBusiness } from "react-icons/md";
import { StepOne } from "./step-one";
import { StepThree } from "./step-three";
import { StepTwo } from "./step-two";

export const MultForm = ({ methods, isInvalidForm, step, onSubmit, setStep, title, onClose, isOpen }: any) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 ${isOpen ? "block" : "hidden"}`}>
      {/* Container com rolagem e altura máxima da tela */}
      <div className="fixed max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg w-full lg:w-[30%] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <MdBusiness className="text-xl" />
            <h2 className="text-lg font-bold">{title} Negócio</h2>
          </div>
          <button onClick={onClose} className="text-black cursor-pointer">
            <X />
          </button>
        </div>

        {/* Step progress */}
        <p className="text-sm text-gray-500 mb-0">{step}/3</p>
        <div className="relative w-full z-40 bg-gray-200 h-2 rounded overflow-hidden mb-4">
          <div className="bg-green-500 h-2" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="p-0 space-y-2">
            {step === 1 && <StepOne />}
            {step === 2 && <StepTwo />}
            {step === 3 && <StepThree />}

            {/* Errors */}
            {Object.keys(methods.formState.errors).map((fieldName) => {
              const error = methods.formState.errors[fieldName as keyof CompanyFormData];
              return error ? (
                <p key={fieldName} className="text-red-500 text-xs flex flex-row gap-2">
                  <CircleAlert size={12} className="mt-[2px]" /> {error.message}
                </p>
              ) : null;
            })}

            {/* Navegação e botões */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between mt-4 gap-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 hover:bg-gray-200 rounded flex items-center cursor-pointer"
                  >
                    <MdArrowBack className="w-5 h-5" />
                  </button>
                )}

                {step < 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      methods.trigger();
                      setStep(step + 1);
                    }}
                    className="cursor-pointer w-full flex justify-center bg-[var(--darkgreenhome)] text-white py-2 rounded-md font-medium hover:bg-green-950 disabled:bg-green-200"
                  >
                    Próximo
                    <MdArrowForward className="w-5 h-5 ml-2" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={methods.formState.isSubmitting || isInvalidForm || step < 3}
                className="cursor-pointer w-full bg-[var(--darkgreenhome)] text-white py-2 rounded-md font-medium hover:bg-green-950 transition disabled:bg-green-100"
              >
                {methods.formState.isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
