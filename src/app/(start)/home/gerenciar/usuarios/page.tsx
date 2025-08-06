'use client'



import { DeleteUserAlert } from "@/components/modals/alert-delete-user";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import httpService from "@/shared/api/fetcher";
import useFetch from "@/shared/api/swrfetcher";
import { IUser } from "@/shared/interfaces/IUser";
import { ArrowDown, ArrowUp, ChevronLeft, Copy, Filter, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight, FaWhatsapp } from 'react-icons/fa';
import { toast } from "sonner";
import { mutate } from "swr";


export default function UserPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [filters, setFilters] = useState({
    all: false,
    new: true,
    members: false,
    consumers: false,
    oferers: false,
  });



  const queryParams = new URLSearchParams({
    page: String(page),
    limit: "10",
    search: search || "",
    isMember: filters.members ? "true" : "",
    type: filters.consumers ? "consumidor" : filters.oferers ? "ofertante" : "",
    sort: filters.new?"desc":'asc',
  });

  const { data, error } = useFetch<{data:{users:IUser[], pagination:{ totalUsers:number, totalPages:number, currentPage: number, }}}>(`/users/all?${queryParams}`);

  const handleToggleMember = async (userId: string, isChecked: boolean) => {
    try {

        await httpService.put(`/users/${userId}/toggle-member`,{});
        toast.success(`O usuário agora é ${!isChecked ? "membro" : "não membro"}.`)

      mutate(`/users/all?${queryParams}`);
    } catch (error) {
        console.log(error)

    }
  };
  const handleCopy = (user:IUser) => {
    const formattedPhone = `55${user.phone.replace(/\D/g, '')}`;
    navigator.clipboard.writeText(formattedPhone)
      .then(() =>  {
        toast.success('Copiado')
      })
      .catch(() =>
      {   toast.error('Erro ao copiar')}
        )
  };
  async function handleDeleteUser(id: string) {
    try {

        await httpService.delete(`/users/${id}`)
        toast.success("Deletado!")
        setSelectedUser(null)
        mutate(`/users/all?${queryParams}`);

    } catch (error) {
      console.error("Erro ao deletar usuário", error);
      toast.success("Erro ao deletar usuário!")
    }
  }

const router = useRouter();
  if (error) return <p>Erro ao carregar usuários.</p>;

  return (
    <div className="flex flex-col sm:p-4 p-2 w-full bg-white rounded-xl">
      <div className="flex flex-row items-center gap-4 mb-4 w-full">
      <button onClick={() => router.push('/home/gerenciar')} className="pr-0 cursor-pointer  flex flex-row text-gray-600 hover:text-gray-800">
        <ChevronLeft /> Voltar
      </button>
      <text className="text-lg font-semibold w-full text-center" >Gerenciar   usuários</text>
      <div/>
      </div>

    <div className="flex flex-row gap-4 w-full mb-5">
      <input
         className="w-full max-w-md text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
         placeholder="Busque por nome e sobrenome"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

<Popover>
  <PopoverTrigger>
  <button aria-label="Filtro" className="cursor-pointer bg-[var(--darkgreen)] p-2  rounded-lg text-white hover:bg-green-950 ">

      <Filter color="white" />
    </button>
  </PopoverTrigger>

  <PopoverContent className="flex flex-col gap-2 p-4 bg-white">


    <div className="flex items-center gap-2">
      <Checkbox
        id="members"
        checked={filters.members}
        onCheckedChange={(checked) => setFilters({ ...filters, members: Boolean(checked) })}
      />
      <Label htmlFor="members" className="text-sm font-medium">Membro</Label>
    </div>

    <div className="flex items-center gap-2">
      <Checkbox
        id="consumers"
        checked={filters.consumers}
        onCheckedChange={(checked) => setFilters({ ...filters, consumers: Boolean(checked) })}
      />
      <Label htmlFor="consumers" className="text-sm font-medium">Consumidor</Label>
    </div>

    <div className="flex items-center gap-2">
      <Checkbox
        id="oferers"
        checked={filters.oferers}
        onCheckedChange={(checked) => setFilters({ ...filters, oferers: Boolean(checked) })}
      />
      <Label htmlFor="oferers" className="text-sm font-medium">Ofertante</Label>
    </div>
  </PopoverContent>
</Popover>
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={() => setFilters({ ...filters, new: !filters.new})}
        className=" cursor-pointer flex items-center gap-1 text-sm font-medium p-2"
      >
        Ordem: Mais
        {filters.new ? " Novo" : " Antigo"}
        {filters.new ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      </button>
    </div>
    <div className="overflow-x-auto rounded-xl border-1 border-gray-100 shadow-md">
      <Table >
        <TableHeader className="bg-[var(--darkgreen)] rounded-lg ">
          <TableRow  className="border-gray-100" >
            <TableHead className="text-white  py-4">Nome</TableHead>
            <TableHead className="text-white hidden sm:table-cell  py-4">Contato</TableHead>
            <TableHead className="text-white hidden sm:table-cell  py-4">Tipo</TableHead>
            <TableHead className="text-white hidden sm:table-cell  py-4">Data de Criação</TableHead>
            <TableHead className="text-white  py-4">Membro</TableHead>
            <TableHead className="text-white  py-4">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data && data.data.users.map((user: IUser) => (
            <TableRow  className="border-gray-100" key={user._id}>
              <TableCell className="py-4 ">
                <div className=" flex flex-col min-w-[100px] w-[170px]">
                  <span className="truncate ">{user.firstName} {user.lastName}</span>
                  <span className="truncate text-xs text-darkgreen font-medium">{user.email}</span>
                  <span className="truncate text-xs text-darkgreen font-medium sm:hidden">{user.type}</span>
                  {user.phone &&
                  <div className="flex items-center gap-1  lg:hidden">
                  <Copy
                    className="cursor-pointer hover:text-darkgreen size-4"
                    onClick={() => handleCopy(user)}
                  />
                  <span className="truncate text-xs text-darkgreen font-medium max-w-[130px]">
                    {user.phone}
                  </span>
                  <FaWhatsapp
                    className="cursor-pointer text-green-500 size-4"
                    onClick={() => window.open(`https://api.whatsapp.com/send/?phone=55${user.phone.replace(/\D/g, '')}`, '_blank')}
                  />
                </div>}
                </div>
              </TableCell>
              <TableCell className="py-4 hidden sm:table-cell">
              {user.phone &&<div className="flex items-center gap-2">
                  <Copy
                    className="cursor-pointer hover:text-darkgreen size-4"
                    onClick={() => handleCopy(user)}
                  />
                  <span className="truncate text-md text-darkgreen font-medium w-[130px]">
                    {user.phone}
                  </span>
                  <FaWhatsapp
                    className="cursor-pointer text-green-500"
                    onClick={() => window.open(`https://api.whatsapp.com/send/?phone=55${user.phone.replace(/\D/g, '')}`, '_blank')}
                  />
                </div>}
              </TableCell>
              <TableCell className="hidden sm:table-cell py-4">{user.type}</TableCell>
              <TableCell className="hidden sm:table-cell py-4">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="py-4">
                <input
                  type="checkbox"
                  checked={user.isMember}
                  onChange={(e) => handleToggleMember(user._id, e.target.checked)}
                  className= " cursor-pointer rounded border-gray-300 text-darkgreen focus:ring-darkgreen"
                />
              </TableCell>
              <TableCell className="py-4">
                <button
                  onClick={() => {
                    setSelectedUser(user);

                  }}
                  className="cursor-pointer text-red-500 hover:text-red-600"
                >
                  <Trash />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {data?.data &&
    <div className="flex justify-center items-center gap-2 mt-4 mb-[60px]">
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className="px-4 py-1 border rounded font-bold  hover:bg-gray-100 disabled:opacity-50 text-md"
      >
        1
      </button>
      <button
        onClick={() => setPage((prev) => Math.max(1, prev - 2))}
        disabled={page <= 2}
        className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        disabled={page === 1}
        className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        <FaAngleLeft />
      </button>
      <span className="px-2">{data?.data?.pagination.currentPage}</span>
      <button
        onClick={() => setPage((prev) => Math.min(data.data.pagination.totalPages, prev + 1))}
        disabled={page === data?.data?.pagination.totalPages}
        className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        <FaAngleRight />
      </button>
      <button
        onClick={() => setPage((prev) => Math.min(data.data.pagination.totalPages, prev + 2))}
        disabled={page >= data?.data?.pagination.totalPages - 1}
        className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        <FaAngleDoubleRight />
      </button>
      <button
        onClick={() => setPage(data.data.pagination.totalPages)}
        disabled={page === data?.data?.pagination.totalPages}
        className="px-4 py-1 border font-bold rounded hover:bg-gray-100 disabled:opacity-50"
      >
        {data?.data?.pagination.totalPages}
      </button>
    </div>
}

    {selectedUser && (

        <DeleteUserAlert  user={selectedUser} onClose={()=> setSelectedUser(null)} handleDeleteUser={()=> handleDeleteUser(selectedUser._id)} />

    )}
  </div>
  );
}
