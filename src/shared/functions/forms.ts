/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITags } from "../interfaces/ITag";

export function formatTagsFromBack(tags: ITags[]): any {
    return tags.map((tag) => {
      return { value: tag._id as string, label: tag.name };
    });
  }
