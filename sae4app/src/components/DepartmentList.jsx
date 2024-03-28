import {useState, useEffect} from 'react';
import DepartmentItem from './DepartmentItem';
import {fetchDepartments} from '../services/departmentService';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchDepartmentsData() {
            const departmentsData = await fetchDepartments();
            setDepartments(departmentsData);
            setIsLoading(false);
        }

        fetchDepartmentsData();
    }, []);

    return (
        <div className="department-list">
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-3xl font-bold text-center">⌛Chargement des départements...⌛</p>
                </div>
            ) : (
                departments.map((departmentData, index) => (
                    <DepartmentItem key={index} department={departmentData} />
                ))
            )}
        </div>
    );
}

export default DepartmentList;