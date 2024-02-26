import {  useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { AxiosRequestConfig, CanceledError } from 'axios';

interface Response<T> {
    count: number;
    results: T[];
}

const useData = <T>(
    endpoint: string,
    requestConfig?: AxiosRequestConfig,
    dependencies?: unknown[]
) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);
        apiClient.get<Response<T>>(endpoint, {
            signal: controller.signal,
            ...requestConfig,
        })
            .then((res) => setData(res.data.results))
            .catch((error) => {
                if (error.name === "AbortError") {
                    setIsLoading(false);
                    return;
                }
                if (error instanceof CanceledError) return;
                setError(error);
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            });

        return () => controller.abort();
    },
        dependencies ? [...dependencies] : []
    );

    return { data, error, isLoading };
};

export default useData;