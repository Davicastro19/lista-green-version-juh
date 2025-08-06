/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import useFetch from '@/shared/api/swrfetcher';
import { handleFetchContent, handleFetchGroups } from '@/shared/functions/videoHub';
import { VideoHubResponse } from '@/shared/interfaces/IHub';
import { useEffect, useState } from 'react';
import ContentList from './content-list';
import GroupList from './group-list';
import './styles.css';

export default function Greenflix() {

  ///
  const { data, isLoading, error } = useFetch<VideoHubResponse>('/statistics/mocks');

  const [groups, setGroups] = useState<any>();
  const [selectedGroup, setSelectedGroup] = useState<any>();
  const [categories, setCategories] = useState<any>();


  const fetchGroups = async () => {
    const groups = await handleFetchGroups(data?.videHubGroups);
    setGroups(groups.result);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const group = queryParams.get('group');

    if (group) {
      setSelectedGroup({ _id: group });
    }

    if ((selectedGroup && selectedGroup._id) || group) {
      handleContent(group || selectedGroup._id);
    }
  }, [selectedGroup && selectedGroup._id, data]);

  const handleContent = async (groupId: string) => {
    const content: any = await handleFetchContent(groupId, data?.videHubContent1, data?.videHubContent2);
    setCategories(content.categories);
  };

  useEffect(() => {
    fetchGroups();
  }, [data]);
  if (isLoading || error) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full p-4 space-y-16 pb-20 ">
      <div className="blurred-edges pt-10 ">
        <h1 className=" text-center text-3xl  font-bold mx-auto text-white  ">
          {selectedGroup ? selectedGroup.name : "Área de Membros Exclusiva da Listagreen"}
        </h1>
      </div>
      {groups && groups.groups.length > 0 && !selectedGroup ? (
        <GroupList groups={groups} setSelectedGroup={setSelectedGroup} />
      ) : (
        <ContentList selectedGroup={selectedGroup} categories={categories} />
      )}
    </div>
  );
}
