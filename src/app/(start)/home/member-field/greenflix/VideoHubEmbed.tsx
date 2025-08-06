/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect } from "react";

const VideoHubEmbed = ({ videoId }: {videoId:string}) => {
  useEffect(() => {
    const embedContainer = document.getElementById("embed-container");
    const script = document.createElement("script");
    script.type = "module";
    script.async = true;
    script.setAttribute("data-videohub-id", videoId);
    script.setAttribute("data-videohub-platform", "learnworlds");
    script.onerror = function (error) {
      console.error("heere, Erro ao carregar o script de embed:", error);
    };

    try {
      script.innerHTML = `
      //window.videohubMeta={userId:{{USER_ID}},userName:{{USER_NAME}},userEmail:{{USER_EMAIL}},courseId:{{COURSE_ID}},courseTitle:{{COURSE_TITLE}},unitId:{{UNIT_ID}}};
      const d = document, s = d.createElement('script');
      s.src = 'https://listagreen.videohub.com.br/embed.js?p=learnworlds';
      s.type = 'module';
      d.getElementById('embed-container').appendChild(s);
    `;

      if (!embedContainer) {
        console.log("heere não existe o container");
        return;
      }
      embedContainer.appendChild(script);
    } catch (error) {
      console.error("heere Erro durante a execução do script de embed:", error);
    }

    return () => {
      embedContainer && embedContainer.removeChild(script);
    };
  }, [videoId]);

  return (
    <div
      id="embed-container"
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* O conteúdo será embutido via script */}
    </div>
  );
};

export default VideoHubEmbed;
