/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { BASE_URL } from '@/shared/constants/urls';
import { X } from 'lucide-react';
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import VideoHubEmbed from './VideoHubEmbed';

export default function ContentList({ selectedGroup, categories }: any) {
  const [selectedVideo, setSelectedVideo] = useState<any>();

  function padZero(number: number) {
    return number.toString().padStart(2, '0');
  }

  function convertSeconds(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(secs)}`;
  }

  return (
    <div className="w-full p-4 space-y-16">
      {categories?.map((c: any) => (
        <div key={c._id} className="mb-0">
          <h2 className="p-0 m-0 font-bold text-xl text-[#004643]">{c.name}</h2>
          <div className="flex gap-5 flex-wrap">
            {c.videos.map((v: any) => {
              const check = v.poster ? v.poster.includes("https") : ''
              console.log('VVV', check)

              return (
                <div
                  key={v._id}
                  className="w-[200px] m-0 cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedVideo(v)}
                >
                  <div className="relative w-[200px] h-[120px]">
                    <img
                      className="object-cover w-full h-full rounded-lg"
                      src={`${BASE_URL}/image-proxy?id=${encodeURIComponent(
                        !check
                          ? `${process.env.NEXT_PUBLIC_VIDEHUB_URL_BASE}${v.poster}`
                          : v.poster
                      )}`}
                      alt=""
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-opacity-60 bg-gray-500 rounded-full p-5 px-6">
                      <FaPlay />
                    </div>
                  </div>
                  <p className="text-[#004643]">{v.title}</p>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {selectedVideo && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 ">
          <div className="bg-white w-[70%] rounded-lg relative ">
            <button
              onClick={() => {
                const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?group=${selectedGroup._id}`;
                window.history.pushState({ path: newUrl }, '', newUrl);
                window.location.reload();
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X />
            </button>
            <div className="p-6">
              <h3 className="text-xl font-bold border-0 text-[#004643]">
                {selectedVideo.title}
              </h3>
              <div className="mt-4 overflow-auto h-[90vh]">
                <VideoHubEmbed videoId={selectedVideo._id} />
                <div className="flex gap-5 justify-center -mt-48 ">
                  {selectedVideo.chapters?.map((c: any) => (
                    <div
                      key={c.start}
                      className="w-[100px] border border-[#DAF7E9] p-1 rounded-lg"
                    >
                      <p className="text-center font-bold text-[#004643]">
                        {convertSeconds(c.start)}
                      </p>
                      <p className="text-xs text-center text-[#26847B]">
                        {c.title}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-14">
                  <h4 className="font-bold mb-2 text-[#004643]">
                    {selectedVideo.title}
                  </h4>
                  <span> {selectedVideo.description}</span>
                </div>
                <div className="mt-14">
                  <h4 className="font-bold mb-2 text-[#004643]">
                    Material de Apoio:
                  </h4>
                  <ul>
                    {selectedVideo.links?.map((material: any) => (
                      <div className="flex items-center gap-2" key={material.url}>
                        <div className="w-1 h-1 rounded-full bg-[#18B28C]" />
                        <a
                          href={material?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#18B28C] underline hover:text-[#02ca9b]"
                        >
                          {material?.name}
                        </a>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
