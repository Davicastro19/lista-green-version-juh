/* eslint-disable @typescript-eslint/no-explicit-any */
let videHubToken: string | undefined = undefined;



const getVideoHubToken = async () => {
    try {

        videHubToken = undefined
    } catch (error: any) {
        console.error(error.message);
        videHubToken = undefined;
    }
};

const fetchWithAuth = async (endpoint: string) => {
    if (!videHubToken) await getVideoHubToken();
    if (!videHubToken) throw new Error("Authentication failed");

    const baseURL = `${process.env.NEXT_PUBLIC_VIDEHUB_URL_BASE}/v1`;
    const response = await fetch(`${baseURL}/${endpoint}`, {
        headers: {
            "Authorization": `Bearer ${videHubToken}`,
        },
    });

    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
};

export const handleFetchGroups = async (videHubGroups: any) => {
    try {
        return await fetchWithAuth("groups?thumbnails&includeContentCount");
    } catch (error: any) {
        console.error(error.message);
        return videHubGroups;
    }
};

export const handleFetchContent = async (groupId: string, videHubContent1: any, videHubContent2: any) => {
    try {
        return await fetchWithAuth(`groups/${groupId}/content`);
    } catch (error: any) {
        console.error(error.message);
        return groupId === "664e1a948e3aea04e66dc4ff"
            ? videHubContent1
            : videHubContent2;
    }
};
