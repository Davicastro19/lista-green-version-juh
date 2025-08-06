/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";



import { useEffect, useState } from "react";

import httpService from "@/shared/api/fetcher";
import { removeNonNumeric } from "@/shared/functions/manipulatorStrings";
import { CompanyFormData, CompanyFormDataSave } from "@/shared/interfaces/ICompany";
import { Option } from "@/shared/interfaces/IFilter";
import { companySchema } from "@/shared/schemas/companies";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MultForm } from "./form";






type MultiStepFormProps = {
    isOpen: boolean;
    onClose: () => void;mutate:()=>void
  };




const MultiStepFormCreateCompanies = ({ isOpen, onClose,mutate }:MultiStepFormProps) => {

  const methods = useForm<CompanyFormData>({
    resolver: yupResolver(companySchema),
    defaultValues: {
      name:  "",
      description:  "",
      image:  "",
      tags:[],  // Garantir que nunca seja undefined
      operatesNationwide:  false,
      isMember:  false,
      state:  "",
      businessType:  "",
      workType:  "",
      website: "",
      email:  "",
      whatsapp:  "",
      instagram: "",
      area:  [],  // Garantir que nunca seja undefined
      promotionDescription: "",
      facebook: "",
    },
  });




    const isInvalidForm = Object.keys(methods.formState.errors).length > 0
    const [step, setStep] = useState(1);


    const onSubmit = async (formData:CompanyFormData) => {
       const formDataToSend: any = { ...formData };
      formDataToSend.whatsapp = removeNonNumeric(formData.whatsapp||'');
      formDataToSend.tags = formData.tags.map((tag: Option) => tag.value);
      formDataToSend.area = formData.area.map((area:Option) => area.value);
      formDataToSend.whatsapp = removeNonNumeric(formData.whatsapp||'');

      formDataToSend.workType =   formDataToSend.area[0]
      const formatedData : CompanyFormDataSave = formDataToSend

      try {


          await httpService.post(`/companies`,formatedData)

        toast.success("Negócio criado com sucesso!");

          mutate()
          onClose();
      } catch (error) {
        console.log(error)
        toast.error((error as any)?.message || "Erro ao salvar negócio");
      }

    };

      useEffect(() => {
        if(step > 1){

        if(!methods.formState.isValid){
          setStep(step-1)
        }}
      },[step])
    return (
     <MultForm methods={methods }
     isInvalidForm={isInvalidForm}
     step={step}
     onSubmit={onSubmit}
      setStep={setStep}
      title={'Criar'}
       onClose={onClose}
        isOpen={isOpen}
      />
    );
  };

  export default MultiStepFormCreateCompanies
