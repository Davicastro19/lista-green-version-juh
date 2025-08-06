/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";



import { ITags } from "@/shared/interfaces/ITag";
import { useEffect, useState } from "react";

import httpService from "@/shared/api/fetcher";
import { BASE_URL } from "@/shared/constants/urls";
import { phoneMask, removeNonNumeric } from "@/shared/functions/manipulatorStrings";
import { CompanyFormData, CompanyFormDataSave, ICompany } from "@/shared/interfaces/ICompany";
import { Option } from "@/shared/interfaces/IFilter";
import { companySchema } from "@/shared/schemas/companies";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MultForm } from "./form";






type MultiStepFormProps = {
    isOpen: boolean;
    onClose: () => void;
    company: ICompany; mutate:()=>void
  };


  function formatAreaFromBack(area: any): any {
    return area.map((area: any) => {
      return { value: area, label: area };
    });
  }


const MultiStepFormEditCompanies = ({ isOpen, onClose, company,mutate }:MultiStepFormProps) => {

  const methods = useForm<CompanyFormData>({
    resolver: yupResolver(companySchema),
    defaultValues: {
      name: company.name || "",
      description: company.description || "",
      image: company?.image || "",
      tags: formatTagsFromBack(company.tags) || [],  // Garantir que nunca seja undefined
      operatesNationwide: company.operatesNationwide || false,
      isMember: company.isMember || false,
      state: company.state || "",
      businessType: company.businessType || "",
      workType: company.workType || "",
      website: company.website || "",
      email: company.email || "",
      whatsapp: phoneMask(removeNonNumeric(company.whatsapp||'' ) || ""),
      instagram: company.instagram || "",
      area: formatAreaFromBack(company.area) || [],  // Garantir que nunca seja undefined
      promotionDescription: company.promotionDescription || "",
      owner: company.owner || "",
      facebook: company.facebook || "",
      _id: company._id || "",
    },
  });


  // Atualiza a imagem caso não tenha no início


      function formatTagsFromBack(tags: ITags[]): any {
       // console.log(tags)
        return tags.map((tag) => {

          return { value: tag._id as string, label: tag.name };
        });
      }



    const isInvalidForm = Object.keys(methods.formState.errors).length > 0
    const [step, setStep] = useState(1);


    const onSubmit = async (formData:CompanyFormData) => {

      const formDataToSend: any = { ...formData };
      formDataToSend.whatsapp = removeNonNumeric(formData.whatsapp||'');
      formDataToSend.tags = formData.tags.map((tag: Option) => tag.value);
      formDataToSend.area = formData.area.map((area:Option) => area.value);
      formDataToSend.whatsapp = removeNonNumeric(formData.whatsapp||'');
      formDataToSend._id = company._id;
      formDataToSend.workType =   formDataToSend.area[0]
      const formatedData : CompanyFormDataSave = formDataToSend
      delete formatedData._id
      try {


          await httpService.put(`/companies/${company._id}`,formatedData)

        toast.success("Negócio editado com sucesso!");

          mutate()
          onClose();
      } catch (error) {
        console.log(error)
        toast.error("Erro na requisição");
      }

    };


    useEffect(() => {
      if(step > 1){

      if(!methods.formState.isValid){
        setStep(step-1)
      }}
    },[step])
    useEffect(() => {
      if (!company?.image) {

          methods.setValue("image", `${BASE_URL}/companies/image/${company._id}`);

      }
    }, []);
    return (
     <MultForm methods={methods }
         isInvalidForm={isInvalidForm}
         step={step}
         onSubmit={onSubmit}
          setStep={setStep}
          title={'Editar'}
           onClose={onClose}
            isOpen={isOpen}
          />
    );
  };

  export default MultiStepFormEditCompanies;
