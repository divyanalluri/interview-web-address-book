import { ContactAPIResponse } from "types/ContactTypes";

const API_URL = `http://localhost:8080/api`;

export class ContactsService {
  public static async getContacts(): Promise<ContactAPIResponse> {
    try {
      const response = await fetch(`${API_URL}/people`);
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
      const response = await fetch(`${API_URL}/people/${id}`, {
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
