"use client";
import authStore from "@/shared/stores/authStore";
import { observer } from "mobx-react-lite";
import IsMember from "../home/member-field/isMember";
import Plans from "../home/member-field/price";

function MemberField() {

    const { user } = authStore;



    if (!user || !user?.isMember) {
        return <Plans />
    }

    return (
        <IsMember />
    );
}

export default observer(MemberField);
