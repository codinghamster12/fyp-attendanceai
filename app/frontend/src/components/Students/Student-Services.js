import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class StudentService{
	
	// constructor(){}

	getStudents() {
		const url = `${API_URL}/api/student/student-list/`;
		
		return axios.get(url);
	
	}

	// getProductsByURLLink(link){
	// 	const url = `${API_URL}${link}`;
	// 	return axios.get(url).then(response => response.data);
	// }

	getStudentById(id) {
		const url = `${API_URL}/api/student/student-detail/${id}`;
		return axios.get(url);
	}

	deleteStudent(id){
		const url = `${API_URL}/api/student/student-delete/${id}`;
		return axios.delete(url).then(response => response.data);
	}

	createStudent(student){
		const url = `${API_URL}/api/student/student-create/`;
		return axios.post(url,student);
	}

	updateStudent(student,id){
		const url = `${API_URL}/api/student-update/${id}`;
		return axios.post(url,student);
	}
}