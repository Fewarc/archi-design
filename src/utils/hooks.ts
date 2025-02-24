import { z } from "zod";
import { RefObject, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { useRouter } from "next/router";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import { ProjectStage } from "@prisma/client";
import { FileUploadStatus } from "./types";

/**
 * hook listening to screen width changes
 *
 * @param query string query in form of CSS media query e.g. (max-width: 768px)
 * @returns boolean stating if current screen size matches the media query
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    if (matches === null) {
      setMatches(window.matchMedia(query).matches);
    }

    const matchQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    matchQueryList.addEventListener("change", handleChange);

    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
};

/**
 * hook listening for clicks outside of ref element
 *
 * @param ref ref to an element
 * @param handler function to be called on outside click
 */
export const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  handler: Function,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

/**
 * hook for project details data fetching
 *
 * @param projectId project id as string
 * @returns details, contacts, notes, loading boolean and delete project function
 */
export const useProjectDetailsData = (projectId: string) => {
  const router = useRouter();
  const utils = api.useUtils();

  const { data: additionalContacts, isLoading: contactsLoading } =
    api.additionalContact.find.useQuery({
      projectId,
    });

  const { data: notes, isLoading: notesLoading } = api.note.find.useQuery({
    projectId,
  });

  const { mutate: deleteProject } = api.project.delete.useMutation({
    onSuccess: () => {
      utils.project.invalidate();
      router.push("/projects");
    },
  });

  return {
    additionalContacts,
    notes,
    projectDetailsLoading: contactsLoading || notesLoading,
    deleteProject: () => deleteProject({ projectId }),
  };
};

/**
 * hook for using avatar
 *
 * @param name account name
 * @returns avatar src
 */
export const useProjectAvatar = (name: string) => {
  const avatar = useMemo(
    () =>
      createAvatar(initials, {
        seed: name,
        backgroundColor: ["EDECF9"],
        textColor: ["6C6AD0"],
        fontWeight: 700,
      }),
    [],
  );

  return avatar;
};

/**
 * hook for monitoring if html element is line-clamped
 *
 * @param ref html element ref object
 * @returns boolean stating if div is clamped
 */
export const useIsClamped = (ref: RefObject<HTMLDivElement>) => {
  const [isClamped, setIsClamped] = useState<boolean | undefined>(
    (ref.current?.scrollHeight &&
      ref.current?.clientHeight &&
      ref.current?.clientHeight < ref.current?.scrollHeight) ||
      undefined,
  );

  useEffect(() => {
    if (
      ref.current?.scrollHeight &&
      ref.current?.clientHeight &&
      ref.current?.clientHeight < ref.current?.scrollHeight
    ) {
      setIsClamped(true);
    } else {
      setIsClamped(false);
    }
  }, [ref.current?.clientHeight]);

  return isClamped;
};

/**
 * uploads files to google drive using resumable upload on the backend
 *
 * @param stage project stage
 * @param files array of files
 * @param onFinish function called on finish
 * @returns uploadFiles and resetUploadStatus functions, uploadStatus and loading
 */
export const useUploadStageFiles = (
  stage: ProjectStage,
  files: File[],
  onFinish: () => void,
  writers?: string[],
  readers?: string[],
) => {
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatus[]>([]);
  const [loading, setLoading] = useState(false);

  const updateFileStatus = (i: number, uploadStatus: FileUploadStatus) => {
    setUploadStatus((status) => {
      status[i] = uploadStatus;
      return status;
    });
  };

  const resetUploadStatus = () => {
    setUploadStatus([]);
  };

  const uploadSingleFile = async (file: File, i: number) =>
    new Promise<FileUploadStatus>(async (resolve, _reject) => {
      updateFileStatus(i, "loading");
      const form = new FormData();
      form.append("file", file);
      form.append("folderId", stage.folderId);
      form.append("stageId", stage.id);
      form.append("writers", JSON.stringify(writers));
      form.append("readers", JSON.stringify(readers));

      const res = await fetch("/api/add-file", {
        method: "POST",
        body: form,
      });

      if (res.status === 200) {
        updateFileStatus(i, "success");
        resolve("success");
      } else {
        updateFileStatus(i, "error");
        resolve("error");
      }
    });

  const uploadFiles = async (files: File[]) => {
    setLoading(true);
    setUploadStatus(Array<FileUploadStatus>(files.length).fill("default"));
    await Promise.all(files.map((file, i) => uploadSingleFile(file, i)));
    setLoading(false);
    onFinish();
  };

  useEffect(() => {
    files && setUploadStatus(new Array(files.length).fill("default"));
  }, [files]);

  return {
    uploadFiles,
    uploadStatus,
    loading,
    resetUploadStatus,
  };
};
