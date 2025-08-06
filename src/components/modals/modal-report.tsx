import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import httpService from "@/shared/api/fetcher";
import { useState } from "react";
import { toast } from "sonner";

const ReportCompanyModal = ({
  email,
  isOpen,
  onClose,
  companyName,
  companyLink,
}: {
  email?: string;
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  companyLink: string;
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reasons, setReasons] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [userEmail, setUserEmail] = useState(email || "");

  const handleNext = () => {
    if (!userEmail.trim()) {
      toast.error("Por favor, informe um e-mail válido.");
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setReasons([...reasons, value]);
    } else {
      setReasons(reasons.filter((reason) => reason !== value));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const body = {
        email: userEmail,
        motivos: reasons,
        descricao: description,
        companyName,
        companyUrl: companyLink,
      };

      const res = await httpService.post<{ success: boolean; message: string }>("/users/report", body);
      toast.success(res.message);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao processar sua denúncia. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle>Denunciar Negócio</DialogTitle>
          <DialogClose />
        </DialogHeader>

        {step === 1 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Para registrar uma denúncia, é necessário fornecer um e-mail válido para contato.
            </p>
            {email ? (
              <p className="font-semibold mb-4">E-mail: {email}</p>
            ) : (
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Digite seu e-mail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            )}
            <Button onClick={handleNext} className="mt-4 w-48 hover:shadow-sm cursor-pointer">
              Continuar
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              Selecione o motivo e forneça uma descrição detalhada para análise.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Conteúdo sexual",
                "Desinformação",
                "Conteúdo violento ou repulsivo",
                "Abuso infantil",
                "Conteúdo de ódio ou abusivo",
                "Promoção de terrorismo",
                "Perseguição ou bullying",
                "Spam ou enganoso",
                "Atos prejudiciais ou perigosos",
                "Questão legal",
              ].map((reason) => (
                <label key={reason} className="flex items-center space-x-2">
                  <Checkbox onCheckedChange={(checked) => handleCheckboxChange(reason, checked as boolean)} />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <textarea
              className="mt-4 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-600"
              placeholder="Descrição da denúncia (máx. 500 caracteres)"
              value={description}
              maxLength={500}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        )}

        <DialogFooter>
          {step === 2 && (
            <>
              <Button variant="outline" onClick={handleBack} className="mr-3 hover:shadow-sm cursor-pointer">
                Voltar
              </Button>
              <Button
                className="hover:shadow-sm cursor-pointer border-red-400 border text-red-400"
                disabled={loading || !userEmail.trim()}
                onClick={handleSubmit}
              >
                {loading ? "Denunciando..." : "Denunciar"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportCompanyModal;
