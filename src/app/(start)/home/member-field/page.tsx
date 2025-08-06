"use client";
import authStore from "@/shared/stores/authStore";
import { observer } from "mobx-react-lite";
import IsMember from "./isMember";
import Plans from "./price";

function MemberField() {

  const { user } = authStore;



  if (!user || !user?.isMember) {
    return <Plans/>
  }

  return (
    <IsMember/>
  );
}

export default observer(MemberField);
