import axios from "axios";
import { SERVER_URL } from "api/serverApi";

export const getAll = async (pageNum = 0) => {
	const res = await axios.get(`${SERVER_URL}/shop/all?pageNumber=${pageNum}`);

	return res;
};

export const getSub = async (pageNum = 0, subDepartment = []) => {
	const params = subDepartment.length
		? { subDepartments: subDepartment.join(","), pageNum: pageNum }
		: {};
	const res = await axios.get(
		`${SERVER_URL}/shop/sub?pageNumber=${pageNum}&subDepartment=${subDepartment}`,
		{ params }
	);
	return res;
};

export const getSearch = async (pageNum = 0, keyword = "") => {
	const res = await axios.get(`${SERVER_URL}/search?pageNumber=${pageNum}&keyword=${keyword}`);

	return res;
}