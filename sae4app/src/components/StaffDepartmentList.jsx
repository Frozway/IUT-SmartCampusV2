import {useState, useEffect} from 'react';
import {fetchDepartments} from '../services/departmentService';

import Spinner from './Spinner';
import AlertsList from './AlertsList';

const StaffDepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchDepartmentsData() {
            const departmentsData = await fetchDepartments();
            setDepartments(departmentsData);
            setIsLoading(false);
            console.log(departmentsData)
        }

        fetchDepartmentsData();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spinner />
                </div>
            ) : (
                departments.map((departmentData, index) => (
                    <AlertsList departmentId={departmentData.id} departmentName={departmentData.name} key={index}/>
                ))
            )}
        </>
    )
}

export default StaffDepartmentList