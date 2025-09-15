import type { TagsModel } from './../types/tags';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PATH = "Tags";

function getConfig() {
    return {
        headers: {
            "Content-Type": "application/json",
        }
    };
}

export const TagsService = {
    async getAll() {
        const { data } = await axios.get(`${API_URL}/${PATH}/getAll`, getConfig());
        return data;
    },
    async getActives(type:number) {
        const { data } = await axios.get(`${API_URL}/${PATH}/getActives`, getConfig());
        if (data && data.tags) {
            data.tags = data.tags.filter((tag: TagsModel) => tag.type === type);
        }
        return data;
    },
    async insert(connector: TagsModel, id: number) {
        const { data } = await axios.post(`${API_URL}/${PATH}/insert/${id}`, connector, getConfig());
        return data;
    },
    async update(connector: TagsModel, id: number) {
        const { data } = await axios.put(`${API_URL}/${PATH}/update/${id}`, connector, getConfig());
        return data;
    },
    async updateStatus(id: number, status: boolean) {
        const statusValue = status ? "active" : "inactive";
        const { data } = await axios.put(
            `${API_URL}/${PATH}/update/${id}/${statusValue}`,
            null,
            getConfig());
            return data;
    }
};

export default TagsService;