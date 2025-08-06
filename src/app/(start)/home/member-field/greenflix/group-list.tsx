/* eslint-disable @typescript-eslint/no-explicit-any */
export default function GroupList({ groups, setSelectedGroup }: any) {
    return (
      <div className="w-full p-4 flex flex-row flex-wrap justify-around gap-16 ">
        {groups.groups.map((g: any) => (
          <div
            key={g._id}
            className="relative cursor-pointer border border-[#DAF7E9] rounded-lg transition-transform duration-300 hover:scale-105"
            onClick={() => setSelectedGroup(g)}
          >
            <img
              className="max-w-[300px] rounded-lg"
              src={`${process.env.NEXT_PUBLIC_VIDEHUB_URL_BASE}${g.thumbnail}`}
              alt=""
            />
            <h3 className="text-center font-bold mt-8 mb-7 text-[#004643]">
              {g.name}
            </h3>
            <span className="absolute text-xs bg-[#26847B] text-white px-2 py-1 rounded-lg top-2 right-2">
              {groups.content_count[g._id].videos} vídeos
            </span>
          </div>
        ))}
      </div>
    );
  }
