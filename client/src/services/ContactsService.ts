import { APIResponse } from "types/ContactTypes";

export class ContactsService {
  public static async getContacts(): Promise<APIResponse> {
    try {
      const response = await fetch("http://localhost:8080/api/people");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      throw new Error(errorMessage);
    }
  }

  public static async deleteContact(id: number): Promise<void> {
    try {
      const response = await fetch(`http://localhost:8080/api/people/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      throw new Error(errorMessage);
    }
  }
}
