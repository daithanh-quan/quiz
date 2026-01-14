import baseAxios from "./index";
import { ErrorResponse } from "./interfaces";

class ApiService {
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      return await baseAxios.get(endpoint, { params });
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  async getById<T>(
    endpoint: string,
    id: string | number,
    params?: Record<string, any>,
  ): Promise<T> {
    try {
      return await baseAxios.get(`${endpoint}/${id}`, { params });
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  async post<T, R = T>(endpoint: string, data: T): Promise<R> {
    try {
      return await baseAxios.post(endpoint, data);
    } catch (error) {
      console.log(error);
      return this.handleError<R>(error);
    }
  }

  async put<T, R = T>(endpoint: string, id?: number, data?: T): Promise<R> {
    try {
      return await baseAxios.put(id ? `${endpoint}/${id}` : endpoint, data);
    } catch (error) {
      return this.handleError<R>(error);
    }
  }

  async patch<T, R = T>(
    endpoint: string,
    id: string | number,
    data: Partial<T>,
  ): Promise<R> {
    try {
      return await baseAxios.patch(`${endpoint}/${id}`, data);
    } catch (error) {
      return this.handleError<R>(error);
    }
  }

  async delete<R = any>(
    endpoint: string,
    id: string | number,
    params?: Record<string, any>,
    data?: Partial<Record<string, any>>,
    fullEndpoint?: string,
  ): Promise<R> {
    try {
      return await baseAxios.delete(
        `${!fullEndpoint ? endpoint + "/" + id : fullEndpoint}`,
        { params, data },
      );
    } catch (error) {
      return this.handleError<R>(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleError<T>(error: any): never {
    if (error?.error) {
      const errorResponse: ErrorResponse = {
        message: error?.error.message,
        statusCode: error?.error?.status,
      };

      // throw error to React Query
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw errorResponse;
    }

    // if error is not AxiosError
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw {
      message: "An unexpected error occurred",
      code: "UNKNOWN_ERROR",
    };
  }
}

export default ApiService;
