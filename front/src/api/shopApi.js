import axios from "axios";
import { SERVER_URL } from "api/serverApi";

export const getAll = async (pageNum = []) => {
	const res = await axios.get(
		`${SERVER_URL}/shop/all?pageNumber=${pageNum}`,
	);
	return res.data.content;
};

export const getMain = async (pageNum, mainDepartment = []) => {
	const params = mainDepartment.length
		? { mainDepartments: mainDepartment.join(","), pageNum: pageNum }
		: {};
	const res = await axios.get(
		`${SERVER_URL}/shop/main?pageNumber=${pageNum}&mainDepartment=${mainDepartment}`,
		{
			params,
		}
	);
	return res.data.content;
};

export const getSub = async (pageNum, subDepartment = []) => {
	const params = subDepartment.length
		? { subDepartments: subDepartment.join(","), pageNum: pageNum }
		: {};
	const res = await axios.get(
		`${SERVER_URL}/shop/sub?pageNumber=${pageNum}&subDepartment=${subDepartment}`,
		{
			params,
		}
	);
	return res.data.content;
};