import { TBook } from "@/types/book";
import { apiFetch } from "@/utils/apiFetch";
import { ApiResponse } from "@/types/global.type";

export const getAllBooks = async (): Promise<TBook[]> => {
  const res = await apiFetch<ApiResponse<TBook[]>>(`/books`);
  return res.data;
};

export const createBook = async (payload: Partial<TBook>): Promise<TBook> => {
  const res = await apiFetch<ApiResponse<TBook>>(`/books`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.data;
};

export const updateBook = async (
  id: string,
  payload: Partial<TBook>
): Promise<TBook> => {
  const res = await apiFetch<ApiResponse<TBook>>(`/books/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await apiFetch<void>(`/books/${id}`, {
    method: "DELETE",
  });
};
